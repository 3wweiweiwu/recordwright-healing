//const { assert } = require('console')
const assert = require('assert');
const { HtmlSnapshotCompresed } = require('../../../controller/snapshot')
const fs = require('fs')
const path = require('path')
beforeEach('Read and return the Snapshot of the web page in HtmlSnapshotCompresed', async() => {
    let snapshotJson = await require('./files/snapshot-test-1.json')
    let snapshotJsonNode = await require('./files/singlenode.json')
    let compressionComplete = new HtmlSnapshotCompresed(JSON.stringify(snapshotJson))
    let baselineComplete = compressionComplete.parse(snapshotJson)
    let compressionNode = new HtmlSnapshotCompresed(JSON.stringify(snapshotJsonNode))
    let baselineNode = compressionNode.parse(snapshotJsonNode)
})

describe('compressed snapshot', () => {
    describe('Test function by function', () =>{
        it('Test updateTextInCurrnetLevel function', async () =>{
            baselineNode[0][0].text = '\n\t\s'
            let newNode = compressionNode.updateTextInCurrnetLevel(baselineNode[0])
            assert.doesNotMatch(newNode[0].text, /\n\s+/g, `text match with /\\n\\s+/g`)
        })
    })
    it('should compress snapshot with happy path', async () => {
        
    }).timeout(1000000)
})