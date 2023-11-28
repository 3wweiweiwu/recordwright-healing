const model = require('./openaiSingleton')
const JsonParser = require('./util/jsonParser')
const fs = require('fs')
const path = require('path')
const MatrixRowStudyResult = require('../../model/matrixColumnStudyResult')



const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate


class MatrixColumnAnalysis {
    constructor(llmModel) {
        this._model = llmModel
        this._promptTemplate = fs.readFileSync(path.join(__dirname, './template/matrixColumnStudyPrompt.md'), 'utf8')
        this._systemMessageTemplate = fs.readFileSync(path.join(__dirname, './template/systemPrompt.md'), 'utf8')
    }
    /**
     * 
     * @param {string} testStep 
     * @param {string} webPage 
     * @returns {MatrixRowStudyResult}
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
        let classificationResult = MatrixRowStudyResult.parseFromJSON(result)
        return classificationResult
    }

}
module.exports = new MatrixColumnAnalysis(model)