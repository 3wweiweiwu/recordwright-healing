/**
 * Represents a study of table rows.
 */
class TableTargetIdentifier {
    /**
     * Creates a new instance of TableRowStudyResult.
     * @param {string} characterItem - The identifier of row/column the target element is in.
     * @param {string} targetElement - The id of target element.
     */
    constructor(characterItem, targetElement) {
        this.characterItem = characterItem;
        this.targetElement = targetElement;
    }
}

module.exports = TableTargetIdentifier;
