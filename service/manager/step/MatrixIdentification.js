const tableIdentifierFinder = require('../../llm/tableIdentifierSingleton')
const tableTargetFinder = require('../../llm/tableTargetIdentifierSingleton')
const ElementIdentificationTemplate = require('../../../model/manager/ElementIdentificationTemplate');
const ElementIdentificationStepResult = require('../../../model/elementIdentificationStepResult');
const { HtmlSnapshotCompresed } = require('../../snapshot')
const LlmOperationConstant = require('../../../model/constant/LlmOperationConstant')
class MatrixIdentification extends ElementIdentificationTemplate {
    /**
     * @param {HtmlSnapshotCompresed} htmlSnap PUG HTML Snapshot
     * @param {string} testStep Test Step
     * @param {string} containerId id of the container of the element to be identified. if container id is null, return whole pug page
     **/
    constructor(htmlSnap, testStep, containerId = null) {
        super(htmlSnap, testStep, containerId)
    }
    /**
     * Identify the element
     * @returns {ElementIdentificationStepResult}
     */
    async identifyElement() {
        let webpage = this.webPage
        let testStep = this.testStep

        // get table identifier
        let tableColumnHeaderResult = await tableIdentifierFinder.identifyElement(webpage, 'matrix', 'column');
        let tableRowHeaderResult = await tableIdentifierFinder.identifyElement(webpage, 'matrix', 'row');

        // find the identifier where target element is in
        let rowIdentifier = await tableTargetFinder.identifyElement(testStep, webpage, 'matrix', 'row', tableRowHeaderResult.firstCellList);
        let columnIdentifier = await tableTargetFinder.identifyElement(testStep, webpage, 'matrix', 'column', tableColumnHeaderResult.firstCellList);

        

    }

}
module.exports = MatrixIdentification