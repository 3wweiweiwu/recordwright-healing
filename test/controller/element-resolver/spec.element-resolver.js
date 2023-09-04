const { log } = require("console");
const ElementResolver = require("../../../controller/element-resolver");
const assert = require("assert");
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
});
