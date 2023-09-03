const Gpt = require("../gpt");
const { HtmlSnapshotCompresed } = require("../snapshot");

class ResolverLogEntry {
  /**
   *
   * @param {string} userMessage content of the message
   * @param {string} step current step name
   * @param {string} pugText the pug text
   * @param {string} responseText response from server
   * @param {object} responseObj JSON from server
   */
  constructor(userMessage, step, pugText, responseText, responseObj) {
    this.content = userMessage;
    this.step = step;
    this.pugText = pugText;
    this.response = response;
    this.responseObj = responseObj;
    this.responseText = responseText;
  }
}
class ResolverLogLog {
  constructor() {
    /**
     * @type {ResolverLogEntry[]}
     */
    this._log = [];
  }
  /**
   * add log entry
   * @param {string} userMessage content of the user message
   * @param {string} step current step name
   * @param {string} pugText the pug text
   * @param {string} responseText response from server
   * @param {object} responseObj JSON from server
   */
  addLogEntry(userMessage, step, pugText, responseText, responseObj) {
    let logEntry = new ResolverLogEntry(
      userMessage,
      step,
      pugText,
      responseText,
      responseObj
    );
    this._log.push(logEntry);
  }
  getLog() {
    return this._log;
  }
}

class ElementResolver {
  constructor() {
    this.gpt = new Gpt();
    this.log = new ResolverLogLog();
  }
  /**
   * Send request to GPT to resolve. And log the request and response
   * @param {string} testStep test step
   * @returns {object} JSON object
   */
  _sendGptPrompt(promptText) {
    let responseJson = this.gpt.sendPrompt(promptText);
    let responseText = this.gpt.getLastRawGptResponse();
    //add log entry
    this.log.addLogEntry(
      promptText,
      testStep,
      putText,
      responseText,
      responseJson
    );
    return responseJson;
  }
  _getElementContainer(testStep, putText) {
    //cosntruct test step
    let prompt = ["[Test Step]"];
    prompt.push(testStep);

    prompt.push("[Output]");
    prompt.push(
      'Output result in JSON format.Following is a template:\n{UpdatedStep:string,OuterTableCell:string[][],rowHeaderCell:string,columnHeaderCell:stringcolumnHeaderList:string[],rowHeaderList:string[]targetElementId:string}\n"UpdatedStep" represents updated step for target element identification. Given known the table cell container, update the test step to remove relevant information that is used to identify data cell container. Keep relevant information to identify target element. Minimize the change to the test step and try to minimize the information from original step. If you reference table cell container in the updated step, reference that as "specified wrapper table cell" only.\n"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container is in "tag#id" format such as "div#100". The output do not include row and column header.\n"rowHeaderCell" represents the column that uniquely identifies the row in the out-most table containing the target element. The cell container is in "tag#id" format\n"columnHeaderCell" represents the row that uniquely identifies the column in the out-most table containing the target element. The cell container is in "tag#id" format\n"columnHeaderList" represents array of column header container for the out-most table. The container is in "tag#id" format\n"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format\n"targetElementId" represents id of target element in tag#id format such as "div#100"'
    );
    prompt.push("[Web Page]");
    prompt.push(putText);

    let promptText = prompt.join("\n");

    let result = this._sendGptPrompt(promptText);
  }
  _get
}

module.exports = ElementResolver;
