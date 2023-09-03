const GptMessager = require("../../../controller/gpt");
const assert = require("assert");
const path = require("path");
const fs = require("fs");
describe("GptMessager class", () => {
  describe("_extractJSON function", () => {
    it("should extract JSON correctly", async () => {
      let negotiator = new GptMessager(GptMessager.SYSTEM_ROLE.QA_ENGINEER);
      //get all files under ./input/ folder, read the content and extract json one-by-one
      let inputFolder = path.join(__dirname, "./input/response-templates");
      let files = fs.readdirSync(inputFolder);
      files.forEach((file) => {
        let jsonPath = path.join(inputFolder, file);
        let fileContent = fs.readFileSync(jsonPath, "utf8");
        let json = "";
        try {
          json = negotiator.extractJson(fileContent);
        } catch (error) {
          assert.fail("unable to extract json file:" + jsonPath);
        }
      });
    });
  });
  describe("_setSystemPromptToChatMessage function", () => {
    it("should throw error if role is invalid", async () => {
      let negotiator = new GptMessager(GptMessager.SYSTEM_ROLE.QA_ENGINEER);
      assert.throws(() => {
        negotiator._setSystemPromptToChatMessage("invalid role", "content");
      });
    });
    it("should set system prompt to chat message correctly", async () => {
      let negotiator = new GptMessager(GptMessager.SYSTEM_ROLE.QA_ENGINEER);
      negotiator._setSystemPromptToChatMessage(
        GptMessager.SYSTEM_ROLE.QA_ENGINEER
      );
      assert.equal(negotiator.chatMessage[0].role, "system");
      assert.ok(negotiator.chatMessage[0].content != "");
    });
  });
  describe("sendPrompt function", () => {
    it("should send prompt to GPT and retrieve response correctly", async () => {
      let negotiator = new GptMessager(GptMessager.SYSTEM_ROLE.QA_ENGINEER);
      let response = await negotiator.sendPrompt(
        "[webpage]html [Test Step]: click html page [Ouput]: Output result in JSON only with 1 line to explain the reason: {targetElement:string}"
      );
      //it should extract json correctly
      assert.ok(response);

      //it should add user message to chat message
      assert.equal(
        negotiator.chatMessage.length,
        3,
        "chat message length should be 3 includes system message, user message and assistant message"
      );
    }).timeout(5000);
  });
});
// it("send message to GPT and retrieve response correctly", async () => {
//   let negotiator = new GptMessager(GptMessager.SYSTEM_PROMPT.QA_ENGINEER);
//   let response = await negotiator.sendPrompt([
//     {
//       role: "system",
//       content:
//         "You are an AI assistant that helps people findyou are a quality engineer try to identify web element in a web page based on test step, and output according to the spec. Following three section provide information for you. Web Page section contains a web page and layout in PUG template. Current div tags are placeholder, you need to evaluate the most suitable tag for each web element based on the textual and layout context. Test Step section provides test procedure. Understand test step context based on the web page. Output section provides rules you should follow to output result. Each section header is wrapped around square brackets []",
//     },
//     {
//       role: "user",
//       content:
//         '[Test Step]  \nIn, click the name of the wife\n\n[Output]  \nOutput result in JSON format. Following is a template.  \n{  \nUpdatedStep:string,  \nrowHeaderCell:string,  \ncolumnHeaderCell:string  \ncolumnHeaderList:string[],  \nrowHeaderList:string[],  \ntargetElementId:string,  \n"isTargetColumnHeader":boolean,     \n"isTargetRowHeader":boolean  \n}  \n "UpdatedStep" represents updated step for target element identification. Given known the table cell container, update the test step to remove relevant information that is used to identify data cell container. Keep relevant information to identify target element. Minimize the change to the test step and try to minimize the information from original step. If you reference table cell container in the updated step, reference that as "specified wrapper table cell" only.  \n"rowHeaderCell" represents the column that uniquely identifies the row in the out-most table containing the target element. The cell container is in "tag#id" format  \n"columnHeaderCell" represents the row that uniquely identifies the column in the out-most table containing the target element. The cell container is in "tag#id" format  \n"columnHeaderList" represents array of column header container for the out-most table. The container is in "tag#id" format  \n"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format  \n"targetElementId" represents id of target element in tag#id format such as "div#100".  \n" isTargetRowHeader" returns if target element is a within a row header container.  \n" isTargetColumnHeader" returns if target element is within a column header container  \n\n[Web Page]\n[Web Page]\n                                .row#40\n                                    .col#41 Brother\n                                    .col#42 Michael\n                                .row#43\n                                    .col#44 Wife\n                                    .col#45 Anna',
//     },
//     {
//       role: "assistant",
//       content:
//         '{  \n"UpdatedStep":"In, click the specified wrapper table cell",\n"rowHeaderCell":"div#43",  \n"columnHeaderCell":"div#44",  \n"columnHeaderList":["div#41", "div#44"],  \n"rowHeaderList":["div#40", "div#43"],  \n"targetElementId":"div#45",  \n"isTargetColumnHeader":false,     \n"isTargetRowHeader":false  \n}',
//     },
//     {
//       role: "user",
//       content:
//         "Check again if this table have row and column header that can uniquely identify the elements row and column header.  If there is column or row header, double check prior output. If there is no row Header, we should add row header by ourself with unique number such as 1,2,3, and update rowHeaderCell with number index so that it match the index of row in the out-most table containing target element. If there is no column header, we should add row header by ourself with unique number such as 1,2,3, and update columnHeaderCell with number index so that it match the index of column in the out-most table containing target element.\nBased on that, output updated JSON",
//     },
//     {
//       role: "assistant",
//       content:
//         '{  \n"UpdatedStep":"In, click the specified wrapper table cell",\n"rowHeaderCell":"2",  \n"columnHeaderCell":"2",  \n"columnHeaderList":["1", "2"],  \n"rowHeaderList":["1", "2"],  \n"targetElementId":"div#45",  \n"isTargetColumnHeader":false,     \n"isTargetRowHeader":false  \n}',
//     },
//   ]);
//   assert.equal(response, "Hello");
// });
