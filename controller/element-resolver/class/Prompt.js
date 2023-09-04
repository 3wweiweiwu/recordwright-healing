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

    prompt.push("[Web Page]");
    prompt.push(putText);

    let promptText = prompt.join("\n");
  }
}
module.exports = Prompt;
