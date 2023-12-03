/**
 * Represents a study of table rows.
 */
class TableIdentifierStudyResult {
    /**
     * Creates a new instance of TableRowStudyResult.
     * @param {string[]} firstCellList - Array of table identifier.
     */
    constructor(firstCellList) {
        this.firstCellList = firstCellList;
    }

    /**
     * Parses the JSON object and creates a new instance of TableRowStudyResult.
     * @param {object} jsonObject - The JSON object to parse.
     * @returns {TableIdentifierStudyResult} - The parsed TableRowStudyResult instance.
     */
    static parseFromJSON(jsonObject) {
        const {
            isUniqueRowHeaders,
            rowHeaderList,
            rowHeaderCell,
            isTargetRowHeader,
            targetElement
        } = jsonObject;

        return new TableIdentifierStudyResult(
            isUniqueRowHeaders,
            rowHeaderList,
            rowHeaderCell,
            isTargetRowHeader,
            targetElement
        );
    }
}

module.exports = TableIdentifierStudyResult;
