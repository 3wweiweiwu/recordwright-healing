const HtmlSnapshotCompresed = require('../snapshot').HtmlSnapshotCompresed;
const PugGenerator = require('../pugGenerator/pugGenerator');

/**
 * Manages the identification of elements within a web page.
 */
class ElementIdentificationManager {
    /**
     * Constructs an instance of ElementIdentificationManager with optional dependencies for testing.
     * @param {object} [dependencies] - The dependencies required for element identification.
     */
    constructor(dependencies) {
        this.dependencies = dependencies || {
            generalClassificationSingleton: require('../llm/generalClassificationSingleton'),
            stepEvolutionSingleton: require('../llm/stepEvolutionSingleton'),
            tableColumnStudySingleton: require('../llm/tableColumnStudySingleton'),
            talbeRowStudySingleton: require('../llm/talbeRowStudySingleton'),
            matrixColumnStudySingleton: require('../llm/matrixColumnStudySingleton'),
            matrixRowStudySingleton: require('../llm/matrixRowStudySingleton'),
            cellListStudySingleton: require('../llm/cellListStudySingleton')
        };
    }

    /**
     * Extracts the element ID from a given element string.
     * @param {string} element - The element string to extract ID from.
     * @returns {number} The extracted element ID.
     */
    _getElementId(element) {
        return parseInt(element.split('#')[1]);
    }

    /**
     * Identifies the target element based on the test step and HTML snapshot.
     * @param {string} testStep - The test step to use for identification.
     * @param {string} htmlSnap - The PUG HTML snapshot of the web page.
     * @returns {Promise<string>} The ID of the target element.
     */
    async identifyElement(testStep, htmlSnap) {
        const MAX_ITERATIONS = 10;
        let webpage = this._createWebpageFromSnapshot(htmlSnap);

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            const generalResult = await this._performGeneralEvaluation(testStep, webpage);
            if (!generalResult.outMostContainer) {
                return generalResult.targetElementId; // Direct identification, no container involved
            }

            let updatedStep = await this._evolveStep(testStep, webpage, generalResult.outMostContainer);
            webpage = this._updateWebpage(webpage, generalResult.targetElementId);

            const { columnResult, rowResult } = await this._evaluateTableOrMatrix(generalResult, updatedStep, webpage);
            const container = await this._determineNextLevelContainer(columnResult, rowResult, generalResult, updatedStep, webpage);

            if (generalResult.targetElementId === container) {
                return generalResult.targetElementId; // Identification within the container
            }

            updatedStep = await this._evolveStep(updatedStep, webpage, container);
            webpage = this._updateWebpage(webpage, container);
        }

        return generalResult.targetElementId; // Final fallback identification
    }

    /**
     * Creates a webpage object from a given HTML snapshot.
     * @param {string} htmlSnap - The HTML snapshot to process.
     * @returns {string} The webpage string representation.
     */
    _createWebpageFromSnapshot(htmlSnap) {
        const webPageSnapshot = new HtmlSnapshotCompresed(htmlSnap);
        const pugGen = new PugGenerator(JSON.stringify(webPageSnapshot.atomicNodeMatrix));
        pugGen.createPugFile();
        return pugGen.pugStr; // Returns the generated Pug string of the webpage
    }

    /**
     * Performs a general evaluation to identify elements.
     * @param {string} testStep - The test step for identification.
     * @param {string} webpage - The webpage for evaluation.
     * @returns {Promise<object>} The result of the general classification.
     */
    _performGeneralEvaluation(testStep, webpage) {
        return this.dependencies.generalClassificationSingleton.identifyElement(testStep, webpage);
    }

    /**
     * Evolves the test step based on the container context.
     * @param {string} testStep - The current test step.
     * @param {string} webpage - The webpage for context.
     * @param {string} container - The container element to consider.
     * @returns {Promise<string>} The evolved test step.
     */
    _evolveStep(testStep, webpage, container) {
        return this.dependencies.stepEvolutionSingleton.identifyElement(testStep, webpage, container);
    }

    /**
     * Updates the webpage for the next iteration of identification.
     * @param {string} webpage - The current webpage.
     * @param {string} elementId - The ID of the element to focus on.
     * @returns {string} The updated webpage string.
     */
    _updateWebpage(webpage, elementId) {
        const targetId = this._getElementId(elementId);
        const targetNodeChildrenMatrix = webPageSnapshot.getChildrenAtomicMatrixById(targetId);
        const pugGen = new PugGenerator(JSON.stringify(targetNodeChildrenMatrix));
        pugGen.createPugFile();
        return pugGen.pugStr; // Returns the updated webpage string
    }

    /**
     * Evaluates whether the element is within a table or matrix and processes accordingly.
     * @param {object} generalResult - The result from general evaluation.
     * @param {string} updatedStep - The updated test step.
     * @param {string} webpage - The webpage for evaluation.
     * @returns {Promise<object>} The results of the table or matrix evaluation.
     */
    async _evaluateTableOrMatrix(generalResult, updatedStep, webpage) {
        // Handling for table and matrix structures
        // ... implementation
    }

    /**
     * Determines the next level container for the element.
     * @param {object} columnResult - The result of the column evaluation.
     * @param {object} rowResult - The result of the row evaluation.
     * @param {object} generalResult - The result from general evaluation.
     * @param {string} updatedStep - The updated test step.
     * @param {string} webpage - The webpage for evaluation.
     * @returns {Promise<string>} The ID of the next level container.
     */
    async _determineNextLevelContainer(columnResult, rowResult, generalResult, updatedStep, webpage) {
        // Logic to determine the next level container
        // ... implementation
    }
}

module.exports = new ElementIdentificationManager();
