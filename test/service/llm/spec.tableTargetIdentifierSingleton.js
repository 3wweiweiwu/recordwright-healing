const assert = require('assert');
const tableTargetIdentifierSingleton = require('../../../service/llm/tableTargetIdentifierSingleton');
const TableIdentifierResult = require('../../../model/tableIdentifierStudyResult');
const fs = require('fs')
const path = require('path')

describe('Table Target Identifier Study', () => {
    it('should generate right row header list for family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/family-2-webpage.md'), 'utf8')
        const step = fs.readFileSync(path.join(__dirname, './files/family-2-step.md'), 'utf8')



        const result = await tableTargetIdentifierSingleton.identifyElement(step, webPage, 'table', 'row', ["col#5", "col#11", "col#23", "col#35", "col#47", "col#59", "col#71", "col#83"]);
        assert.ok(result.characterItem.includes('35'))
        assert.ok(result.targetElement.includes('45'))

    }).timeout(50000);
    it('should get right target when it is in header for family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/family-2-webpage.md'), 'utf8')
        const step = fs.readFileSync(path.join(__dirname, './files/family-2-step.md'), 'utf8')



        const result = await tableTargetIdentifierSingleton.identifyElement('Click "name" in the header', webPage, 'table', 'row', ["col#5", "col#11", "col#23", "col#35", "col#47", "col#59", "col#71", "col#83"]);
        assert.ok(result.characterItem.includes('35'))
        assert.ok(result.targetElement.includes('45'))

    }).timeout(50000);
    it('should generate right column header list for family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/family-2-webpage.md'), 'utf8')

        const step = fs.readFileSync(path.join(__dirname, './files/family-2-step.md'), 'utf8')


        /**@type {TableIdentifierResult} */
        const result = await tableTargetIdentifierSingleton.identifyElement(step, webPage, 'table', 'column', ["col#5", "col#6", "col#7", "col#8"]);
        assert.ok(result.characterItem.includes('8'))
        assert.ok(result.targetElement.includes('45'))

    }).timeout(50000);
    it('should generate right row header list for realistic family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/realistic-family-2-webpage.md'), 'utf8')
        const step = fs.readFileSync(path.join(__dirname, './files/family-2-step.md'), 'utf8')


        /**@type {TableIdentifierResult} */
        const result = await tableTargetIdentifierSingleton.identifyElement(step, webPage, 'table', 'row', ["text#59", "text#63", "text#67", "text#71", "text#75", "text#79", "text#83", "text#87"]);
        assert.ok(result.characterItem.includes('67'))
        assert.ok(result.targetElement.includes('144'))
    }).timeout(50000)
    it('should generate right column header list for realistic family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/realistic-family-2-webpage.md'), 'utf8')

        const step = fs.readFileSync(path.join(__dirname, './files/family-2-step.md'), 'utf8')


        /**@type {TableIdentifierResult} */
        const result = await tableTargetIdentifierSingleton.identifyElement(step, webPage, 'table', 'column', ["text#87", "text#88", "text#89", "DIV#90"]);
        assert.ok(result.characterItem.includes('90'))
        assert.ok(result.targetElement.includes('144'))
    }).timeout(50000)
    it('should generate right row header list for severity-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-2-webpage.md'), 'utf8')
        const step = fs.readFileSync(path.join(__dirname, './files/severity-2-step.md'), 'utf8')

        const result = await tableTargetIdentifierSingleton.identifyElement(step, webPage, 'matrix', 'row', ["div.heatmap-body-heading", "div#505", "div#501", "div#502", "div#503", "div#504", "div#600"]);
        assert.ok(result.characterItem.includes('501'))

    }).timeout(50000)
    it('should generate right column header list for severity-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-2-webpage.md'), 'utf8')

        const step = fs.readFileSync(path.join(__dirname, './files/severity-2-step.md'), 'utf8')

        const result = await tableTargetIdentifierSingleton.identifyElement(step, webPage, 'matrix', 'column', ["div#601", "div#602", "div#603", "div#604"]);

        assert.ok(result.characterItem.includes('604'))
    }).timeout(50000)
    it('should generate right row header list for severity-2 case when target is in the header', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-2-webpage.md'), 'utf8')
        const step = fs.readFileSync(path.join(__dirname, './files/severity-2-step.md'), 'utf8')

        const result = await tableTargetIdentifierSingleton.identifyElement('Click the "High" in the Criticality axis', webPage, 'matrix', 'row', ["div.heatmap-body-heading", "div#505", "div#501", "div#502", "div#503", "div#504", "div#600"]);
        assert.ok(result.characterItem.includes('501'))

    }).timeout(50000)
    it('should generate right column header list for severity-2 case when target is in the header', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-2-webpage.md'), 'utf8')
        const step = fs.readFileSync(path.join(__dirname, './files/severity-2-step.md'), 'utf8')

        const result = await tableTargetIdentifierSingleton.identifyElement('Click the "Medium" in the severity axis', webPage, 'matrix', 'column', ["div#601", "div#602", "div#603", "div#604"]);
        assert.ok(result.characterItem.includes('602'))

    }).timeout(50000)
});