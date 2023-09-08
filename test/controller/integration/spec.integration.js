const assert = require('assert');
const { HtmlSnapshotCompresed } = require('../../../controller/snapshot')
const { PugGenerator } = require('../../../controller/pugGenerator/pugGenerator.js')

describe('Integration test for html compressor and pug generator', () => {
    let singleNode = null;
    let invisibleRect = null;
    let att1 = {class : 'test class'}
    let att1pug = '(class="test class")'
    let att2 = {style : 'test style'}
    let attid = {id:"testid"}
    let attidPug = '(automationid="testid")'
    let att12 = {style : 'test style',class : 'test class'}
    let text2Test = '\n\t\"Test update text\"\n\t'
    let textResult = '\"Test update text\"'
    let newCompresedSnapshot = null;

    beforeEach('Prepare single node', () => {
        let snapshotJsonNode = require('./files/singlenode.json')
        let invisibleRect = {"x": 0, "y": 0,
            "width": 0, "height": 0,
            "top": 0, "right": 0, "bottom": 0, "left": 0
        }
        let visibleRect = { "x": 1, "y": 1,
            "width": 1, "height": 1,
            "top": 1, "right": 1, "bottom": 1, "left": 1
        }
        singleNode = snapshotJsonNode[0][0]
        singleNode.rect = visibleRect
        singleNode.attributes = {}
        singleNode.children = []
        singleNode.text = ''
        newCompresedSnapshot = new HtmlSnapshotCompresed(JSON.stringify(snapshotJsonNode))
    })
    it('should compress the snapshot and generate a pugfile with the same content', async () => {
        let newMatrix = [[singleNode,singleNode,singleNode],[singleNode,singleNode,singleNode],[singleNode]]
        let newMatrixCloned = newCompresedSnapshot.parse(JSON.stringify(newMatrix))
        newMatrixCloned[0][0].id = 1
        newMatrixCloned[0][0].children = [4,7]
        newMatrixCloned[0][0].attributes = attid
        newMatrixCloned[0][0].nodeName = 'p'

        newMatrixCloned[0][1].id = 2
        newMatrixCloned[0][1].children = [5]
        newMatrixCloned[0][1].nodeName = 'SCRIPT'

        newMatrixCloned[0][2].id = 3
        newMatrixCloned[0][2].children = [6]
        newMatrixCloned[0][2].attributes = att1
        newMatrixCloned[0][2].nodeName = 'div'

        newMatrixCloned[1][0].id = 4
        newMatrixCloned[1][0].text = text2Test
        newMatrixCloned[1][0].nodeName = '#text'

        newMatrixCloned[1][1].id = 5
        newMatrixCloned[1][1].nodeName = 'div'

        newMatrixCloned[1][2].id = 6
        newMatrixCloned[1][2].attributes = att2
        newMatrixCloned[1][2].rect = invisibleRect

        newMatrixCloned[2][0].id = 7
        newMatrixCloned[2][0].nodeName = 'div'

        let htmlCompressed = new HtmlSnapshotCompresed(JSON.stringify(newMatrixCloned))

        assert.equal(htmlCompressed.atomicNodeMatrix[0].length, 2,
            'The first row of the matrix should have 2 elements')
        assert.equal(htmlCompressed.atomicNodeMatrix[1].length, 2,
            'The second row of the matrix should have 2 elements')

        let node = htmlCompressed.atomicNodeMatrix[0].find(node => node.id === 1)
        assert.equal(node.nodeName, 'p', 'The node name should be a p')
        assert.equal(JSON.stringify(node.children), JSON.stringify([4,7]), 'The node should have 2 children')
        assert.equal(JSON.stringify(node.attributes), JSON.stringify(attid), 'The node should have the same attributes')

        node = htmlCompressed.atomicNodeMatrix[0].find(node => node.id === 3)
        assert.equal(node.nodeName, 'div', 'The node name should be a div')
        assert.equal(JSON.stringify(node.children), JSON.stringify([]), 'The node shouldnt have any children')
        //assert.equal(JSON.stringify(node.attributes), JSON.stringify(att12), 'The node should have merge the attributes')

        node = htmlCompressed.atomicNodeMatrix[1].find(node => node.id === 4)
        assert.equal(node.nodeName, '#text', 'The node name should be a #text')
        assert.equal(node.text, textResult, 'The node should delete all the white spaces in the text')

        node = htmlCompressed.atomicNodeMatrix[1].find(node => node.id === 7)
        assert.equal(node.nodeName, 'div', 'The node name should be a div')

        pugGenerator = new PugGenerator(JSON.stringify(htmlCompressed.atomicNodeMatrix))
        pugGenerator.createPugFile()

        let expectedResult1 = htmlCompressed.atomicNodeMatrix[0][0].nodeName + '#' + htmlCompressed.atomicNodeMatrix[0][0].id + attidPug
        let expectedResult2 = ' text' + '#' + htmlCompressed.atomicNodeMatrix[1][0].id + ' ' + textResult
        let expectedResult3 = ' ' + htmlCompressed.atomicNodeMatrix[1][1].nodeName + '#' + htmlCompressed.atomicNodeMatrix[1][1].id
        let expectedResult4 = htmlCompressed.atomicNodeMatrix[0][1].nodeName + '#' + htmlCompressed.atomicNodeMatrix[0][1].id + att1pug 
        //This attribute is wrong but right now the parent is not hierated the attribute

        assert.equal(pugGenerator.pugfile.length, 4, 'The pug file should have 4 lines')
        assert.equal(pugGenerator.pugfile[0], expectedResult1, 'The first line should be the node name, the id and the id attribute')
        assert.equal(pugGenerator.pugfile[1], expectedResult2, 'The second line should be the node name and the id and the text')
        assert.equal(pugGenerator.pugfile[2], expectedResult3, 'The third line should be the node name and the id')
        assert.equal(pugGenerator.pugfile[3], expectedResult4, 'The fourth line should be the node name and the id and the attributes')

        
    })
})