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
     * @param {string} jsonText - The JSON text to parse.
     * @returns {StepEvolutionResult} - The parsed StepEvolutionResult instance.
     */
    static parseFromJson(jsonText) {
        const jsonData = JSON.parse(jsonText);
        const updatedStep = jsonData.UpdatedStep;
        return new StepEvolutionResult(updatedStep);
    }
}
module.exports = StepEvolutionResult