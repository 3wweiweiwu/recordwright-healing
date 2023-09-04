const { log } = require("console");
const ElementResolver = require("../../../controller/element-resolver");
const assert = require("assert");
const path = require("path");
const fs = require("fs");

function extractContent(text) {
  const testStepMatch = text.match(/\[Test Step\]\s*([\s\S]*?)\s*\[Web Page\]/);
  const webPageMatch = text.match(/\[Web Page\]\s*([\s\S]*)/);

  return {
    testStep: testStepMatch && testStepMatch[1].trim(),
    webPage: webPageMatch && webPageMatch[1].trim(),
  };
}

describe("ElementResolver class", () => {
  describe("_sendGptPrompt function", () => {
    it("should send prompt to GPT and add log entry correctlycorrectly", async () => {
      let elementResolver = new ElementResolver();
      let response = await elementResolver._sendGptPrompt(
        "[webpage]html [Test Step]: click html page [Ouput]: Output result in JSON only with 1 line to explain the reason: {targetElement:string}"
      );
      //it should extract json correctly
      assert.ok(response.targetElement);
    }).timeout(5000);
    it("should add log entry correctly", async () => {
      let elementResolver = new ElementResolver();
      await elementResolver._sendGptPrompt(
        "[webpage]html [Test Step]: click html page [Ouput]: Output result in JSON only with 1 line to explain the reason: {targetElement:string}",
        undefined,
        undefined,
        undefined,
        "step1",
        "pug1"
      );
      await elementResolver._sendGptPrompt(
        "[webpage]html [Test Step]: click html page [Ouput]: Output result in JSON only with 1 line to explain the reason: {targetElement:string}",
        undefined,
        undefined,
        undefined,
        "step2",
        "pug2"
      );
      //it should extract json correctly
      //it should add user message to chat message
      let logs = elementResolver.log.getLog();
      assert.equal(logs.length, 2, "log length should be 1");
      assert.equal(logs[0].pugText, "pug1", "pugText should be pug1");
      assert.equal(logs[0].step, "step1", "step should be step1");
      assert.equal(logs[1].pugText, "pug2", "pugText should be pug2");
      assert.equal(logs[1].step, "step2", "step should be step2");
      assert.ok(logs[0].responseObj.targetElement);
      assert.ok(logs[0].responseText);
    }).timeout(5000);
  });
  describe("_getElementContainer function", () => {
    it("should get element container correctly in complex grid with both column and row header - Step 1 Identify table range", async () => {
      let elementResolver = new ElementResolver();
      let filePath = path.join(
        __dirname,
        "./input/complex-grid-row-header-column-header-step1.txt"
      );
      let fileContent = fs.readFileSync(filePath, "utf8");
      let { testStep, webPage } = extractContent(fileContent);

      let elementContainer = await elementResolver._getElementContainer(
        testStep,
        webPage
      );
      assert.ok(elementContainer.targetElementId);
      assert.equal(
        elementContainer.isTargetMatrixTableGrid,
        true,
        "isTargetMatrixTableGrid should be true because it is in the matrix"
      );
      assert.equal(
        elementContainer.isComplete,
        false,
        "isComplete should be false because it is in the matrix"
      );
      assert.equal(elementContainer.OutMostContainer, "div#500");
    }).timeout(5000);
    it("should get element container correctly in complex grid with both column and row header - Step 2 Identify final target element", async () => {
      let elementResolver = new ElementResolver();
      let filePath = path.join(
        __dirname,
        "./input/complex-grid-row-header-column-header-step2.txt"
      );
      let fileContent = fs.readFileSync(filePath, "utf8");
      let { testStep, webPage } = extractContent(fileContent);

      let elementContainer = await elementResolver._getElementContainer(
        testStep,
        webPage
      );
      assert.equal(elementContainer.targetElementId, "div#125");
      assert.ok(
        elementContainer.isTargetMatrixTableGrid != true,
        "isTargetMatrixTableGrid should be true because it is not in the matrix"
      );
      assert.equal(
        elementContainer.isComplete,
        true,
        "isComplete should it's simple table form"
      );
    }).timeout(5000);
  });
});
