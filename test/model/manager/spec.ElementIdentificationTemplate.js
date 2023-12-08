const assert = require('assert');
const ElementIdentificationTemplate = require('../../../model/manager/ElementIdentificationTemplate.js');
const { HtmlSnapshotCompresed } = require('../../../service/snapshot/index.js')
const fs = require('fs')
const path = require('path')
describe('Element Identification Template', () => {
    describe('constructor', () => {
        it('should create an instance of ElementIdentificationTemplate', async () => {
            const htmlSnapshotStr = fs.readFileSync(path.join(__dirname, '../../service/manager/files/family.json'), 'utf8')
            const testStep = fs.readFileSync(path.join(__dirname, '../../service/llm/files/family-1-step.md'), 'utf8')
            const htmlSnapshot = new HtmlSnapshotCompresed(htmlSnapshotStr)
            const manager = new ElementIdentificationTemplate(htmlSnapshot, testStep)
            assert.deepStrictEqual(manager.htmlSnapshot, htmlSnapshot);
        })
    })
    describe('get pug element by id', () => {
        it('should return no pug text in case there is children', async () => {
            const testStep = fs.readFileSync(path.join(__dirname, '../../service/llm/files/family-1-step.md'), 'utf8')
            const webPage = fs.readFileSync(path.join(__dirname, '../../service/manager/files/family.json'), 'utf8')
            const htmlSnapshot = new HtmlSnapshotCompresed(webPage)
            const manager = new ElementIdentificationTemplate(htmlSnapshot, testStep)
            const result = manager._getPugTextById(manager.htmlSnapshot, "DIV#16")
            assert.ok(result.includes("DIV#17"))
        })
        it('should return pug text in case there is no children', async () => {
            const testStep = fs.readFileSync(path.join(__dirname, '../../service/llm/files/family-1-step.md'), 'utf8')
            const webPage = fs.readFileSync(path.join(__dirname, '../../service/manager/files/family.json'), 'utf8')
            const htmlSnapshot = new HtmlSnapshotCompresed(webPage)
            const manager = new ElementIdentificationTemplate(htmlSnapshot, testStep)
            const result = manager._getPugTextById(manager.htmlSnapshot, "DIV#157")
            assert.ok(result == '')
        })
        it('should return complete pug text in case there is container is null', async () => {
            const testStep = fs.readFileSync(path.join(__dirname, '../../service/llm/files/family-1-step.md'), 'utf8')
            const webPage = fs.readFileSync(path.join(__dirname, '../../service/manager/files/family.json'), 'utf8')
            const htmlSnapshot = new HtmlSnapshotCompresed(webPage)
            const manager = new ElementIdentificationTemplate(htmlSnapshot, testStep)
            const result = manager._getPugTextById(manager.htmlSnapshot, null)
            assert.ok(result.includes("BODY#4"))
        })
    })

})