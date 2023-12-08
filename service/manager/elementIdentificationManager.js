const cellListStudySingleton = require('../llm/cellListStudySingleton');
const generalClassificationSingleton = require('../llm/generalClassificationSingleton');
const stepEvolutionSingleton = require('../llm/stepEvolutionSingleton');
const tableIdentifierSingleton = require('../llm/tableIdentifierSingleton');
const tableTargetIdentifierSingleton = require('../llm/tableTargetIdentifierSingleton');
const { HtmlSnapshotCompresed } = require('../snapshot')
const { PugGenerator } = require('../pugGenerator/pugGenerator')
const ElementIdentificationStepResult = require('../../model/elementIdentificationStepResult')
const LlmOperationConstant = require('../../model/constant/LlmOperationConstant')

class ElementIdentificationManager {
    /**
     * @param {string} testStep test step
     * @param {string} htmlSnap PUG HTML Snapshot
     **/
    constructor(testStep, htmlSnap) {
        this.htmlSnapshot = new HtmlSnapshotCompresed(htmlSnap)

        /**@type {string} original test step */
        this.originalStep = testStep

        /**@type {string} current test step */
        this.updatedStep = this.originalStep

        let pugGen = new PugGenerator(JSON.stringify(this.htmlSnapshot.atomicNodeMatrix))
        pugGen.createPugFile()

        /**@type {string} current web page layout */
        this.currentWebpage = pugGen.pugStr
    }
    /**
     * Get element id from element such as tag#15->15
     * @param {string} element 
     * @returns {number} element id
     */
    _getElementId(element) {
        return parseInt(element.split('#')[1])
    }
    /**
     * Based on Html Snapshot and element id, return the pug text of the element children
     * @param {HtmlSnapshotCompresed} htmlSnapshot 
     * @param {string} elementId it's in tag#id format 
     * @returns {string} pug text of the element children
     */
    _getPugTextById(htmlSnapshot, elementId) {
        try {
            let targetId = this._getElementId(elementId)
            let targetNodeChildrenMatrix = htmlSnapshot.getChildrenAtomicMatrixById(targetId)
            let pugGen = new PugGenerator(JSON.stringify(targetNodeChildrenMatrix))
            pugGen.createPugFile()
            let pugStr = pugGen.pugStr
            return pugStr
        } catch (error) {
            console.error('error in _getPugTextById')
        }

    }

    async identifyElement() {

        //keep max iteration to 10 to avoid infinite loop
        for (let i = 0; i < 10; i++) {
            // Step 1: General Evaluation
            let generalResult = await generalClassificationSingleton.identifyElement(this.updatedStep, this.currentWebpage);
            if (generalResult.outermostContainerType == null || generalResult.outermostContainerType == 'table') {
                return generalResult.targetElementId; // Return if not in a matrix
            }



            // Step 3: Table or Matrix Evaluation
            // Step 3-1: Row and Column Evaluation
            let columnResult, columnList, rowList;
            let rowResult;
            if (generalResult.outermostContainerType === 'table') {
                // Table Evaluation

                //await new Promise(resolve => setTimeout(resolve, 1000));
                columnList = await tableIdentifierSingleton.identifyElement(this.currentWebpage, 'table', 'column')
                rowList = await tableIdentifierSingleton.identifyElement(this.currentWebpage, 'table', 'row')
                columnResult = await tableTargetIdentifierSingleton.identifyElement(this.updatedStep, this.currentWebpage, 'table', 'column', columnList)
                rowResult = await tableTargetIdentifierSingleton.identifyElement(this.updatedStep, this.currentWebpage, 'table', 'row', rowList)
            } else if (generalResult.outermostContainerType === 'matrix') {
                // Matrix Evaluation
                columnList = await tableIdentifierSingleton.identifyElement(this.currentWebpage, 'matrix', 'column')
                rowList = await tableIdentifierSingleton.identifyElement(this.currentWebpage, 'matrix', 'row')
                columnResult = await tableTargetIdentifierSingleton.identifyElement(this.updatedStep, this.currentWebpage, 'matrix', 'column', columnList)
                rowResult = await tableTargetIdentifierSingleton.identifyElement(this.updatedStep, this.currentWebpage, 'matrix', 'row', rowList)
            }
            if (columnResult.characterItem == null) return columnResult.targetElement

            // Step 3-2: Table Analysis 
            //handle situation where 
            if (columnResult.characterItem == null) columnResult.characterItem = columnResult.targetElement
            if (rowResult.characterItem == null) rowResult.characterItem = rowResult.targetElement
            let columnIndex = columnList.firstCellList.indexOf(columnResult.characterItem)
            let rowIndex = rowList.firstCellList.indexOf(rowResult.characterItem)

            /**@type {string} */
            let container
            // if both target element is neither in column header nor in row header
            if (columnResult.characterItem) {
                //based on the result of row and column study, identify row and column header list
                let rowHeaderList = null
                if (rowResult.isUniqueRowHeaders) {
                    rowHeaderList = rowResult.rowHeaderList
                }
                let columnHeaderList = null
                if (columnResult.isUniqueColumnHeaders) {
                    columnHeaderList = columnResult.columnHeaderList
                }

                // identify the next-level container                
                let cellListResult = await cellListStudySingleton.identifyElement(this.updatedStep, this.currentWebpage, rowHeaderList, columnHeaderList);
                container = cellListResult.outerTableCell[rowIndex][columnIndex]
            }
            else if (columnResult.isTargetColumnHeader) {
                // if target element is in column header,
                // identify the next-level container
                container = columnResult.columnHeaderCell
            }
            else if (rowResult.isTargetRowHeader) {
                // if target element is in row header
                // identify the next-level container
                container = rowResult.rowHeaderCell
            }

            //if target element end up to be the same with container, target element is the cell
            // we cannot rely on target element directly because chatGPT may make mistake
            // especially around nested matrix scenario like severity secenario
            if (generalResult.targetElementId === container) {
                return generalResult.targetElementId
            }


            // evolve step based on next level container
            this.stepEvolutionResult = await stepEvolutionSingleton.identifyElement(this.updatedStep, this.currentWebpage, container);
            this.updatedStep = this.stepEvolutionResult.updatedStep

            // get the updated web page for future iteration
            this.currentWebpage = this._getPugTextById(this.htmlSnapshot, container)


        }

        return generalResult.targetElementId;
    }
    /**
     * 
     * @param {string} webpage 
     * @param {string} testStep 
     * @returns {ElementIdentificationStepResult}
     */
    async _handleGeneralClassifiation(webpage, testStep) {




    }
    async _handleMatrix(webpage, testStep) {

    }


}

module.exports = ElementIdentificationManager