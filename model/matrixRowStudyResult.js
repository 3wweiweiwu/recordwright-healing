/**
 * Represents a study of table rows.
 */
class MatrixRowStudyResult {
    /**
     * Creates a new instance of matrixRowStudyResult.
     * @param {boolean} isUniqueRowHeaders - Indicates if the table has unique row headers.
     * @param {string[]} rowHeaderList - Array of row header containers for the outermost table.
     * @param {string} rowHeaderCell - The row header that uniquely identifies the row containing the target element.
     * @param {boolean} isTargetRowHeader - Indicates if the target element is within a row header container.
     * @param {string} targetElement - The ID of the target element in "tag#id" format.
     */
    constructor(isUniqueRowHeaders, rowHeaderList, rowHeaderCell, isTargetRowHeader, targetElement) {
        this.isUniqueRowHeaders = isUniqueRowHeaders;
        this.rowHeaderList = rowHeaderList;
        this.rowHeaderCell = rowHeaderCell;
        this.isTargetRowHeader = isTargetRowHeader;
        this.targetElement = targetElement;
    }

    /**
     * Parses the JSON object and creates a new instance of matrixRowStudyResult.
     * @param {object} jsonObject - The JSON object to parse.
     * @returns {MatrixRowStudyResult} - The parsed tableRowStudyResult instance.
     */
    static parseFromJSON(jsonObject) {
        const {
            isUniqueRowHeaders,
            rowHeaderList,
            rowHeaderCell,
            isTargetRowHeader,
            targetElement
        } = jsonObject;

        return new MatrixRowStudyResult(
            isUniqueRowHeaders,
            rowHeaderList,
            rowHeaderCell,
            isTargetRowHeader,
            targetElement
        );
    }
}

module.exports = MatrixRowStudyResult;
