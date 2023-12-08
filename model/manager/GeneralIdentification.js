const ElementIdentificationTemplate = require('./ElementIdentificationTemplate');
const ElementIdentificationStepResult = require('../elementIdentificationStepResult');
const { HtmlSnapshotCompresed } = require('../../service/snapshot')
class GeneralClassification extends ElementIdentificationTemplate {
    /**
     * 
     * @param {HtmlSnapshotCompresed} htmlSnapshot 
     */
    constructor(htmlSnapshot) {
        super(htmlSnapshot)
    }
    /**
     * 
     * @param {string} webpage 
     * @param {string} testStep 
     * @returns {ElementIdentificationStepResult}
     */
    async identifyElement(webpage, testStep) {
        let generalResult = await generalClassificationSingleton.identifyElement(webpage, testStep);
        let currentOperation = LlmOperationConstant.GENERAL_CLASSIFICATION
        if (generalResult.outermostContainerType == null || generalResult.outermostContainerType == 'table') {


            let result = new ElementIdentificationStepResult(generalResult.targetElementId, currentOperation, null, webpage, testStep)
            return result; // Return if not in a matrix
        }


        // Step 2: Step Evolution
        // Step 2-1: Step Evolution
        let updatedStep = ''
        let currentWebpage = ''
        let stepEvolutionResult = await stepEvolutionSingleton.identifyElement(updatedStep, currentWebpage, generalResult.outMostContainer);
        updatedStep = stepEvolutionResult.updatedStep

        // Step 2-2: Prepare webpage for Table Processing
        currentWebpage = this._getPugTextById(this.htmlSnapshot, generalResult.outMostContainer)

        //decide what's next step
        let nextStep = ''
        if (generalResult.outermostContainerType === 'matrix') {
            nextStep = LlmOperationConstant.MATRIX_IDENTIFICATION
        }

        let result = new ElementIdentificationStepResult(generalResult.targetElementId, currentOperation, nextStep, updatedStep, currentWebpage)
        return result

    }

}
module.exports = GeneralClassification