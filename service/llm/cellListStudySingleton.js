const model = require('./openaiSingleton')
const JsonParser = require('./util/jsonParser')
const fs = require('fs')
const path = require('path')
const CellListStudyResult = require('../../model/cellListStudyResult')
const LlmAlgorithmBase = require('./algorithmBase')


const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate


class CellListStudy extends LlmAlgorithmBase {
    constructor(llmModel) {
        super()
        this._model = llmModel
        this._promptTemplate = fs.readFileSync(path.join(__dirname, './template/cellListStudyPrompt.md'), 'utf8')
        this._systemMessageTemplate = fs.readFileSync(path.join(__dirname, './template/systemPrompt.md'), 'utf8')
        this.lastPrompt = ''
    }
    /**
     * 
     * @param {string} testStep 
     * @param {string} webPage 
     * @param {string|null} rowHeaderListStr the row header list in string format. If null means there is no unique row header
     * @param {string|null} columnHeaderListStr the column header list in string format. If null means there is no unique column header
     * @returns {CellListStudyResult}
     */
    async _identifyElementWithLLM(testStep, webPage, rowHeaderListStr, columnHeaderListStr) {
        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", this._systemMessageTemplate],
            ["human", this._promptTemplate],
        ]);
        const parser = new JsonParser();
        const chain = chatPrompt.pipe(this._model).pipe(parser);
        const rowHeaderState = this._getRowHeaderState(rowHeaderListStr)
        const columnHeaderState = this._getColumnHeaderState(columnHeaderListStr)
        const result = await chain.invoke({
            "testStep": testStep,
            "webPage": webPage,
            rowHeaderState,
            columnHeaderState
        });
        let classificationResult = CellListStudyResult.parseFromJSON(result)
        this.lastPrompt = await (chatPrompt.format({
            "testStep": testStep,
            "webPage": webPage,
            rowHeaderState,
            columnHeaderState
        }))
        return classificationResult
    }
    /**
     * Based on the state of row header, return the instruction for row header prompt
     * @param {string|null} rowHeaderListStr the row header list in string format. If null means there is no unique row header
     * @returns {string} the instruction for row header prompt
     */
    _getRowHeaderState(rowHeaderListStr) {
        if (rowHeaderListStr === null)
            return "Update outermost table and add one more row with unique value for each column to serve as column header. Do that even if original table has column header."
        else
            return `Set row header for outmost table to be [${rowHeaderListStr}]. Force this setting even though it may not seems correct.`

    }
    /**
     * Based on the state of column header, return the instruction for column header prompt
     * @param {string|null} columnHeaderListStr the column header list in string format. If null means there is no unique column header
     * @returns {string} the instruction column row header prompt
     */
    _getColumnHeaderState(columnHeaderListStr) {
        if (columnHeaderListStr === null)
            return "Update outermost table and add one more column with unique value for each row to serve as row header in the right-most the right side of the table. Do that even if original table has row header."
        else
            return `Set column header for outmost table to be [${columnHeaderListStr}]. Force this setting even though it may not seems correct.`

    }

}
module.exports = new CellListStudy(model)