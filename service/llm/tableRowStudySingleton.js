const model = require('./openaiSingleton')
const JsonParser = require('./util/jsonParser')
const fs = require('fs')
const path = require('path')
const TableRowStudyResult = require('../../model/tableRowStudyResult')
const LlmAlgorithmBase = require('./algorithmBase')


const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate


class TableRowAnalysis extends LlmAlgorithmBase {
    constructor(llmModel) {
        super()
        this._model = llmModel
        this._promptTemplate = fs.readFileSync(path.join(__dirname, './template/tableRowStudyPrompt.md'), 'utf8')
        this._promptTemplate = this._promptTemplate.replace(/\\r\\n/g, "\\n")
        this._systemMessageTemplate = fs.readFileSync(path.join(__dirname, './template/systemPrompt.md'), 'utf8')
        this.lastPrompt = ""

    }


    /**
     * 
     * @param {string} testStep 
     * @param {string} webPage 
     * @returns {TableRowStudyResult}
     */
    async _identifyElementWithLLM(testStep, webPage) {
        testStep = testStep.replace(/\r\n/g, "\n")
        webPage = webPage.replace(/\r\n/g, "\n")
        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", this._systemMessageTemplate],
            ["human", this._promptTemplate],
        ])
        const parser = new JsonParser();
        const chain = chatPrompt.pipe(this._model).pipe(parser);
        const result = await chain.invoke({
            "testStep": testStep,
            "webPage": webPage,
        });
        this.lastPrompt = await chatPrompt.format({
            "testStep": testStep,
            "webPage": webPage,
        });
        let classificationResult = TableRowStudyResult.parseFromJSON(result)
        return classificationResult
    }

}
const tableColumnAnalysisSingleton = new TableRowAnalysis(model)
module.exports = tableColumnAnalysisSingleton