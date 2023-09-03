class CellLocationResult {
  /**
   *
   * @param {UpdatedStep} UpdatedStep
   * @param {string} rowHeaderCell
   * @param {string} columnHeaderCell
   * @param {UpdatedStep} columnHeaderList
   * @param {string} rowHeaderList
   * @param {string} targetElementId
   * @param {string} isTargetColumnHeader
   * @param {string} isTargetRowHeader
   */
  constructor(
    UpdatedStep,
    rowHeaderCell,
    columnHeaderCell,
    columnHeaderList,
    rowHeaderList,
    targetElementId,
    isTargetColumnHeader,
    isTargetRowHeader
  ) {
    this.UpdatedStep = UpdatedStep;
    this.rowHeaderCell = rowHeaderCell;
    this.columnHeaderCell = columnHeaderCell;
    this.columnHeaderList = columnHeaderList;
    this.rowHeaderList = rowHeaderList;
    this.targetElementId = targetElementId;
    this.isTargetColumnHeader = isTargetColumnHeader;
    this.isTargetRowHeader = isTargetRowHeader;
  }
}
module.exports = CellLocationResult;
