const { assert } = require('console')
const { HtmlSnapshotCompresed } = require('../../../controller/snapshot')
const fs = require('fs')
const path = require('path')
describe('compressed snapshot', () => {
    it('should compress snapshot with happy path', async () => {
        let snapshotJson = require('./files/snapshot-test-1.json')
        let snapshot = new HtmlSnapshotCompresed(JSON.stringify(snapshotJson))
        assert
    }).timeout(1000000)
})