const model = require('./openaiSingleton')
const JsonParser = require('./util/jsonParser')
const fs = require('fs')
const path = require('path')
const TableRowStudyResult = require('../../model/tableRowStudyResult')



const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate


class TableRowAnalysis {
    constructor(llmModel) {
        this._model = llmModel
        this._promptTemplate = fs.readFileSync(path.join(__dirname, './template/tableRowStudyPrompt.md'), 'utf8')
        this._systemMessageTemplate = fs.readFileSync(path.join(__dirname, './template/systemPrompt.md'), 'utf8')
        this.lastPrompt = ""

    }
    /**
     * 
     * @param {string} testStep 
     * @param {string} webPage 
     * @returns {TableRowStudyResult}
     */
    async identifyElement(testStep, webPage) {
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