const model = require('./openaiSingleton')
const JsonParser = require('./util/jsonParser')
const fs = require('fs')
const path = require('path')
const TableColumnStudyResult = require('../../model/tableColumnStudyResult')



const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate


class TableColumnAnalysis {
    constructor(llmModel) {
        this._model = llmModel
        this._promptTemplate = fs.readFileSync(path.join(__dirname, './template/tableColumnStudyPrompt.md'), 'utf8')
        this._systemMessageTemplate = fs.readFileSync(path.join(__dirname, './template/systemPrompt.md'), 'utf8')
        this.lastPrompt = ""
    }
    /**
     * 
     * @param {string} testStep 
     * @param {string} webPage 
     * @returns {TableColumnStudyResult}
     */
    async identifyElement(testStep, webPage) {
        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", this._systemMessageTemplate],
            ["human", this._promptTemplate],
        ]);
        const parser = new JsonParser();
        const chain = chatPrompt.pipe(this._model).pipe(parser);
        const result = await chain.invoke({
            "testStep": testStep,
            "webPage": webPage,
        });
        let classificationResult = TableColumnStudyResult.parseFromJSON(result)
        this.lastPrompt = await chatPrompt.format({
            "testStep": testStep,
            "webPage": webPage,
        });
        return classificationResult
    }

}
const tableColumnAnalysisSingleton = new TableColumnAnalysis(model)
module.exports = tableColumnAnalysisSingleton