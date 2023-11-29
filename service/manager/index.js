const cellListStudySingleton = require('../llm/cellListStudySingleton');
const generalClassificationSingleton = require('../llm/generalClassificationSingleton');
const matrixColumnStudySingleton = require('../llm/matrixColumnStudySingleton');
const matrixRowStudySingleton = require('../llm/matrixRowStudySingleton');
const stepEvolutionSingleton = require('../llm/stepEvolutionSingleton');
const tableColumnStudySingleton = require('../llm/tableColumnStudySingleton');
const talbeRowStudySingleton = require('../llm/talbeRowStudySingleton');
const { HtmlSnapshotCompresed } = require('../../service/snapshot')

class ElementIdentificationManager {
    constructor() { }
    /**
     * @param {string} testStep
     * @param {HtmlSnapshot} htmlSnap
     * @returns {string} the id of target element
     **/
    async identifyElement(testStep, htmlSnap) {
        // Parse HTML snapshot
        let webPage = new HtmlSnapshotCompresed(htmlSnap)

        // Step 1: General Evaluation
        let generalResult = await generalClassificationSingleton.identifyElement(testStep, webPage);
        if (!generalResult.outMostContainer) {
            return generalResult.targetElementId; // Return if not in a matrix/table
        }

        webPage = webPage.getNodeInformationById

        // Step 2: Step Evolution
        let updatedStep = await stepEvolutionSingleton.identifyElement(testStep, webPage, generalResult.outMostContainer);

        // Step 3: Table or Matrix Evaluation
        let evaluationResult;
        if (generalResult.outermostContainerType === 'table') {
            // Table Evaluation
            evaluationResult = await tableColumnStudySingleton.identifyElement(updatedStep, webPage);
            evaluationResult = await talbeRowStudySingleton.identifyElement(updatedStep, webPage);
        } else if (generalResult.outermostContainerType === 'matrix') {
            // Matrix Evaluation
            evaluationResult = await matrixColumnStudySingleton.identifyElement(updatedStep, webPage);
            evaluationResult = await matrixRowStudySingleton.identifyElement(updatedStep, webPage);
        }

        // Further Actions if needed
        if (evaluationResult && evaluationResult.targetElement !== generalResult.targetElementId) {
            // Re-run General Evaluation with updated parameters
            return identifyElement(updatedStep, webPage);
        }

        return generalResult.targetElementId;
    }


}