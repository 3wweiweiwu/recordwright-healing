class ElementContainerResult {
  /**
   *
   * @param {string} targetElementId
   * @param {string} isTargetMatrixTableGrid
   * @param {string} OutMostContainer
   */
  constructor(targetElementId, isTargetMatrixTableGrid, OutMostContainer) {
    this.targetElementId = targetElementId;
    this.isTargetMatrixTableGrid = isTargetMatrixTableGrid;
    this.OutMostContainer = OutMostContainer;
  }
}
module.exports = ElementContainerResult;
