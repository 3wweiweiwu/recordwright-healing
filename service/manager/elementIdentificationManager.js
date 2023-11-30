const cellListStudySingleton = require('../llm/cellListStudySingleton');
const generalClassificationSingleton = require('../llm/generalClassificationSingleton');
const matrixColumnStudySingleton = require('../llm/matrixColumnStudySingleton');
const matrixRowStudySingleton = require('../llm/matrixRowStudySingleton');
const stepEvolutionSingleton = require('../llm/stepEvolutionSingleton');
const tableColumnStudySingleton = require('../llm/tableColumnStudySingleton');
const talbeRowStudySingleton = require('../llm/talbeRowStudySingleton');
const { HtmlSnapshotCompresed } = require('../snapshot')
const { PugGenerator } = require('../pugGenerator/pugGenerator')

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
        this.currentdStep = this.originalStep

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
            let generalResult = await generalClassificationSingleton.identifyElement(this.currentdStep, this.currentWebpage);
            if (!generalResult.outMostContainer) {
                return generalResult.targetElementId; // Return if not in a matrix/table
            }

            // Step 2: Step Evolution
            // Step 2-1: Step Evolution
            let stepEvolutionResult = await stepEvolutionSingleton.identifyElement(this.currentdStep, this.currentWebpage, generalResult.outMostContainer);
            this.updatedStep = stepEvolutionResult.updatedStep

            // Step 2-2: Prepare webpage for Table Processing
            this.currentWebpage = this._getPugTextById(this.htmlSnapshot, generalResult.outMostContainer)

            // Step 3: Table or Matrix Evaluation
            // Step 3-1: Row and Column Evaluation
            let columnResult;
            let rowResult;
            if (generalResult.outermostContainerType === 'table') {
                // Table Evaluation
                columnResult = await tableColumnStudySingleton.identifyElement(this.updatedStep, this.currentWebpage);
                rowResult = await talbeRowStudySingleton.identifyElement(this.updatedStep, this.currentWebpage);
            } else if (generalResult.outermostContainerType === 'matrix') {
                // Matrix Evaluation
                columnResult = await matrixColumnStudySingleton.identifyElement(this.updatedStep, this.currentWebpage);
                rowResult = await matrixRowStudySingleton.identifyElement(this.updatedStep, this.currentWebpage);
            }

            // Step 3-2: Table Analysis 
            let columnIndex = columnResult.columnHeaderList.indexOf(columnResult.columnHeaderCell)
            let rowIndex = rowResult.rowHeaderList.indexOf(rowResult.rowHeaderCell)

            /**@type {string} */
            let container
            // if both target element is neither in column header nor in row header
            if (!columnResult.isTargetColumnHeader && !rowResult.isTargetRowHeader) {
                //based on the result of row and column study, identify row and column header list
                let rowHeaderList = null
                if (!rowResult.isUniqueRowHeaders) {
                    rowHeaderList = rowResult.rowHeaderList
                }
                let columnHeaderList = null
                if (!columnResult.isUniqueColumnHeaders) {
                    columnHeaderList = columnResult.columnHeaderList
                }

                // identify the next-level container                
                let cellListResult = await cellListStudySingleton.identifyElement(this.updatedStep, this.currentWebpage, rowHeaderList, columnHeaderList);
                container = cellListResult.cellList[columnIndex][rowIndex]
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


}

module.exports = ElementIdentificationManager