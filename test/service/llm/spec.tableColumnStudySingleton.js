const assert = require('assert');
const tableColumnStudySingleton = require('../../../service/llm/tableColumnStudySingleton');
const TableColumnStudyResult = require('../../../model/tableColumnStudyResult');
const fs = require('fs')
const path = require('path')

describe('Table Column Header Algorithm', () => {
    it('should handle family-2 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/family-2-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/family-2-webpage.md'), 'utf8')


        // Mock the necessary dependencies and setup any required test data

        /**@type {TableColumnStudyResult} */
        const result = await tableColumnStudySingleton.identifyElement(testStep, webPage, "app-sample-table#1");

        assert.deepStrictEqual(result.isUniqueColumnHeaders, true);
        assert.deepStrictEqual(result.columnHeaderList.length, 4);
        assert.deepStrictEqual(result.columnHeaderList.indexOf(result.columnHeaderCell), 3);


    }).timeout(50000);
    it('should handle realistic family-2 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/family-2-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/realistic-family-2-webpage.md'), 'utf8')

        const result = await tableColumnStudySingleton.identifyElement(testStep, webPage, "app-sample-table#1");
        assert.deepStrictEqual(result.isUniqueColumnHeaders, true);
        // Mock the necessary dependencies and setup any required test data
    }).timeout(50000)
    // it('should handle family-1 case', async () => {
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