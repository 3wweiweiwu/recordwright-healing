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
          json = negotiator._extractJson(fileContent);
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
    it("should handle function call correctly", async () => {
      let negotiator = new GptMessager(
        GptMessager.SYSTEM_ROLE.QA_ENGINEER_FUNCTION
      );

      //import prompt from ../input/prompt/prompt1.txt
      let promptPath = path.join(__dirname, "./input/prompt/prompt1.txt");
      let promptText = fs.readFileSync(promptPath, "utf8");
      let gptFunctions = [
        {
          name: "get_element_information",
          description:
            "get element information based on test step and web page layout",
          parameters: {
            type: "object",
            properties: {
              targetElementId: {
                type: "string",
                description:
                  "returns id of target element in tag#id format(i.e. 'div#100')",
              },
              isTargetMatrixTableGrid: {
                type: "boolean",
                description:
                  "if target element is in a table, or grid or matrix(i.e true, false)",
              },
              OutMostContainer: {
                type: "string",
                description:
                  "returns id of the out-most table or grid container for the target element described in test step in tag#id foramt(i.e. div#100)",
              },
            },
            required: ["targetElementId"],
          },
        },
      ];
      let functionCall = { name: gptFunctions[0].name };

      let response = await negotiator.sendPrompt(
        promptText,
        undefined,
        gptFunctions,
        functionCall
      );
      //it should extract json correctly
      assert.ok(response);
    }).timeout(5000);
  });
  describe("clearHistory", () => {
    it("shall delete chat history", async () => {
      let negotiator = new GptMessager();
      negotiator.chatMessage.push("hello world");
      assert.equal(negotiator.chatMessage.length, 2);
      negotiator.clearHistory();
      assert.equal(negotiator.chatMessage.length, 1);
    });
  });
});
