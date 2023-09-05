const Gpt = require("../gpt");
const { HtmlSnapshotCompresed } = require("../snapshot");
const ElementContainer = require("./class/ElementContainer");
const Prompt = require("./class/Prompt");

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
    this.gpt = new Gpt(Gpt.SYSTEM_ROLE.QA_ENGINEER_FUNCTION);
    this.log = new ResolverLogLog();
  }
  /**
   * Send request to GPT to resolve. And log the request and response
   * @param {string} promptText test step
   * @param {function} jsonExtractor - function to extract JSON from the response
   * @param {object[]} functions - list of functions to be used in the GPT
   * @param {object} functionCall - function call to be used in the GPT
   * @param {string} testStep
   * @param {string} pugText
   * @returns {object} JSON object
   */
  async _sendGptPrompt(
    promptText,
    jsonExtractor,
    functions,
    functionCall,
    testStep,
    pugText
  ) {
    let responseJson = await this.gpt.sendPrompt(
      promptText,
      jsonExtractor,
      functions,
      functionCall
    );
    let responseText = this.gpt.getLastRawGptResponse();
    //add log entry
    this.log.addLogEntry(
      promptText,
      testStep,
      pugText,
      responseText,
      responseJson
    );
    return responseJson;
  }
  /**
   * Get element container based on test step and pug text
   * @param {string} testStep
   * @param {string} pugText
   * @returns {ElementContainer}
   * @returns
   */
  async _getElementContainer(testStep, pugText) {
    //clear history
    this.gpt.clearHistory();
    //cosntruct test step
    let prompt = new Prompt(testStep, pugText);
    /**@type {ElementContainer} */
    let gptRawResult = await this._sendGptPrompt(
      prompt.toString(),
      undefined,
      ElementContainer.gptFunctions,
      ElementContainer.functionCall,
      testStep,
      pugText
    );
    let elementContainerResult = new ElementContainer(
      gptRawResult.targetElementId,
      gptRawResult.isTargetMatrixTableGrid,
      gptRawResult.OutMostContainer
    );
    return elementContainerResult;
  }

  async _getCellLocationInTable(testStep, pugText) {
    //clear history
    this.gpt.clearHistory();
    //cosntruct test step
    let prompt = new Prompt(testStep, pugText);
    /**@type {ElementContainer} */
    let gptRawResult = await this._sendGptPrompt(
      prompt.toString(),
      undefined,
      ElementContainer.gptFunctions,
      ElementContainer.functionCall,
      testStep,
      pugText
    );
    let cellLocation = gptRawResult.cellLocation;
    return cellLocation;
  }
}

module.exports = ElementResolver;
