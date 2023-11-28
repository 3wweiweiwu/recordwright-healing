/**
 * Represents a study of table columns.
 */
class TableColumnStudy {
    /**
     * Creates a new instance of TableColumnStudy.
     * @param {boolean} isUniqueColumnHeaders - Indicates if the table has unique column headers.
     * @param {string[]} columnHeaderList - Array of column header containers for the outermost table.
     * @param {string} columnHeaderCell - The column header that uniquely identifies the column containing the target element.
     * @param {boolean} isTargetColumnHeader - Indicates if the target element is within a column header container.
     * @param {string} targetElement - The ID of the target element in "tag#id" format.
     */
    constructor(isUniqueColumnHeaders, columnHeaderList, columnHeaderCell, isTargetColumnHeader, targetElement) {
        this.isUniqueColumnHeaders = isUniqueColumnHeaders;
        this.columnHeaderList = columnHeaderList;
        this.columnHeaderCell = columnHeaderCell;
        this.isTargetColumnHeader = isTargetColumnHeader;
        this.targetElement = targetElement;
    }

    /**
     * Parses the JSON object and creates a new instance of TableColumnStudy.
     * @param {object} jsonObject - The JSON object to parse.
     * @returns {TableColumnStudy} - The parsed TableColumnStudy instance.
     */
    static parseFromJSON(jsonObject) {
        const {
            isUniqueColumnHeaders,
            columnHeaderList,
            columnHeaderCell,
            isTargetColumnHeader,
            targetElement
        } = jsonObject;

        return new TableColumnStudy(
            isUniqueColumnHeaders,
            columnHeaderList,
            columnHeaderCell,
            isTargetColumnHeader,
            targetElement
        );
    }
}

module.exports = TableColumnStudy