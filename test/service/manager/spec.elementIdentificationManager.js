const assert = require('assert');
const ElementIdentificationManager = require('../../../service/manager/elementIdentificationManager');
const TableRowStudyResult = require('../../../model/tableRowStudyResult');
const fs = require('fs')
const path = require('path')

describe('Element Identification E2E Manager', () => {
    describe('constructor', () => {
        it('should create an instance of ElementIdentificationManager', async () => {
            const testStep = fs.readFileSync(path.join(__dirname, '../llm/files/family-1-step.md'), 'utf8')
            const webPage = fs.readFileSync(path.join(__dirname, '../manager/files/family.json'), 'utf8')
            const manager = new ElementIdentificationManager(testStep, webPage)
            assert.deepStrictEqual(manager.originalStep, testStep);
            assert.deepStrictEqual(manager.currentdStep, testStep);
            assert.ok(manager.currentWebpage.includes("BODY#4"));
        })
    })
    describe('Identify Element', () => {
        it('should handle family-1 case', async () => {
            const testStep = fs.readFileSync(path.join(__dirname, '../llm/files/family-1-step.md'), 'utf8')
            const webPage = fs.readFileSync(path.join(__dirname, '../manager/files/family.json'), 'utf8')


            const manager = new ElementIdentificationManager(testStep, webPage)
            const result = await manager.identifyElement();

            assert.deepStrictEqual(result.isTargetRowHeader, false);
            assert.deepStrictEqual(result.isUniqueRowHeaders, false);
            //verify index because the intent of this step is to get the index of the target element
            assert.deepStrictEqual(result.rowHeaderList.indexOf(result.rowHeaderCell), 2);



        }).timeout(500000000);
    })


});