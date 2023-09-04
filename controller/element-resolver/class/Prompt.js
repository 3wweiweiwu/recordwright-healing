class Prompt {
  /**
   *
   * @param {string} testStep
   * @param {string} pugText
   */
  constructor(testStep, pugText) {
    this.testStep = testStep;
    /**@type {string} */
    this.testStep = testStep;
    this.pugText = pugText;
  }
  toString() {
    //cosntruct test step
    let prompt = ["[Test Step]"];
    prompt.push(this.testStep);

    prompt.push("[Web Page]");
    prompt.push(this.pugText);

    let promptText = prompt.join("\n");
    return promptText;
  }
}
module.exports = Prompt;
