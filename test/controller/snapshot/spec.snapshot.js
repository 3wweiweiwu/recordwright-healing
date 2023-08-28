//const { assert } = require('console')
const assert = require('assert');
const { HtmlSnapshotCompresed } = require('../../../controller/snapshot')
const fs = require('fs')
const path = require('path')


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
        this.atomicNodeMatrix = this.parse(json)
        this.atomicNodeMatrix = this.parse(json)
        const randomRow = Math.floor(Math.random() * compressionNode.atomicNodeMatrix.lenght)
        describe('Test getNodeInformationById function', () =>{
            it('Single node', async () =>{

            }).timeout(99999)
            it('Multiple node', async () =>{

            }).timeout(99999)
        })
        
    })
    it('should compress snapshot with happy path', async () => {
        
    }).timeout(1000000)
})