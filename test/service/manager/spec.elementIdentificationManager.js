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
    describe('get pug element by id', () => {
        it('should return no pug text in case there is no children', async () => {
            const testStep = fs.readFileSync(path.join(__dirname, '../llm/files/family-1-step.md'), 'utf8')
            const webPage = fs.readFileSync(path.join(__dirname, '../manager/files/family.json'), 'utf8')
            const manager = new ElementIdentificationManager(testStep, webPage)
            const result = manager._getPugTextById(manager.htmlSnapshot, "text#144")
            assert.deepStrictEqual(result, '')
        })
        it('should return pug text in case there is children', async () => {
            const testStep = fs.readFileSync(path.join(__dirname, '../llm/files/family-1-step.md'), 'utf8')
            const webPage = fs.readFileSync(path.join(__dirname, '../manager/files/family.json'), 'utf8')
            const manager = new ElementIdentificationManager(testStep, webPage)
            const result = manager._getPugTextById(manager.htmlSnapshot, "DIV#16")
            assert.ok(result.includes("DIV#17"))

        })
    })
    //     const testStep = fs.readFileSync(path.join(__dirname, './files/family-1-step.md'), 'utf8')
    //     const webPage = fs.readFileSync(path.join(__dirname, './files/family-1-webpage.md'), 'utf8')
    //     const expectedText = { "targetElementId": "col#45", "OutMostContainer": "table#2", "OutermostContainerType": "table" }
    //     const expectedText1 = { "targetElementId": "col#45", "OutMostContainer": "table#2", "OutermostContainerType": "table" }
    //     const expectedOutput = StepEvoutionResult.parseFromJSON((expectedText));
    //     const expectedOutput1 = StepEvoutionResult.parseFromJSON((expectedText1));

    //     // Mock the necessary dependencies and setup any required test data


    //     const result = await StepEvolution.identifyElement(testStep, webPage);
    //     result.targetElementId = result.targetElementId.replace("\.", "")
    //     result.outMostContainer = result.outMostContainer.replace("\.", "")
    //     try {
    //         assert.deepStrictEqual(result, expectedOutput);
    //     } catch (error) {
    //         assert.deepStrictEqual(result, expectedOutput1);
    //     }

    // }).timeout(50000);
    // it('should handle severity-1 case', async () => {
    //     const testStep = fs.readFileSync(path.join(__dirname, './files/severity-1-step.md'), 'utf8')
    //     const webPage = fs.readFileSync(path.join(__dirname, './files/severity-1-webpage.md'), 'utf8')
    //     const expectedText = { "targetElementId": "div#116", "OutMostContainer": "div#500", "OutermostContainerType": "matrix" }
    //     const expectedText1 = { "targetElementId": "col#45", "OutMostContainer": "table#2", "OutermostContainerType": "table" }
    //     const expectedOutput = StepEvoutionResult.parseFromJSON((expectedText));
    //     const expectedOutput1 = StepEvoutionResult.parseFromJSON((expectedText1));

    //     // Mock the necessary dependencies and setup any required test data


    //     let result = await StepEvolution.identifyElement(testStep, webPage);
    //     result.targetElementId = result.targetElementId.replace("\.", "")
    //     result.outMostContainer = result.outMostContainer.replace("\.", "")
    //     try {
    //         //set result's target element id equal to exepcted result because this target element id is wrong anyway
    //         result.targetElementId = expectedOutput.targetElementId
    //         assert.deepStrictEqual(result, expectedOutput);
    //     } catch (error) {
    //         assert.deepStrictEqual(result, expectedOutput1);
    //     }

    // }).timeout(50000);
    // it('should handle severity-3 case', async () => {
    //     const testStep = fs.readFileSync(path.join(__dirname, './files/severity-3-step.md'), 'utf8')
    //     const webPage = fs.readFileSync(path.join(__dirname, './files/severity-3-webpage.md'), 'utf8')
    //     const expectedText = { "targetElementId": "div#125", "OutMostContainer": null, "OutermostContainerType": null }
    //     const expectedText1 = { "targetElementId": "col#45", "OutMostContainer": "table#2", "OutermostContainerType": "table" }
    //     const expectedOutput = StepEvoutionResult.parseFromJSON((expectedText));
    //     const expectedOutput1 = StepEvoutionResult.parseFromJSON((expectedText1));

    //     // Mock the necessary dependencies and setup any required test data


    //     let result = await StepEvolution.identifyElement(testStep, webPage);
    //     result.targetElementId = result.targetElementId.replace("\.", "")
    //     try {
    //         assert.deepStrictEqual(result, expectedOutput);
    //     } catch (error) {
    //         assert.deepStrictEqual(result, expectedOutput1);
    //     }

    // }).timeout(50000);
});