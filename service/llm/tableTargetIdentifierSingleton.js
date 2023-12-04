const model = require('./openaiSingleton')
const JsonParser = require('./util/jsonParser')
const fs = require('fs')
const path = require('path')
const TableTargetIdentifierResult = require('../../model/tableTargetIdentifierResult')
const LlmAlgorithmBase = require('./algorithmBase')


const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate


class TableTargetIdentifierStudy extends LlmAlgorithmBase {
    constructor(llmModel) {
        super()
        this._model = llmModel
        this._promptTemplate = fs.readFileSync(path.join(__dirname, './template/tableTargetIdentifierStudyPrompt.md'), 'utf8')
        this._promptTemplate = this._promptTemplate.replace(/\r\n/g, "\n")
        this._systemMessageTemplate = fs.readFileSync(path.join(__dirname, './template/systemPrompt.md'), 'utf8')
        this.lastPrompt = ""

    }
    /**
     * @param {string} step
     * @param {string} webPage 
     * @param {'table'|'matrix'} tableType
     * @param {'column'|'row'} identifierType
     * @param {string[]} elementCharacterList
     * @returns {TableTargetIdentifierResult}
     */
    async identifyElement(step, webPage, tableType, identifierType, elementCharacterList) {
        let func = this._identifyElementWithLLM(step, webPage, tableType, identifierType, elementCharacterList)
        /**@type {TableIdentifierStudyResult} */
        let result = await this._runPromiseWithRetry(func)
        return result
    }
    /**
     * @param {string} step
     * @param {string} webPage 
     * @param {'table'|'matrix'} tableType
     * @param {'column'|'row'} identifierType
     * @param {string[]} elementCharacterList
     * @returns {TableTargetIdentifierResult}
     */
    async _identifyElementWithLLM(step, webPage, tableType, identifierType, elementCharacterList) {

        //populate input for the prompt
        let input = {
            "step": step,
            "webPage": webPage,
            "tableType": tableType,
            "identifierType": identifierType,
            "elementCharacterList": elementCharacterList
        }

        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", this._systemMessageTemplate],
            ["human", this._promptTemplate],
        ])
        const parser = new JsonParser();
        const chain = chatPrompt.pipe(this._model).pipe(parser);
        const result = await chain.invoke(input);
        this.lastPrompt = await chatPrompt.format(input);
        let classificationResult = new TableTargetIdentifierResult(result.characterItem, result.targetElement)
        return classificationResult
    }

}
const tableColumnAnalysisSingleton = new TableTargetIdentifierStudy(model)
module.exports = tableColumnAnalysisSingleton