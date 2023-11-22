const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const config = require("../../config");

class GptMeseager {
  /**
   *
   * @param {string} role - role to be used in the chat sample value: GptMessager.SYSTEM_PROMPT.QA_ENGINEER
   */
  constructor(role = GptMeseager.SYSTEM_ROLE.QA_ENGINEER) {
    this.client = new OpenAIClient(
      "https://recordwright.openai.azure.com/",
      new AzureKeyCredential(config.gpt_model.apiKey)
    );
    /**@type {string[]} chat message */
    this.chatMessage = [];
    this._role = role;

    this._setSystemPromptToChatMessage(role);
  }
  static SYSTEM_ROLE = {
    QA_ENGINEER: "QA_ENGINEER",
    QA_ENGINEER_FUNCTION: "QA_ENGINEER_FUNCTION",
  };
  /**
   * Clear chat history
   **/
  clearHistory() {
    this.chatMessage = [];
    this._setSystemPromptToChatMessage(this._role);
  }
  /**
   * Set the system prompt to the chat message
   * @param {string} role
   * @throws {Error} if role is not defined in system prompt
   * @returns {void}
   **/
  _setSystemPromptToChatMessage(role) {
    //delete old system message prompt
    this.chatMessage = this.chatMessage.filter(
      (message) => message.role !== "system"
    );
    //check if the role is defined in system_prompt, if not, throw error
    if (!GptMeseager.SYSTEM_ROLE[role]) {
      throw new Error("Role is not defined in system prompt");
    }
    let systemPrompt = "";
    switch (role) {
      case GptMeseager.SYSTEM_ROLE.QA_ENGINEER:
        systemPrompt =
          "You are a quality engineer try to identify web element in a web page based on test step, and output according to the spec. Following three section provide information for you. Web Page section contains a web page and layout in PUG template. Current div tags are placeholder, you need to evaluate the most suitable tag for each web element based on the textual and layout context. Test Step section provides test procedure. Understand test step context based on the web page. Output section provides rules you should follow to output result. Each section header is wrapped around square brackets []";
        break;
      case GptMeseager.SYSTEM_ROLE.QA_ENGINEER_FUNCTION:
        systemPrompt =
          "You are a quality engineer try to identify web element in a web page based on test step. Following two section provide information for you. Web Page section contains a web page and layout in PUG template. Current div tags are placeholder, you need to evaluate the most suitable tag for each web element based on the textual and layout context. Test Step section provides test procedure. Understand test step context based on the web page. Each section header is wrapped around square brackets []";
        break;
      default:
        break;
    }
    //add new system message prompt to the beginning of chat message
    this.chatMessage.unshift({
      role: "system",
      content: systemPrompt,
    });
  }
  /**
   * Based on the word count in userMessage, return the model to use.
   * If word count is less than 8100, use GPT,
   * if word count is greater than 8100 and less than 32767, use GPT32,
   * if word count is greater than 32767, throw error
   * @param {string[]} userMessage
   */
  _getDeploymentName(userMessage) {
    const wordCount = 1000; //TODO: replace this with actual word count
    if (wordCount < 8100) {
      return "heal-basic";
    } else if (wordCount < 32767) {
      return "heal-advanced";
    }
    throw new Error("Word count is too high");
  }
  /**
   * Send prompt to GPT and return the response
   * @param {string} userMessage
   * @param {function} jsonExtractor - function to extract JSON from the response
   * @param {object[]} functions - list of functions to be used in the GPT
   * @param {object} functionCall - function call to be used in the GPT
   * @returns {string} response from GPT
   **/
  async sendPrompt(
    userMessage,
    jsonExtractor = this._extractJson,
    functions = undefined,
    functionCall = undefined
  ) {
    const deploymentName = this._getDeploymentName(userMessage);

    //add user message to chat message
    this.chatMessage.push({
      role: "user",
      content: userMessage,
    });
    //send chat message to GPT
    const response = await this.client.getChatCompletions(
      deploymentName,
      this.chatMessage,
      {
        temperature: 0,
        maxTokens: 800,
        topP: 0.95,
        frequencyPenalty: 0,
        presencePenalty: 0,
        functionCall: functionCall,
        functions: functions,
      }
    );

    //add response to chat message
    let responseMessage = response.choices[0].message.content;

    if (response.choices[0].message.functionCall) {
      responseMessage = response.choices[0].message.functionCall.arguments;
    }
    this.chatMessage.push({
      role: "assistant",
      content: responseMessage,
    });

    //extract JSON from response if there is a need
    if (jsonExtractor != null) {
      responseMessage = jsonExtractor(responseMessage);
    }
    return responseMessage;
  }
  /**
   * Extract JSON from the given text
   * @param {string} text
   * @returns {object} JSON object
   * @throws {Error} if no valid JSON found in the given text
   **/
  _extractJson(text) {
    const jsonPattern = /{[\s\S]*?}/; // This regex captures everything between opening and closing curly braces
    const match = text.match(jsonPattern);
    if (match) {
      return JSON.parse(match[0]);
    } else {
      throw new Error("No valid JSON found in the given text: " + text);
    }
  }
  /**
   * Get the last raw GPT response
   * @returns {string} last raw GPT response
   */
  getLastRawGptResponse() {
    return this.chatMessage[this.chatMessage.length - 1].content;
  }
}
module.exports = GptMeseager;
