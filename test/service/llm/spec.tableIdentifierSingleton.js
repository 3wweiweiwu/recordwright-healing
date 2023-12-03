const assert = require('assert');
const tableIdentifierSingleton = require('../../../service/llm/tableIdentifierSingleton');
const TableIdentifierResult = require('../../../model/tableIdentifierStudyResult');
const fs = require('fs')
const path = require('path')

describe('Table Identifier Study', () => {
    it('should generate right row header list for family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/family-2-webpage.md'), 'utf8')


        /**@type {TableIdentifierResult} */
        const result = await tableIdentifierSingleton.identifyElement(webPage, 'table', 'row');
        assert.deepEqual(result.firstCellList.length, 8)

    }).timeout(50000);
    it('should generate right column header list for family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/family-2-webpage.md'), 'utf8')


        /**@type {TableIdentifierResult} */
        const result = await tableIdentifierSingleton.identifyElement(webPage, 'table', 'column');
        assert.deepEqual(result.firstCellList.length, 4)

    }).timeout(50000);
    it('should generate right row header list for family-2 case in realistic family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/realistic-family-2-webpage.md'), 'utf8')

        const result = await tableIdentifierSingleton.identifyElement(webPage, 'table', 'row');
        assert.deepEqual(result.firstCellList.length, 8)
    }).timeout(50000)
    it('should generate right column header list for family-2 case in realistic family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/realistic-family-2-webpage.md'), 'utf8')

        const result = await tableIdentifierSingleton.identifyElement(webPage, 'table', 'column');
        assert.deepEqual(result.firstCellList.length, 4)
    }).timeout(50000)
    it('should generate right row header list for severity-2 case in realistic family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-2-webpage.md'), 'utf8')

        const result = await tableIdentifierSingleton.identifyElement(webPage, 'matrix', 'row');

        assert.deepEqual(result.firstCellList.length, 6)
    }).timeout(50000)
    it('should generate right column header list for severity-2 case in realistic family-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-2-webpage.md'), 'utf8')

        const result = await tableIdentifierSingleton.identifyElement(webPage, 'matrix', 'row');

        assert.deepEqual(result.firstCellList.length, 6)
    }).timeout(50000)
});