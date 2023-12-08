const assert = require('assert');
const GeneralClassification = require('../../../service/llm/generalClassificationSingleton');
const GeneralClassificationResult = require('../../../model/generalClassificationResult');
const fs = require('fs')
const path = require('path')

describe('GeneralClassification', () => {
    it('should handle cell in column header cell from regional-sale case', async () => {
        const webPage = fs.readFileSync(path.join(__dirname, './files/regional-sale-web.md'), 'utf8')
        const result = await GeneralClassification.identifyElement('Clik Product A from North America Header', webPage);
        assert.ok(result.outMostContainer.includes("19"))
        assert.ok(result.outermostContainerType.includes("table"))
        assert.ok(result.targetElementId.includes("92"))
    }).timeout(60000)
    it('should handle cell in row header from regional-sale case', async () => {
        const webPage = fs.readFileSync(path.join(__dirname, './files/regional-sale-web.md'), 'utf8')
        const result = await GeneralClassification.identifyElement('Clik January', webPage);
        assert.ok(result.outMostContainer.includes("19"))
        assert.ok(result.outermostContainerType.includes("table"))
        assert.ok(result.targetElementId.includes("98"))
    }).timeout(60000)
    it('should handle cell table body from regional-sale case', async () => {
        const webPage = fs.readFileSync(path.join(__dirname, './files/regional-sale-web.md'), 'utf8')
        const result = await GeneralClassification.identifyElement('Click Product A Sale Data in Janauary from Europe', webPage);
        assert.ok(result.outMostContainer.includes("19"))
        assert.ok(result.outermostContainerType.includes("table"))
        assert.ok(result.targetElementId.includes("101"))
    }).timeout(60000)
    it('should handle family-3 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/family-3-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/family-3-webpage.md'), 'utf8')
        const expectedText = { "targetElementId": "div#42", "OutMostContainer": "sub-table#39", "OutermostContainerType": "table" }
        const expectedText1 = { "targetElementId": "div#42", "OutMostContainer": "div#39", "OutermostContainerType": "table" }
        const expectedOutput = GeneralClassificationResult.parseFromJSON((expectedText));
        const expectedOutput1 = GeneralClassificationResult.parseFromJSON((expectedText1));

        // Mock the necessary dependencies and setup any required test data


        const result = await GeneralClassification.identifyElement(testStep, webPage);
        assert.ok(result.outMostContainer.includes("39"))
        assert.ok(result.outermostContainerType.includes("table"))
        assert.ok(result.targetElementId.includes("42"))

    }).timeout(50000);
    it('should handle family-3 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/family-3-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/family-3-webpage.md'), 'utf8')
        const expectedText = { "targetElementId": "div#42", "OutMostContainer": "sub-table#39", "OutermostContainerType": "table" }
        const expectedText1 = { "targetElementId": "div#42", "OutMostContainer": "div#39", "OutermostContainerType": "table" }
        const expectedOutput = GeneralClassificationResult.parseFromJSON((expectedText));
        const expectedOutput1 = GeneralClassificationResult.parseFromJSON((expectedText1));

        // Mock the necessary dependencies and setup any required test data


        const result = await GeneralClassification.identifyElement(testStep, webPage);
        assert.ok(result.outMostContainer.includes("39"))
        assert.ok(result.outermostContainerType.includes("table"))
        assert.ok(result.targetElementId.includes("42"))

    }).timeout(50000);
    it('should handle family-1 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/family-1-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/family-1-webpage.md'), 'utf8')
        const expectedText = { "targetElementId": "col#45", "OutMostContainer": "table#2", "OutermostContainerType": "table" }
        const expectedText1 = { "targetElementId": "col#45", "OutMostContainer": "table#2", "OutermostContainerType": "table" }
        const expectedOutput = GeneralClassificationResult.parseFromJSON((expectedText));
        const expectedOutput1 = GeneralClassificationResult.parseFromJSON((expectedText1));

        // Mock the necessary dependencies and setup any required test data


        const result = await GeneralClassification.identifyElement(testStep, webPage);
        result.targetElementId = result.targetElementId.replace("\.", "")
        result.outMostContainer = result.outMostContainer.replace("\.", "")
        try {
            assert.deepStrictEqual(result, expectedOutput);
        } catch (error) {
            assert.deepStrictEqual(result, expectedOutput1);
        }

    }).timeout(50000);
    it('should handle severity-1 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/severity-1-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-1-webpage.md'), 'utf8')
        const expectedText = { "targetElementId": "div#116", "OutMostContainer": "div#500", "OutermostContainerType": "matrix" }
        const expectedOutput = GeneralClassificationResult.parseFromJSON((expectedText));

        // Mock the necessary dependencies and setup any required test data


        let result = await GeneralClassification.identifyElement(testStep, webPage);
        result.targetElementId = result.targetElementId.replace("\.", "")
        result.outMostContainer = result.outMostContainer.replace("\.", "")

        assert.deepStrictEqual(result, expectedOutput);


    }).timeout(50000);
    it('should handle severity-3 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/severity-3-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-3-webpage.md'), 'utf8')
        const expectedText = { "targetElementId": "div#125", "OutMostContainer": null, "OutermostContainerType": null }
        const expectedText1 = { "targetElementId": "col#45", "OutMostContainer": "table#2", "OutermostContainerType": "table" }
        const expectedOutput = GeneralClassificationResult.parseFromJSON((expectedText));
        const expectedOutput1 = GeneralClassificationResult.parseFromJSON((expectedText1));

        // Mock the necessary dependencies and setup any required test data


        let result = await GeneralClassification.identifyElement(testStep, webPage);
        result.targetElementId = result.targetElementId.replace("\.", "")
        try {
            assert.deepStrictEqual(result, expectedOutput);
        } catch (error) {
            assert.deepStrictEqual(result, expectedOutput1);
        }

    }).timeout(50000);
});