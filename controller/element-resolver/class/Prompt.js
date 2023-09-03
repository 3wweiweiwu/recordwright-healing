class Prompt {
  /**
   *
   * @param {string} testStep
   * @param {string} webPage
   */
  constructor(testStep, webPage) {
    this.testStep = testStep;
    /**@type {string} */
    this.output = output;
    this.webPage = webPage;
  }
  toString() {
    //cosntruct test step
    let prompt = ["[Test Step]"];
    prompt.push(this.testStep);

    prompt.push("[Output]");
    prompt.push(
      'Output result in JSON format.Following is a template:\n{UpdatedStep:string,OuterTableCell:string[][],rowHeaderCell:string,columnHeaderCell:stringcolumnHeaderList:string[],rowHeaderList:string[]targetElementId:string}\n"UpdatedStep" represents updated step for target element identification. Given known the table cell container, update the test step to remove relevant information that is used to identify data cell container. Keep relevant information to identify target element. Minimize the change to the test step and try to minimize the information from original step. If you reference table cell container in the updated step, reference that as "specified wrapper table cell" only.\n"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container is in "tag#id" format such as "div#100". The output do not include row and column header.\n"rowHeaderCell" represents the column that uniquely identifies the row in the out-most table containing the target element. The cell container is in "tag#id" format\n"columnHeaderCell" represents the row that uniquely identifies the column in the out-most table containing the target element. The cell container is in "tag#id" format\n"columnHeaderList" represents array of column header container for the out-most table. The container is in "tag#id" format\n"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format\n"targetElementId" represents id of target element in tag#id format such as "div#100"'
    );
    prompt.push("[Web Page]");
    prompt.push(putText);

    let promptText = prompt.join("\n");
  }
}
