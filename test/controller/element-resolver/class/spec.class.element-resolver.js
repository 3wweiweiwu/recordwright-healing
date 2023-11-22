const assert = require("assert");
const Prompt = require("../../../../controller/element-resolver/class/Prompt");
const ElementContainer = require("../../../../controller/element-resolver/class/ElementContainer");
const CellLocation = require("../../../../controller/element-resolver/class/CellLocation");

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

  describe("CellLocation class", () => {
    it("should locate element in the table cell", async () => {
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row#2",
        "col#3",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2", "row#3"],
        "div#6",
        false,
        false,
        [
          ["div#1", "div#2", "div#3"],
          ["div#4", "div#5", "div#6"],
          ["div#7", "div#8", "div#9"],
        ]
      );
      assert.equal(cellLocation.UpdatedStep, "UpdatedStep");
      assert.equal(cellLocation.rowHeaderCell, "row#2");
      assert.equal(cellLocation.columnHeaderCell, "col#3");
      assert.deepEqual(cellLocation.columnHeaderList, [
        "col#1",
        "col#2",
        "col#3",
      ]);
      assert.deepEqual(cellLocation.rowHeaderList, ["row#1", "row#2", "row#3"]);
      assert.equal(cellLocation.targetElementId, "div#6");
      assert.equal(cellLocation.isTargetColumnHeader, false);
      assert.equal(cellLocation.isTargetRowHeader, false);
      assert.deepEqual(cellLocation.tableCell, [
        ["div#1", "div#2", "div#3"],
        ["div#4", "div#5", "div#6"],
        ["div#7", "div#8", "div#9"],
      ]);
      assert.equal(cellLocation.isComplete, true);
    });
    it("should not complete if cell does not equal to target element", async () => {
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row#2",
        "col#3",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2", "row#3"],
        "div#1",
        false,
        false,
        [
          ["div#1", "div#2", "div#3"],
          ["div#4", "div#5", "div#6"],
          ["div#7", "div#8", "div#9"],
        ]
      );
      assert.equal(cellLocation.isComplete, false);
    });
    it("should return null(error) if cell size is incorrect", async () => {
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row#2",
        "col#3",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2", "row#3"],
        "div#1",
        false,
        false,
        [
          ["div#1", "div#2"],
          ["div#4", "div#5"],
          ["div#7", "div#8"],
        ]
      );
      assert.equal(cellLocation.isComplete, null);
    });
    it("should locate element in the row header", async () => {
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row#3",
        "col#3",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2", "row#3"],
        "row#3",
        false,
        true,
        [
          ["div#1", "div#2", "div#3"],
          ["div#4", "div#5", "div#6"],
          ["div#7", "div#8", "div#9"],
        ]
      );
      assert.equal(cellLocation.isComplete, true);
    });
    it("should not complete if element is not in row header", async () => {
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row#3",
        "col#3",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2", "row#3"],
        "row#1",
        false,
        true,
        [
          ["div#1", "div#2", "div#3"],
          ["div#4", "div#5", "div#6"],
          ["div#7", "div#8", "div#9"],
        ]
      );
      assert.equal(cellLocation.isComplete, false);
    });
    it("should return null(error) if cell cannot be found", async () => {
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row#3",
        "col#3",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2"],
        "row#1",
        false,
        true,
        [
          ["div#1", "div#2", "div#3"],
          ["div#4", "div#5", "div#6"],
          ["div#7", "div#8", "div#9"],
        ]
      );
      assert.equal(cellLocation.isComplete, null);
    });
    it("should not complete if element is in column header", async () => {
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row#2",
        "col#3",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2", "row#3"],
        "col#3",
        true,
        false,
        [
          ["div#1", "div#2", "div#3"],
          ["div#4", "div#5", "div#6"],
          ["div#7", "div#8", "div#9"],
        ]
      );
      assert.equal(cellLocation.isComplete, true);
    });
    it("should not complete if element is in not exactly same as column header", async () => {
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row#2",
        "col#3",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2", "row#3"],
        "col#1",
        true,
        false,
        [
          ["div#1", "div#2", "div#3"],
          ["div#4", "div#5", "div#6"],
          ["div#7", "div#8", "div#9"],
        ]
      );
      assert.equal(cellLocation.isComplete, false);
    });
    it("should return null(error) if column size is incorrect", async () => {
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row#2",
        "col#5",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2", "row#3"],
        "col#1",
        true,
        false,
        [
          ["div#1", "div#2", "div#3"],
          ["div#4", "div#5", "div#6"],
          ["div#7", "div#8", "div#9"],
        ]
      );
      assert.equal(cellLocation.isComplete, null);
    });
    it("should locate element in the col header", async () => {
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row#3",
        "col#3",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2", "row#3"],
        "col#3",
        true,
        false,
        [
          ["div#1", "div#2", "div#3"],
          ["div#4", "div#5", "div#6"],
          ["div#7", "div#8", "div#9"],
        ]
      );
      assert.equal(cellLocation.isComplete, true);
    });
    describe("_getIsElementInTableCell function", () => {
      it("should return true if target element match identified cell based on index", async () => {
        let cellLocation = new CellLocation(
          "UpdatedStep",
          "row#2",
          "col#3",
          ["col#1", "col#2", "col#3"],
          ["row#1", "row#2", "row#3"],
          "div#6",
          false,
          false,
          [
            ["div#1", "div#2", "div#3"],
            ["div#4", "div#5", "div#6"],
            ["div#7", "div#8", "div#9"],
          ]
        );
        let result = cellLocation._getIsElementInTableCell();
        assert.equal(result, true);
      });
      it("should return false if target element does not match identified cell based on index", async () => {
        let cellLocation = new CellLocation(
          "UpdatedStep",
          "row#2",
          "col#1",
          ["col#1", "col#2", "col#3"],
          ["row#1", "row#2", "row#3"],
          "div#6",
          false,
          false,
          [
            ["div#1", "div#2", "div#3"],
            ["div#4", "div#5", "div#6"],
            ["div#7", "div#8", "div#9"],
          ]
        );
        let result = cellLocation._getIsElementInTableCell();
        assert.equal(result, false);
      });
      it("should throw error data does not match", async () => {
        let cellLocation = new CellLocation(
          "UpdatedStep",
          "row2",
          "col#1",
          ["col#1", "col#2", "col#3"],
          ["row#1", "row#2", "row#3"],
          "div#6",
          false,
          false,
          [
            ["div#1", "div#2", "div#3"],
            ["div#4", "div#5", "div#6"],
            ["div#7", "div#8", "div#9"],
          ]
        );
        assert.equal(
          cellLocation._getIsElementInTableCell(),
          null,
          "null represnts for error"
        );
      });
    });
    describe("_getIsElementInRowHeader function", () => {
      it("should return true if target element match identified row header based on index", async () => {
        let cellLocation = new CellLocation(
          "UpdatedStep",
          "row#3",
          "col#3",
          ["col#1", "col#2", "col#3"],
          ["row#1", "row#2", "row#3"],
          "row#3",
          false,
          true,
          [
            ["div#1", "div#2", "div#3"],
            ["div#4", "div#5", "div#6"],
            ["div#7", "div#8", "div#9"],
          ]
        );
        let result = cellLocation._getIsElementInRowHeader();
        assert.equal(result, true);
      });
      it("should return false if target element does not match identified row header based on index", async () => {
        let cellLocation = new CellLocation(
          "UpdatedStep",
          "row#2",
          "col#3",
          ["col#1", "col#2", "col#3"],
          ["row#1", "row#2", "row#3"],
          "row#3",
          false,
          true,
          [
            ["div#1", "div#2", "div#3"],
            ["div#4", "div#5", "div#6"],
            ["div#7", "div#8", "div#9"],
          ]
        );
        let result = cellLocation._getIsElementInTableCell();
        assert.equal(result, false);
      });
      it("should throw error data does not match", async () => {
        let cellLocation = new CellLocation(
          "UpdatedStep",
          "row2",
          "col#1",
          ["col#1", "col#2", "col#3"],
          ["row#1", "row#2", "row#3"],
          "div#6",
          false,
          true,
          [
            ["div#1", "div#2", "div#3"],
            ["div#4", "div#5", "div#6"],
            ["div#7", "div#8", "div#9"],
          ]
        );
        assert.equal(
          cellLocation._getIsElementInRowHeader(),
          null,
          "null represnts for error"
        );
      });
    });
    describe("_getIsElementInColHeader function", () => {
      it("should return true if target element match identified row header based on index", async () => {
        let cellLocation = new CellLocation(
          "UpdatedStep",
          "row#3",
          "col#3",
          ["col#1", "col#2", "col#3"],
          ["row#1", "row#2", "row#3"],
          "col#3",
          true,
          false,
          [
            ["div#1", "div#2", "div#3"],
            ["div#4", "div#5", "div#6"],
            ["div#7", "div#8", "div#9"],
          ]
        );
        let result = cellLocation._getIsElementInColHeader();
        assert.equal(result, true);
      });
      it("should return false if target element does not match identified row header based on index", async () => {
        let cellLocation = new CellLocation(
          "UpdatedStep",
          "row#2",
          "col#3",
          ["col#1", "col#2", "col#3"],
          ["row#1", "row#2", "row#3"],
          "row#3",
          true,
          false,
          [
            ["div#1", "div#2", "div#3"],
            ["div#4", "div#5", "div#6"],
            ["div#7", "div#8", "div#9"],
          ]
        );
        let result = cellLocation._getIsElementInTableCell();
        assert.equal(result, false);
      });
      it("should throw error data does not match", async () => {
        //cell data
        let cellLocation = new CellLocation(
          "UpdatedStep",
          "row2",
          "col1",
          ["col#1", "col#2", "col#3"],
          ["row#1", "row#2", "row#3"],
          "div#6",
          true,
          false,
          [
            ["div#1", "div#2", "div#3"],
            ["div#4", "div#5", "div#6"],
            ["div#7", "div#8", "div#9"],
          ]
        );
        //ensure error is thrown
        assert.equal(
          cellLocation._getIsElementInColHeader(),
          null,
          "null represnts for error"
        );
      });
    

    });
    it("should throw error if data does not match",async()=>{
      let cellLocation = new CellLocation(
        "UpdatedStep",
        "row2",
        "col1",
        ["col#1", "col#2", "col#3"],
        ["row#1", "row#2", "row#3"],
        "div#6",
        true,
        false,
        [
          ["div#1", "div#2", "div#3"],
          ["div#4", "div#5", "div#6"],
          ["div#7", "div#8", "div#9"],
        ]
      );
      assert.equal(cellLocation.isComplete,null,"null represents for error")
    })
  });
});
