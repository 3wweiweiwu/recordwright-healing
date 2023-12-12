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
        assert.ok(result.firstCellList.length <= 8)

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
    it('should generate right row header list for severity-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-2-webpage.md'), 'utf8')

        const result = await tableIdentifierSingleton.identifyElement(webPage, 'matrix', 'row');
        try {
            assert.deepEqual(result.firstCellList.length, 6)
        } catch (error) {
            assert.deepEqual(result.firstCellList.length, 7)
        }

    }).timeout(50000)
    it('should generate right column header list for severity-2 case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/severity-2-webpage.md'), 'utf8')

        const result = await tableIdentifierSingleton.identifyElement(webPage, 'matrix', 'column');

        assert.ok(result.firstCellList.length <= 5)
    }).timeout(50000)
    it('should generate right row header list for regional-sale case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/regional-sale-web.md'), 'utf8')


        /**@type {TableIdentifierResult} */
        const result = await tableIdentifierSingleton.identifyElement(webPage, 'matrix', 'row');
        assert.ok(result.firstCellList.length == 2)

    }).timeout(50000);
    it('should generate right column header list for regional-sale case', async () => {

        const webPage = fs.readFileSync(path.join(__dirname, './files/regional-sale-web.md'), 'utf8')


        /**@type {TableIdentifierResult} */
        const result = await tableIdentifierSingleton.identifyElement(webPage, 'matrix', 'column');
        assert.deepEqual(result.firstCellList, ['text#87', 'text#88'])

    }).timeout(50000);
});