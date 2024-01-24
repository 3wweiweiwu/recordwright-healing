const fs = require('fs')
const path = require('path')
const assert = require('assert')
const { HtmlSnapshotCompresed } = require('../../../service/snapshot')
const GeneralClassification = require('../../../service/manager/step/GeneralIdentification')
const LlmOperationConstant = require('../../../model/constant/LlmOperationConstant')
describe('General Identification', () => {
    describe('constructor', () => {
        it('should create an instance of GeneralIdentification', async () => {
            const htmlSnapshotStr = fs.readFileSync(path.join(__dirname, './files/family.json'), 'utf8')
            const testStep = fs.readFileSync(path.join(__dirname, '../../service/llm/files/family-1-step.md'), 'utf8')
            const htmlSnapshot = new HtmlSnapshotCompresed(htmlSnapshotStr)
            const manager = new GeneralClassification(htmlSnapshot, testStep)
            assert.deepStrictEqual(manager.htmlSnapshot, htmlSnapshot);
            assert.deepStrictEqual(manager.testStep, testStep);
        })
    })
    describe('Identify Element', () => {
        it('should handle non-matrix case correct', async () => {
            const htmlSnapshotStr = fs.readFileSync(path.join(__dirname, './files/family.json'), 'utf8')
            const testStep = fs.readFileSync(path.join(__dirname, '../../service/llm/files/family-1-step.md'), 'utf8')
            const htmlSnapshot = new HtmlSnapshotCompresed(htmlSnapshotStr)
            const manager = new GeneralClassification(htmlSnapshot, testStep)
            const result = await manager.identifyElement()
            assert.deepStrictEqual(result.currentOperation, LlmOperationConstant.GENERAL_CLASSIFICATION)
            assert.ok(result.targetElementId.includes('144'))
            assert.deepStrictEqual(result.nextOperation, null)

        }).timeout(60000)
        it('should handle matrix case correct', async () => {
            const htmlSnapshotStr = fs.readFileSync(path.join(__dirname, './files/severity.json'), 'utf8')
            const testStep = fs.readFileSync(path.join(__dirname, '../../service/llm/files/severity-1-step.md'), 'utf8')
            const htmlSnapshot = new HtmlSnapshotCompresed(htmlSnapshotStr)
            const manager = new GeneralClassification(htmlSnapshot, testStep)
            const result = await manager.identifyElement()
            assert.deepStrictEqual(result.currentOperation, LlmOperationConstant.GENERAL_CLASSIFICATION)
            assert.deepStrictEqual(result.nextOperation, LlmOperationConstant.MATRIX_IDENTIFICATION)

        }).timeout(60000)
    })
})