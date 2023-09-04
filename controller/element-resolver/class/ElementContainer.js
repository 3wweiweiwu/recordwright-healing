const ElementResolverTemplate = require("./ElementResolverTemplate");
class ElementContainer extends ElementResolverTemplate {
  /**
   *
   * @param {string} targetElementId
   * @param {string} isTargetMatrixTableGrid
   * @param {string} OutMostContainer
   */
  constructor(targetElementId, isTargetMatrixTableGrid, OutMostContainer) {
    super();
    this.targetElementId = targetElementId;
    this.isTargetMatrixTableGrid = isTargetMatrixTableGrid;
    this.OutMostContainer = OutMostContainer;
    this.isComplete = this.getIsEnd();
  }
  /**
   * If target element is simple form, we can use result directly
   * @returns {boolean}
   */
  getIsEnd() {
    if (this.isTargetMatrixTableGrid == false) {
      return true;
    }
    return false;
  }
  static gptFunctions = [
    {
      name: "get_element_information",
      description:
        "get element information based on test step and web page layout",
      parameters: {
        type: "object",
        properties: {
          targetElementId: {
            type: "string",
            description:
              "returns id of target element in tag#id format(i.e. 'div#100')",
          },
          isTargetMatrixTableGrid: {
            type: "boolean",
            description:
              "if target element is in a table, or grid or matrix(i.e true, false)",
          },
          OutMostContainer: {
            type: "string",
            description:
              "returns id of the out-most table or grid container for the target element described in test step in tag#id foramt(i.e. div#100)",
          },
        },
        required: ["targetElementId"],
      },
    },
  ];
  static functionCall = { name: ElementContainer.gptFunctions[0].name };
}

module.exports = ElementContainer;
