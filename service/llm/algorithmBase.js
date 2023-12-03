class LlmAlgorithmBase {
    constructor() {
        this.lastPrompt = ""
    }
    async _identifyElementWithLLM() {
        throw new Error('Not implemented')
    }
    /**
    * 
    * @param {string} testStep 
    * @param {string} webPage 
    * @returns {Object}
    */
    async identifyElement(testStep, webPage) {
        for (let i = 0; i < 10; i++) {
            try {
                return (await this._identifyElementWithLLM(testStep, webPage))
            } catch (error) {
                console.log(error)
                console.log("retrying")
            }


        }
    }
    /**
     * 
     * @param {object} func 
     * @returns 
     */
    async _runPromiseWithRetry(func) {
        for (let i = 0; i < 10; i++) {
            try {
                return (await func)
            } catch (error) {
                console.log(error)
                console.log("retrying")
            }


        }
    }
}
module.exports = LlmAlgorithmBase