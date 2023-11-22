class Prompt {
  /**
   *
   * @param {string} testStep
   * @param {string} pugText
   */
  constructor(testStep, pugText, output = "") {
    /**@type {string} */
    this.testStep = testStep;
    this.pugText = pugText;
    this.output = output;
  }
  toString() {
    //cosntruct test step
    let prompt = ["[Test Step]"];
    prompt.push(this.testStep);

    if (this.output != "") {
      prompt.push("[Output]");
      prompt.push(this.output);
    }

    prompt.push("[Web Page]");
    prompt.push(this.pugText);

    let promptText = prompt.join("\n");
    return promptText;
  }
}
module.exports = Prompt;
