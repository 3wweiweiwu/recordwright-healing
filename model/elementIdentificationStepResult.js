const LlmOperationConstant = require('./constant/LlmOperationConstant');

class ElementIdentificationStepResult {
    /**
     * 
     * @param {string} targetElementId 
     * @param {keyof LlmOperationConstant} currentOperation 
     * @param {keyof LlmOperationConstant} nextOperation 
     * @param {string} updatedStep 
     * @param {string} updatedWebPage 
     */
    constructor(targetElementId, currentOperation, nextOperation, updatedStep, updatedWebPage) {
        this.targetElementId = targetElementId;
        this.currentOperation = currentOperation;
        this.updatedStep = updatedStep;
        this.updatedWebPage = updatedWebPage;
        this.nextOperation = nextOperation;
    }
}
module.exports = ElementIdentificationStepResult