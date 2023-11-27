const { BaseOutputParser } = require("langchain/schema/output_parser");
class JsonParser extends BaseOutputParser {
    async parse(text) {
        console.log(text)
        const regex = /{[\s\S]*?}/;; // Regular expression to match a JSON object

        const match = text.match(regex);
        if (!match) {
            console.error("No JSON object found in the text.");
            return null;
        }

        try {
            const parsedObject = JSON.parse(match[0]);
            return parsedObject;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    }
}
module.exports = JsonParser;