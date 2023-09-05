const ElementResolverTemplate = require("./ElementResolverTemplate");
class CellLocationResult extends ElementResolverTemplate {
  /**
   *
   * @param {string} UpdatedStep
   * @param {string} rowHeaderCell
   * @param {string} columnHeaderCell
   * @param {string[]} columnHeaderList
   * @param {string[]} rowHeaderList
   * @param {string} targetElementId
   * @param {boolean} isTargetColumnHeader
   * @param {boolean} isTargetRowHeader
   * @param {string[][]} tableCell
   */
  constructor(
    UpdatedStep,
    rowHeaderCell,
    columnHeaderCell,
    columnHeaderList,
    rowHeaderList,
    targetElementId,
    isTargetColumnHeader,
    isTargetRowHeader,
    tableCell
  ) {
    super();
    this.UpdatedStep = UpdatedStep;
    this.rowHeaderCell = rowHeaderCell;
    this.columnHeaderCell = columnHeaderCell;
    this.columnHeaderList = columnHeaderList;
    this.rowHeaderList = rowHeaderList;
    this.targetElementId = targetElementId;
    this.isTargetColumnHeader = isTargetColumnHeader;
    this.isTargetRowHeader = isTargetRowHeader;
    this.tableCell = tableCell;
    this.isComplete = this.getIsEnd();
  }
  /**
   * check if target element is within a table cell
   * @returns {boolean}
   */
  _getIsElementInTableCell() {
    if (this.isTargetColumnHeader || this.isTargetRowHeader) {
      return false;
    }

    //get row index based on column header list and column header cell
    let columnIndex = this.columnHeaderList.indexOf(this.columnHeaderCell);
    //get column index based on row header list and row header cell
    let rowIndex = this.rowHeaderList.indexOf(this.rowHeaderCell);

    //get the table cell within the table
    let tableCell = null;
    try {
      tableCell = this.tableCell[rowIndex][columnIndex];
    } catch (error) {
      return null;
    }

    //if the table cell match the target element, the target element is within the table cell itself.
    if (tableCell === this.targetElementId) {
      return true;
    } else if (tableCell == null) {
      return null;
    }
    return false;
  }
  /**
   * check if target element is within a row header
   * @returns {boolean}
   */
  _getIsElementInRowHeader() {
    if (!this.isTargetRowHeader) return false;
    //get row index based on column header list and column header cell
    let rowIndex = this.rowHeaderList.indexOf(this.rowHeaderCell);

    //get the table cell within the table
    let roHeaderCell = this.rowHeaderList[rowIndex];

    //if the table cell match the target element, the target element is within the table cell itself.
    if (roHeaderCell === this.targetElementId) {
      return true;
    } else if (roHeaderCell == null) {
      return null;
    }

    return false;
  }
  /**
   * check if target element is within a column header
   * @returns {boolean}
   */
  _getIsElementInColHeader() {
    if (!this.isTargetColumnHeader) return false;
    //get column index based on row header list and row header cell
    let columnIndex = this.columnHeaderList.indexOf(this.columnHeaderCell);

    //get the table cell within the table
    let colHeaderCell = this.columnHeaderList[columnIndex];

    //if the table cell match the target element, the target element is within the table cell itself.
    if (colHeaderCell === this.targetElementId && this.isTargetColumnHeader) {
      return true;
    } else if (colHeaderCell == null) {
      return null;
    }
    return false;
  }
  getIsEnd() {
    let isInCell = this._getIsElementInTableCell();
    if (isInCell) {
      return true;
    }

    let isInRowHeader = this._getIsElementInRowHeader();
    if (isInRowHeader) {
      return true;
    }

    let isInColHeader = this._getIsElementInColHeader();
    if (isInColHeader) {
      return true;
    }
    if (isInCell == null || isInRowHeader == null || isInColHeader == null) {
      return null;
    }
    return false;
  }
  static gptFunctions = [
    {
      name: "get_element_location",
      description:
        "get element location in table based on test step and web page layout",
      parameters: {
        type: "object",
        properties: {
          UpdatedStep: {
            type: "string",
            description:
              "updated step for target element identification. Given known the table cell container, update the test step to remove relevant information that is used to identify data cell container. Keep relevant information to identify target element. Minimize the change to the test step and try to minimize the information from original step. If you reference table cell container in the updated step, reference that as 'specified wrapper table cell' only.",
          },
          rowHeaderCell: {
            type: "string,",
            description:
              "the column that uniquely identifies the row in the out-most table containing the target element. The cell container is in 'tag#id' format(i.e div#100)",
          },
          columnHeaderCell: {
            type: "string,",
            description:
              "the row that uniquely identifies the column in the out-most table containing the target element. The cell container is in 'tag#id' format(i.e div#100)",
          },
          columnHeaderList: {
            type: "string[]",
            description:
              "array of column header container for the out-most table. The container is in 'tag#id' format(i.e. ['div#100',div#101'])",
          },
          rowHeaderList: {
            type: "string[]",
            description:
              "array of row header container for the out-most table. The container is in 'tag#id' format(i.e. ['div#100',div#101'])",
          },
          targetElementId: {
            type: "string",
            description:
              "returns id of target element in tag#id format(i.e. 'div#100')",
          },
          isTargetRowHeader: {
            type: "boolean",
            description:
              "if target element is a within a row header container(i.e true, false)",
          },
          isTargetColumnHeader: {
            type: "boolean",
            description:
              "if target element is within a column header container(i.e true, false)",
          },
        },
        required: [
          "targetElementId",
          "UpdatedStep",
          "rowHeaderCell",
          "columnHeaderCell",
          "columnHeaderList",
          "rowHeaderList",
          "isTargetColumnHeader",
          "isTargetRowHeader",
        ],
      },
    },
  ];
  static functionCall = { name: CellLocationResult.gptFunctions[0].name };
}
module.exports = CellLocationResult;
