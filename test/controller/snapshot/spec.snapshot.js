//const { assert } = require('console')
const assert = require('assert');
const { HtmlSnapshotCompresed } = require('../../../controller/snapshot')
const fs = require('fs')
const path = require('path')

/**
 * I solution that I'm considering to test the functions that has not output or input is overwrite the 
 * matrix and then just run the function that I want to test
 * 
 */

describe('compressed snapshot', () => {

    let snapshotJson = require('./files/snapshot-test-1.json')
    let snapshotJsonNode = require('./files/singlenode.json')
    let compressionComplete = null;
    let baselineComplete = null;
    let compressionNode = null; 
    let baselineNode = null;

    beforeEach('Read and return the Snapshot of the web page in HtmlSnapshotCompresed', async() => {
        compressionComplete = new HtmlSnapshotCompresed(JSON.stringify(snapshotJson))
        baselineComplete = compressionComplete.parse(JSON.stringify(snapshotJson))
        compressionNode = new HtmlSnapshotCompresed(JSON.stringify(snapshotJsonNode))
        baselineNode = compressionNode.parse(JSON.stringify(snapshotJsonNode))
    })
    describe('Test function by function', () =>{
        describe('Test updateTextInCurrnetLevel function', () =>{
            let text2Test = '\n\t\"Test update text\"\n\t'
            let result = '\"Test update text\"'
            it('Single node', async () =>{
                baselineNode[0][0].text = text2Test
                let newRow = compressionNode.updateTextInCurrnetLevel(baselineNode[0])
                assert.doesNotMatch(newRow[0].text, /\n\s+/g, `text musnt match with /\\n\\s+/g`)
                assert.equal(newRow[0].text, result, `Text must keep information for that doesnt match  /\\n\\s+/g`)
            }).timeout(999)
            it('Multiple nodes', async () =>{
                baselineNode[1] = baselineNode[1].map(node => {
                    node.text = text2Test
                    return node
                })
                let newRow = compressionNode.updateTextInCurrnetLevel(baselineNode[1])
                newRow.forEach(node => {
                    assert.doesNotMatch(node.text, /\n\s+/g, `text musnt match with /\\n\\s+/g`)
                    assert.equal(node.text, result, `Text must keep information for that doesnt match  /\\n\\s+/g`)
                })
            }).timeout(99999)
        })
        describe('Test getNodeInformationById function', () =>{
            it('Single node', async () =>{
                const randomRow = Math.floor(Math.random() * compressionComplete.atomicNodeMatrix.length)
                const randomNode = Math.floor(Math.random() * compressionComplete.atomicNodeMatrix[randomRow].length)
                let expectedResult = compressionComplete.atomicNodeMatrix[randomRow][randomNode]
                let result = compressionComplete.getNodeInformationById(expectedResult.id)
                assert.equal(result.node, expectedResult, 'The node information must be the same')
            }).timeout(99999)
        })
        describe('Test deleteScripts function', () => {
            it('Single node, no children', async () => {
                baselineNode[0][0].nodeName = 'SCRIPT'
                baselineNode[0][0].children = []
                let rowlenght = baselineNode[0].length
                let rowChildrenLength = baselineNode[1].length
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.deleteScripts(baselineNode[0])
                assert.equal(compressionNode.atomicNodeMatrix[0], rowlenght-1, 'Node with node name should be deleted')
                assert.equal(compressionNode.atomicNodeMatrix[1].length, rowChildrenLength, 'Children row should not change')
            }).timeout(99999)   
            it('Single node, with children', async () => {
                baselineNode[0][0].nodeName = 'SCRIPT'
                baselineNode[0][0].children = [1]
                let rowlenght = baselineNode[0].length
                let rowChildrenLength = baselineNode[1].length
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.deleteScripts(baselineNode[0])
                assert.equal(compressionNode.atomicNodeMatrix[0], rowlenght-1, 'Node with node name should be deleted')
                assert.equal(compressionNode.atomicNodeMatrix[1].length, rowChildrenLength-1, 'One children must be deleted')
            }).timeout(99999) 
        })
    })
    it('should compress snapshot with happy path', async () => {
        
    }).timeout(1000000)
})