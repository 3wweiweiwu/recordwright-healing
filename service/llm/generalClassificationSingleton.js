const model = require('./openaiSingleton')
const JsonParser = require('./util/jsonParser')
const fs = require('fs')
const path = require('path')
const GeneralClassificationResult = require('../../model/generalClassificationResult')



const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate


class GeneralClassification {
    constructor(langChainClient, azureOpenAIClient) {
        this.langChainClient = langChainClient;
        this.azureOpenAIClient = azureOpenAIClient;
        this._promptTemplate = fs.readFileSync(path.join(__dirname, './template/generalClassificationPrompt.md'), 'utf8')
        this._systemMessageTemplate = fs.readFileSync(path.join(__dirname, './template/systemPrompt.md'), 'utf8')
    }
    /**
     * 
     * @param {string} testStep 
     * @param {string} webPage 
     * @returns {GeneralClassificationResult}
     */
    async identifyElement(testStep, webPage) {
        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", this._systemMessageTemplate],
            ["human", this._promptTemplate],
        ]);
        const parser = new JsonParser();
        const chain = chatPrompt.pipe(model).pipe(parser);
        const result = await chain.invoke({
            "testStep": testStep,
            "webPage": webPage
        });
        let classificationResult = GeneralClassificationResult.parseFromJSON(result)
        return classificationResult
    }

}
const GeneralClassificationSingleton = new GeneralClassification()
module.exports = GeneralClassificationSingleton