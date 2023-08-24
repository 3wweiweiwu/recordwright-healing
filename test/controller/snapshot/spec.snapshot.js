const { assert } = require('console')
const { HtmlSnapshotCompresed } = require('../../../controller/snapshot')
const fs = require('fs')
const path = require('path')
beforeEach('Read and return the Snapshot of the web page in HtmlSnapshotCompresed', async() => {
    let snapshotJson = await require('./files/snapshot-test-1.json')
    return new HtmlSnapshotCompresed(JSON.stringify(snapshotJson))
})

describe('compressed snapshot', () => {
    it('should compress snapshot with happy path', async () => {
        
    }).timeout(1000000)
})