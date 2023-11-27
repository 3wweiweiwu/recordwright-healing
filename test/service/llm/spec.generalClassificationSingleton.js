const assert = require('assert');
const GeneralClassification = require('../../../service/llm/generalClassificationSingleton');
const GeneralClassificationResult = require('../../../model/generalClassificationResult');


describe('GeneralClassification', () => {
    it('should identify the element based on the test step and web page', async () => {
        const testStep = 'In, click the name of the brother';
        const webPage = `
            .sub-table#39
            .row#40
                .col#41 Brother
                .col#42 Michael
            .row#43
                .col#44 Wife
                .col#45 Anna        
        `;
        const expectedText = { "targetElementId": "div#42", "OutMostContainer": "sub-table#39", "OutermostContainerType": "table" }
        const expectedOutput = GeneralClassificationResult.parseFromJSON((expectedText));

        // Mock the necessary dependencies and setup any required test data


        const result = await GeneralClassification.identifyElement(testStep, webPage);

        assert.deepStrictEqual(result, expectedOutput);
    }).timeout(50000);
});