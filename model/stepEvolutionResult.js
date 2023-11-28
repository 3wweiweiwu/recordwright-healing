/**
 * Represents the result of a step evolution.
 */
class StepEvolutionResult {
    /**
     * Creates a new instance of StepEvolutionResult.
     * @param {string} updatedStep - The updated step for target element identification.
     */
    constructor(updatedStep) {
        this.updatedStep = updatedStep;
    }

    /**
     * Parses the JSON text and creates a new instance of StepEvolutionResult.
     * @param {object} jsonData - The JSON text to parse.
     * @returns {StepEvolutionResult} - The parsed StepEvolutionResult instance.
     */
    static parseFromJSON(jsonData) {
        return new StepEvolutionResult(jsonData.UpdatedStep);
    }
}
module.exports = StepEvolutionResult