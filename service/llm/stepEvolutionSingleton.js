const model = require('./openaiSingleton')
const JsonParser = require('./util/jsonParser')
const fs = require('fs')
const path = require('path')
const StepEvolutionResult = require('../../model/stepEvolutionResult')
const LlmAlgorithmBase = require('./algorithmBase')


const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate


class StepEvolution extends LlmAlgorithmBase {
    constructor(llmModel) {
        super()
        this._model = llmModel
        this._promptTemplate = fs.readFileSync(path.join(__dirname, './template/stepEvolutionPrompt.md'), 'utf8')
        this._systemMessageTemplate = fs.readFileSync(path.join(__dirname, './template/systemPrompt.md'), 'utf8')
    }
    /**
     * 
     * @param {string} testStep 
     * @param {string} webPage 
     * @param {string} container The container of the target element in div#id format
     * @returns {StepEvolutionResult}
     */
    async identifyElement(testStep, webPage, container) {
        let identifyPromise = this._identifyElementWithLLM(testStep, webPage, container)
        let result = await this._runPromiseWithRetry(identifyPromise)
        return result
    }
    /**
     * 
     * @param {string} testStep 
     * @param {string} webPage 
     * @param {string} container The container of the target element in div#id format
     * @returns {StepEvolutionResult}
     */
    async _identifyElementWithLLM(testStep, webPage, container) {
        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", this._systemMessageTemplate],
            ["human", this._promptTemplate],
        ]);
        const parser = new JsonParser();
        const chain = chatPrompt.pipe(this._model).pipe(parser);
        let input = {
            "testStep": testStep,
            "webPage": webPage,
            "container": container
        }
        const result = await chain.invoke(input);
        this.lastPrompt = await chatPrompt.format(input)
        let classificationResult = StepEvolutionResult.parseFromJSON(result)
        return classificationResult
    }

}
const GeneralClassificationSingleton = new StepEvolution(model)
module.exports = GeneralClassificationSingleton