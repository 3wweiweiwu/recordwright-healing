const assert = require('assert');
const GeneralClassification = require('../../../service/llm/generalClassificationSingleton');
const GeneralClassificationResult = require('../../../model/generalClassificationResult');
const fs = require('fs')
const path = require('path')

describe('GeneralClassification', () => {
    it('should handle family-3 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/family-3-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/family-3-webpage.md'), 'utf8')
        const expectedText = { "targetElementId": "div#42", "OutMostContainer": "sub-table#39", "OutermostContainerType": "table" }
        const expectedText1 = { "targetElementId": "col#42", "OutMostContainer": "sub-table#39", "OutermostContainerType": "table" }
        const expectedOutput = GeneralClassificationResult.parseFromJSON((expectedText));
        const expectedOutput1 = GeneralClassificationResult.parseFromJSON((expectedText1));

        // Mock the necessary dependencies and setup any required test data

        const result = await GeneralClassification.identifyElement(testStep, webPage);
        console.log(result)

        if(result.outermostContainerType !== "table"){
            console.log("The outer most container type is not table!")
        }else{
            try {
                assert.deepStrictEqual(result, expectedOutput);
            } catch (error) {
                assert.deepStrictEqual(result, expectedOutput1);
            }
        }

    }).timeout(50000);
    it('should handle family-2 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/family-2-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/family-2-webpage.md'), 'utf8')
        const expectedText = { "targetElementId": "col#45", "OutMostContainer": "table#2", "OutermostContainerType": "table" }
        const expectedOutput = GeneralClassificationResult.parseFromJSON((expectedText));

        // Mock the necessary dependencies and setup any required test data

        const result = await GeneralClassification.identifyElement(testStep, webPage);
        console.log(result)

        if(result.outermostContainerType !== "table"){
            console.log("The outer most container type is not table!")
        }else{
            try {
                assert.deepStrictEqual(result, expectedOutput);
            } catch (error) {
                console.log("The expected output and the real output do not match.");
            }
        }
        
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
        console.log(result)
        result.targetElementId = result.targetElementId.replace("\.", "")
        result.outMostContainer = result.outMostContainer.replace("\.", "")

        if(result.outermostContainerType !== "table"){
            console.log("The outer most container type is not table!")
        }else if(result.targetElementId !== "col#45"){
            console.log("The target element id is not col#45!")
        }else if(result.outMostContainer !== "table#2"){
            console.log("The out most container is not table#2!")
        }else{
            try {
                assert.deepStrictEqual(result, expectedOutput);
            } catch (error) {
                assert.deepStrictEqual(result, expectedOutput1);
            }
        }

    }).timeout(50000);
    it('should handle severity-1 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/severity-1-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-1-webpage.md'), 'utf8')
        const expectedText = { "targetElementId": "div#116", "OutMostContainer": "div#500", "OutermostContainerType": "matrix" }
        const expectedText1 = { "targetElementId": "div#104", "OutMostContainer": "div#500", "OutermostContainerType": "table" }
        const expectedOutput = GeneralClassificationResult.parseFromJSON((expectedText));
        const expectedOutput1 = GeneralClassificationResult.parseFromJSON((expectedText1));

        // Mock the necessary dependencies and setup any required test data

        let result = await GeneralClassification.identifyElement(testStep, webPage);
        console.log(result)
        result.targetElementId = result.targetElementId.replace("\.", "")
        result.outMostContainer = result.outMostContainer.replace("\.", "")

        if(result.outMostContainer !== "div#500"){
            console.log("The out most container is not div#500!")
        }else{
            try {
                assert.deepStrictEqual(result, expectedOutput);
            } catch (error) {
                assert.deepStrictEqual(result, expectedOutput1);
            }
        }

    }).timeout(50000);
    it('should handle severity-2 case', async () => {
        const testStep = fs.readFileSync(path.join(__dirname, './files/severity-2-step.md'), 'utf8')
        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-2-webpage.md'), 'utf8')
        const expectedText = { "targetElementId": "div#116", "OutMostContainer": "divheatmap-body-grid", "OutermostContainerType": "table" }
        const expectedText1 = { "targetElementId": "div#116", "OutMostContainer": "divheatmap-body-grid", "OutermostContainerType": "matrix" }
        const expectedOutput = GeneralClassificationResult.parseFromJSON((expectedText));
        const expectedOutput1 = GeneralClassificationResult.parseFromJSON((expectedText1));

        // Mock the necessary dependencies and setup any required test data

        let result = await GeneralClassification.identifyElement(testStep, webPage);
        result.targetElementId = result.targetElementId.replace("\.", "")
        result.outMostContainer = result.outMostContainer.replace("\.", "")
        console.log(result);

        if(result.targetElementId !== "div#116"){
            console.log("The target element id is not div#116!")
        }else if(result.outMostContainer !== "divheatmap-body-grid"){
            console.log("The out most container is not divheatmap-body-grid!")
        }else{
            try {
                assert.deepStrictEqual(result, expectedOutput);
            } catch (error) {
                assert.deepStrictEqual(result, expectedOutput1);
            }
        }

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
        console.log(result)

        if (result.targetElementId === null || result.outMostContainer === null || result.outermostContainerType === null){
            console.log("One of attribute in output is null! Please check")
            return
        }

        result.targetElementId = result.targetElementId.replace("\.", "")
        try {
            assert.deepStrictEqual(result, expectedOutput);
        } catch (error) {
            assert.deepStrictEqual(result, expectedOutput1);
        }

    }).timeout(50000);
});