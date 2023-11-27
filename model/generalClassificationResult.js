/**
 * Represents general classification information, including target element and its outermost container.
 */
class GeneralClassificationModel {
    /**
     * Creates an instance of GeneralClassificationModel.
     * @param {string} targetElementId - The ID of the target element in "tag#id" format.
     * @param {string|null} outMostContainer - The outermost container of the target element in "tag#id" format, or null if it does not exist.
     * @param {"matrix"|"table"|null} outermostContainerType - The type of the outermost container, can be "matrix", "table", or null.
     */
    constructor(targetElementId, outMostContainer, outermostContainerType) {
        this.targetElementId = targetElementId;
        this.outMostContainer = outMostContainer;
        this.outermostContainerType = outermostContainerType;
    }

    /**
     * Parses a JSON object to create an instance of GeneralClassificationModel.
     * @param {Object} json - The JSON object to parse.
     * @return {GeneralClassificationModel} An instance of GeneralClassificationModel.
     */
    static parseFromJSON(json) {
        return new GeneralClassificationModel(
            json.targetElementId,
            json.OutMostContainer,
            json.OutermostContainerType
        );
    }
}
module.exports = GeneralClassificationModel