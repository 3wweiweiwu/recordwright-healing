const generalClassificationSingleton = require('../../llm/generalClassificationSingleton')
const stepEvolutionSingleton = require('../../llm/stepEvolutionSingleton')
const ElementIdentificationTemplate = require('../../../model/manager/ElementIdentificationTemplate');
const ElementIdentificationStepResult = require('../../../model/elementIdentificationStepResult');
const { HtmlSnapshotCompresed } = require('../../snapshot')
const LlmOperationConstant = require('../../../model/constant/LlmOperationConstant')
class GeneralClassification extends ElementIdentificationTemplate {
    /**
     * @param {HtmlSnapshotCompresed} htmlSnap PUG HTML Snapshot
     * @param {string} testStep Test Step
     * @param {string} containerId id of the container of the element to be identified. if container id is null, return whole pug page
     **/
    constructor(htmlSnap, testStep, containerId = null) {
        super(htmlSnap, testStep, containerId)
    }
    /**
     * Identify the element
     * @returns {ElementIdentificationStepResult}
     */
    async identifyElement() {
        let webpage = this.webPage
        let testStep = this.testStep
        let generalResult = await generalClassificationSingleton.identifyElement(testStep, webpage);
        let currentOperation = LlmOperationConstant.GENERAL_CLASSIFICATION
        if (generalResult.outermostContainerType == null || generalResult.outermostContainerType == 'table') {


            let result = new ElementIdentificationStepResult(generalResult.targetElementId, currentOperation, null, testStep, webpage)
            return result; // Return if not in a matrix
        }
        // Step 2: Step Evolution
        // Step 2-1: Step Evolution
        let updatedStep = testStep
        let stepEvolutionResult = await stepEvolutionSingleton.identifyElement(testStep, webpage, generalResult.outMostContainer);
        updatedStep = stepEvolutionResult.updatedStep

        // Step 2-2: Prepare webpage for Table Processing
        webpage = this._getPugTextById(this.htmlSnapshot, generalResult.outMostContainer)

        //decide what's next step
        let nextStep = ''
        if (generalResult.outermostContainerType === 'matrix') {
            nextStep = LlmOperationConstant.MATRIX_IDENTIFICATION
        }

        let result = new ElementIdentificationStepResult(generalResult.targetElementId, currentOperation, nextStep, updatedStep, webpage)
        return result

    }

}
module.exports = GeneralClassification