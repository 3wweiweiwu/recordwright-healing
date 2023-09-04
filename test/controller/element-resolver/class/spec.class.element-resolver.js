const assert = require("assert");
const Prompt = require("../../../../controller/element-resolver/class/Prompt");
const ElementContainer = require("../../../../controller/element-resolver/class/ElementContainer");

describe("ElementResolver Supporting class", () => {
  describe("Prompt class", () => {
    it("should construct prompt correctly", async () => {
      let prompt = new Prompt("test step", "pug text");
      assert.equal(prompt.testStep, "test step");
      assert.equal(prompt.pugText, "pug text");
    });
    it("should convert prompt to string correctly", async () => {
      let prompt = new Prompt("test step", "pug text");
      let promptText = prompt.toString();
      assert.equal(promptText, "[Test Step]\ntest step\n[Web Page]\npug text");
    });
  });

  describe("ElementContainer class", () => {
    it("should construct element container", async () => {
      let elementContainer = new ElementContainer(
        "targetId",
        false,
        "out most container"
      );
      assert.equal(elementContainer.targetElementId, "targetId");
      assert.equal(elementContainer.isTargetMatrixTableGrid, false);
      assert.equal(elementContainer.OutMostContainer, "out most container");
      assert.equal(elementContainer.isComplete, true);
    });
    it('should handle "isComplete" correctly in case target is in a matrix - isTargetMatrixTableGrid:false', async () => {
      let elementContainer = new ElementContainer(
        "targetId",
        false,
        "out most container"
      );
      assert.equal(elementContainer.targetElementId, "targetId");
      assert.equal(elementContainer.isTargetMatrixTableGrid, false);
      assert.equal(elementContainer.OutMostContainer, "out most container");
      assert.equal(elementContainer.isComplete, true);
    });
    it('should handle "isComplete" correctly in case target is in a matrix - isTargetMatrixTableGrid:null', async () => {
      let elementContainer = new ElementContainer(
        "targetId",
        undefined,
        "out most container"
      );
      assert.equal(elementContainer.targetElementId, "targetId");
      assert.equal(elementContainer.isTargetMatrixTableGrid, undefined);
      assert.equal(elementContainer.OutMostContainer, "out most container");
      assert.equal(elementContainer.isComplete, true);
    });
  });
});
