const model = require('./openaiSingleton')
const JsonParser = require('./util/jsonParser')
const fs = require('fs')
const path = require('path')
const GeneralClassificationResult = require('../../model/generalClassificationResult')
const LlmAlgorithmBase = require('./algorithmBase')


const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate


class GeneralClassification extends LlmAlgorithmBase {
    constructor(llmModel) {
        super()
        this._model = llmModel
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
        let result = super.identifyElement(testStep, webPage)
        return result
    }
    /**
     * 
     * @param {string} testStep 
     * @param {string} webPage 
     * @returns {GeneralClassificationResult}
     */
    async _identifyElementWithLLM(testStep, webPage) {
        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", this._systemMessageTemplate],
            ["human", this._promptTemplate],
        ]);
        const parser = new JsonParser();
        const chain = chatPrompt.pipe(this._model).pipe(parser);
        const input = {
            "testStep": testStep,
            "webPage": webPage
        }
        this.lastPrompt = await chatPrompt.format(input);
        const result = await chain.invoke(input);
        let classificationResult = GeneralClassificationResult.parseFromJSON(result)
        return classificationResult
    }

}
const GeneralClassificationSingleton = new GeneralClassification(model)
module.exports = GeneralClassificationSingleton