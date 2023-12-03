const model = require('./openaiSingleton')
const JsonParser = require('./util/jsonParser')
const fs = require('fs')
const path = require('path')
const TableIdentifierStudyResult = require('../../model/tableIdentifierStudyResult')
const LlmAlgorithmBase = require('./algorithmBase')


const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate


class TableIdentifierStudy extends LlmAlgorithmBase {
    constructor(llmModel) {
        super()
        this._model = llmModel
        this._promptTemplate = fs.readFileSync(path.join(__dirname, './template/tableIdentifierStudyPrompt.md'), 'utf8')
        this._promptTemplate = this._promptTemplate.replace(/\\r\\n/g, "\\n")
        this._systemMessageTemplate = fs.readFileSync(path.join(__dirname, './template/systemPrompt.md'), 'utf8')
        this.lastPrompt = ""

    }
    /**
     * 
     * @param {string} webPage 
     * @param {'table'|'matrix'} tableType
     * @param {'column'|'row'} identifierType
     * @returns {TableIdentifierStudyResult}
     */
    async identifyElement(webPage, tableType, identifierType) {
        let func = this._identifyElementWithLLM(webPage, tableType, identifierType)
        /**@type {TableIdentifierStudyResult} */
        let result = await this._runPromiseWithRetry(func)
        return result
    }
    /**
     * 
     * @param {string} webPage 
     * @param {'table'|'matrix'} tableType
     * @param {'column'|'row'} identifierType
     * @returns {TableIdentifierStudyResult}
     */
    async _identifyElementWithLLM(webPage, tableType, identifierType) {

        //if identifier is column, then it's coresponds to row header, vice versa
        let otherIdentifierType = 'column'
        if (identifierType === 'column') {
            otherIdentifierType = 'row'
        }
        //populate input for the prompt
        let input = {
            "webPage": webPage,
            "tableType": tableType,
            "identifierType": identifierType,
            "otherIdentifierType": otherIdentifierType
        }

        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", this._systemMessageTemplate],
            ["human", this._promptTemplate],
        ])
        const parser = new JsonParser();
        const chain = chatPrompt.pipe(this._model).pipe(parser);
        const result = await chain.invoke(input);
        this.lastPrompt = await chatPrompt.format(input);
        let classificationResult = new TableIdentifierStudyResult(result.firstCellList)
        return classificationResult
    }

}
const tableColumnAnalysisSingleton = new TableIdentifierStudy(model)
module.exports = tableColumnAnalysisSingleton