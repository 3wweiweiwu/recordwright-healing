/**
 * Represents a study of matrix columns.
 */
class CellListStudyResult {
    /**
     * Creates a new instance of matrixColumnStudyResult.
     * @param {string[][]} outerTableCell - An array of rows, where each row is an array of data cell containers in "tag#id" format.
     */
    constructor(outerTableCell) {
        this.outerTableCell = outerTableCell;
    }

    /**
     * Parses the JSON object and creates a new instance of matrixColumnStudyResult.
     * @param {object} jsonObject - The JSON object to parse.
     * @returns {CellListStudyResult} - The parsed matrixColumnStudyResult instance.
     */
    static parseFromJSON(jsonObject) {
        const { OuterTableCell } = jsonObject;

        return new CellListStudyResult(OuterTableCell);
    }
}

module.exports = CellListStudyResult;
