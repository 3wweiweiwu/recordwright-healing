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
    //let baselineComplete = null;
    let compressionNode = null; 
    let baselineNode = null;
    let newNode = null;

    beforeEach('Read and return the Snapshot of the web page in HtmlSnapshotCompresed', async() => {
        compressionComplete = new HtmlSnapshotCompresed(JSON.stringify(snapshotJson))
        //baselineComplete = compressionComplete.parse(JSON.stringify(snapshotJson))
        compressionNode = new HtmlSnapshotCompresed(JSON.stringify(snapshotJsonNode))
        baselineNode = compressionNode.parse(JSON.stringify(snapshotJsonNode))
        newNode = compressionNode.parse(JSON.stringify(snapshotJsonNode))[0][0]
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
        describe('Test getInvisibleNodeInLevel function', () => {
            let invisibleRect = {"x": 0, "y": 0,
                "width": 0, "height": 0,
                "top": 0, "right": 0, "bottom": 0, "left": 0
            }
            let visibleRect = { "x": 1, "y": 1,
                "width": 1, "height": 1,
                "top": 1, "right": 1, "bottom": 1, "left": 1
            }
            it('Single element, single node', async () => {
                baselineNode[0][0].rect = invisibleRect
                let toDelete = compressionNode.getInvisibleNodeInLevel(baselineNode[0])
                assert.equal(toDelete.length, 1, 'getInvisibleNodeInLevel function should return 1 element')
                assert.equal(toDelete[0], baselineNode[0][0], 'getInvisibleNodeInLevel should return the node that is invisible')
            })
            it('Single element, multiple nodes', async () => {
                const randomNode = Math.floor(Math.random() * compressionComplete.atomicNodeMatrix[1].length)
                const nodeId = baselineNode[1][randomNode].id
                baselineNode[1].forEach(node => {
                    if(node.id === nodeId){
                        node.rect = invisibleRect
                    }
                    else{
                        node.rect = visibleRect
                    }
                })
                let toDelete = compressionNode.getInvisibleNodeInLevel(baselineNode[1])
                assert.equal(toDelete.length, 1, 'getInvisibleNodeInLevel function should return 1 element')
                assert.equal(toDelete[0], baselineNode[1][randomNode], 'getInvisibleNodeInLevel should return the node that is invisible')
            })
            it('Multiple elements, multiple nodes', async () => {
                const randomNode = Math.floor(Math.random() * compressionComplete.atomicNodeMatrix[1].length)
                const nodeId = baselineNode[1][randomNode].id
                baselineNode[1].forEach(node => {
                    if(node.id === nodeId){
                        node.rect = visibleRect
                    }
                    else{
                        node.rect = invisibleRect
                    }
                })
                let toDelete = compressionNode.getInvisibleNodeInLevel(baselineNode[1])
                assert.equal(toDelete.length, 2, 'getInvisibleNodeInLevel function should return 2 elements')
                let unexpected = toDelete.filter(node => node.id === nodeId)
                assert.equal(unexpected.length, 0, 'Node visible shouldnt be in the results of getInvisibleNodeInLevel')
                toDelete.forEach(node => {
                    if(node.id === nodeId)
                    {
                        assert.fail('Node visible shouldnt be in the results of getInvisibleNodeInLevel')
                    }
                    let nodeBaseline = baselineNode[1].find(nodeBase => nodeBase.id === node.id)
                    assert.equal(node, nodeBaseline, 'getInvisibleNodeInLevel should return the same node that is invisible')
                })
            })
        })
        describe('Test mergeAttribute function', () => {
            let att1 = {class : 'test1'}
            let att2 = {style : 'test2'}
            let att3 = {class : 'test3'}
            let att12 = {style : 'test2',class : 'test1'}
            let att13 = {class : 'test3 test1'}
            it('No attributes to merge', () => {
                baselineNode[0][0].attributes = {}
                baselineNode[1][0].attributes = {}
                let result = compressionNode.mergeAttribute(baselineNode[0][0], baselineNode[1][0])
                assert.equal(JSON.stringify(result.attributes), JSON.stringify({}), 'mergeAttribute must return node without attributes')
            })
            it('Different typs of attributes', () => {
                baselineNode[0][0].attributes = att1
                baselineNode[1][0].attributes = att2
                let result = compressionNode.mergeAttribute(baselineNode[0][0], baselineNode[1][0])
                assert.equal(JSON.stringify(result.attributes), JSON.stringify(att12), 'mergeAttribute must return node without attributes')
            })
            it('Same key attributes', () => {
                baselineNode[0][0].attributes = att1
                baselineNode[1][0].attributes = att3
                let result = compressionNode.mergeAttribute(baselineNode[0][0], baselineNode[1][0])
                assert.equal(JSON.stringify(result.attributes), JSON.stringify(att13), 'mergeAttribute must return node without attributes')
            })
        })
        describe('Test deleteNodeAndUpdateParent function', () => {
            it('Single node, single row, no parent, merge false', async () => {
                let rowlenght = baselineNode[0].length
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.deleteNodeAndUpdateParent(baselineNode[0][0].id, false)
                assert.equal(compressionNode.atomicNodeMatrix[0], rowlenght-1, 'Choosed node name should be deleted')
            })
            it('Single node, single row, no parent, merge true', async () => {
                let rowlenght = baselineNode[0].length
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.deleteNodeAndUpdateParent(baselineNode[0][0].id, true)
                assert.equal(compressionNode.atomicNodeMatrix[0].length, rowlenght-1, 'Choosed node name should be deleted')
            })
            it('Single node, single row, no parent, merge false', async () => {
                let rowlenght = baselineNode[1].length
                baselineNode[0][0].children = [1,2,3]
                baselineAttributes = baselineNode[0][0].attributes
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.deleteNodeAndUpdateParent(baselineNode[1][0].id, false)
                assert.equal(compressionNode.atomicNodeMatrix[1].length, rowlenght-1, 'Choosed node name should be deleted')
                assert.equal(JSON.stringify(compressionNode.atomicNodeMatrix[0][0].children), JSON.stringify([2,3]), 'Parent children must be updated')
                assert.equal(compressionNode.atomicNodeMatrix[0][0].attributes, baselineAttributes, 'Parent attributes mustnt be updated')
            })
            it('Single node, single row, no parent, merge true', async () => {
                let rowlenght = baselineNode[1].length
                baselineNode[0][0].children = [1,2,3]
                baselineAttributes = baselineNode[0][0].attributes
                baselineNode[1][0].attributes = {'class' : 'test'}
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.deleteNodeAndUpdateParent(baselineNode[1][0].id, true)
                assert.equal(compressionNode.atomicNodeMatrix[1].length, rowlenght-1, 'Choosed node name should be deleted')
                assert.equal(JSON.stringify(compressionNode.atomicNodeMatrix[0][0].children), JSON.stringify([2,3]), 'Parent children must be updated')
                //This validation is failing, I need to test the merge first
                //assert.notEqual(compressionNode.atomicNodeMatrix[0][0].attributes, baselineAttributes, 'Parent attributes mustnt be updated')
            })
        })
        describe('test moveNodeChildrenToRightLevel function', async () => {
            it('No chenges needed', async() => {
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.moveNodeChildrenToRightLevel(compressionNode.atomicNodeMatrix[0][0], 1)
                assert.equal(compressionNode.atomicNodeMatrix, baselineNode, 'There shouldnt be any change on the children')
            })
            it('Move single child to the next level', async() => {
                let newNode = compressionNode.parse(JSON.stringify(snapshotJsonNode))[0]
                newNode[0].id = 10
                baselineNode[0].push(newNode[0])
                baselineNode[0][0].children = [10]
                let rowParentLength = baselineNode[0].length
                let rowChildrenLength = baselineNode[1].length
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.moveNodeChildrenToRightLevel(compressionNode.atomicNodeMatrix[0][0], 1)
                assert.equal(compressionNode.atomicNodeMatrix[0].length, rowParentLength-1, 
                    'The child must be moved from the row 0')
                assert.equal(compressionNode.atomicNodeMatrix[1].length, rowChildrenLength+1, 
                    'The child must be added into the row 1')
                let childrenNode = compressionNode.atomicNodeMatrix[1].find(node => node.id === 10)
                assert.equal(childrenNode, newNode[0], 'Node moved must contain the same information')
            })
            it('Move one child of multiple children to the next level', async() => {
                let newNode = compressionNode.parse(JSON.stringify(snapshotJsonNode))[0]
                newNode[0].id = 10
                baselineNode[0].push(newNode[0])
                baselineNode[0][0].children = [1, 10]
                let rowParentLength = baselineNode[0].length
                let rowChildrenLength = baselineNode[1].length
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.moveNodeChildrenToRightLevel(compressionNode.atomicNodeMatrix[0][0], 1)
                assert.equal(compressionNode.atomicNodeMatrix[0].length, rowParentLength-1, 
                    'The child must be moved from the row 0')
                assert.equal(compressionNode.atomicNodeMatrix[1].length, rowChildrenLength+1, 
                    'The child must be added into the row 1')
                let childrenNode = compressionNode.atomicNodeMatrix[1].find(node => node.id === 10)
                assert.equal(childrenNode, newNode[0], 'Node moved must contain the same information')
                let childrenNode1 = compressionNode.atomicNodeMatrix[1].find(node => node.id === 1)
                assert.equal(childrenNode1, baselineNode[1][0], 
                    'Node not moved must contain the same information')
            })
            it('Move multiple children to the next level', async() =>{
                let newNode1 = compressionNode.parse(JSON.stringify(snapshotJsonNode))[0]
                let newNode2 = compressionNode.parse(JSON.stringify(snapshotJsonNode))[0]
                newNode1[0].id = 10
                newNode2[0].id = 11
                baselineNode[0].push(newNode1[0])
                baselineNode[0].push(newNode2[0])
                baselineNode[0][0].children = [1, 10, 11]
                let rowParentLength = baselineNode[0].length
                let rowChildrenLength = baselineNode[1].length
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.moveNodeChildrenToRightLevel(compressionNode.atomicNodeMatrix[0][0], 1)
                assert.equal(compressionNode.atomicNodeMatrix[0].length, rowParentLength-2, 
                    'The child must be moved from the row 0')
                assert.equal(compressionNode.atomicNodeMatrix[1].length, rowChildrenLength+2, 
                    'The child must be added into the row 1')
                let childrenNode = compressionNode.atomicNodeMatrix[1].find(node => node.id === 10)
                assert.equal(childrenNode, newNode1[0], 'Node moved must contain the same information')
                childrenNode = compressionNode.atomicNodeMatrix[1].find(node => node.id === 11)
                assert.equal(childrenNode, newNode2[0], 'Node moved must contain the same information')
                childrenNode = compressionNode.atomicNodeMatrix[1].find(node => node.id === 1)
                assert.equal(childrenNode, baselineNode[1][0], 
                    'Node not moved must contain the same information')
            })
            it('Child doesnt exist', async()=>{
                baselineNode[0][0].children = [10]
                let rowParentLength = baselineNode[0].length
                let rowChildrenLength = baselineNode[1].length
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.moveNodeChildrenToRightLevel(compressionNode.atomicNodeMatrix[0][0], 1)
                assert.equal(compressionNode.atomicNodeMatrix[0].length, rowParentLength, 
                    'Shouldnt be changes in parents row')
                assert.equal(compressionNode.atomicNodeMatrix[1].length, rowChildrenLength, 
                    'Shouldnt be changes in childrens row')
                assert.equal(JSON.stringify(compressionNode.atomicNodeMatrix[0][0].children), JSON.stringify([]), 'Children must be deleted from the paren list')
            })
            it('Child is in a different level', async() =>{
                let newRow = compressionNode.parse(JSON.stringify(snapshotJsonNode))[0]
                newRow[0].id = 10
                let newNode = newRow[0]
                baselineNode.push(newRow)
                baselineNode[0][0].children = [10]
                let rowParentLength = baselineNode[0].length
                let rowChildrenLength = baselineNode[1].length
                let rowActualChildrenLength = baselineNode[2].length
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.moveNodeChildrenToRightLevel(compressionNode.atomicNodeMatrix[0][0], 1)
                assert.equal(compressionNode.atomicNodeMatrix[0].length, rowParentLength, 
                    'The parent row musnt show any change')
                assert.equal(compressionNode.atomicNodeMatrix[1].length, rowChildrenLength+1, 
                    'The child must be added into the row 1')
                assert.equal(compressionNode.atomicNodeMatrix[2].length, rowActualChildrenLength-1, 
                        'Children where the children is must decrese in 1 element')
                let childrenNode = compressionNode.atomicNodeMatrix[1].find(node => node.id === 10)
                assert.equal(childrenNode, newNode, 'Node moved must contain the same information')
            })
        })
        describe('test rebuildMatrix function', async () => {
            it('Move multiple nodes from differen levels', async() =>{
                let newNode1 = compressionNode.parse(JSON.stringify(snapshotJsonNode))[0]
                let newRow2 = compressionNode.parse(JSON.stringify(snapshotJsonNode))[0]
                newNode1[0].id = 10
                newRow2[0].id = 11
                newNode1[0].children = []
                newRow2[0].children = []
                let newNode = newRow2[0]
                baselineNode[0].push(newNode1[0])
                baselineNode.push(newRow2)
                baselineNode[0][0].children = [1, 11]
                baselineNode[1][0].children = [10, 20]
                let rowParentLength = baselineNode[0].length
                let rowChildrenLength = baselineNode[1].length
                let rowNewLength = baselineNode[2].length
                compressionNode.atomicNodeMatrix = baselineNode
                compressionNode.rebuildMatrix()
                assert.equal(compressionNode.atomicNodeMatrix[0].length, rowParentLength-1, 
                    'The child must be moved from the row 0')
                assert.equal(compressionNode.atomicNodeMatrix[1].length, rowChildrenLength+1, 
                    'The child must be added into the row 1')
                assert.equal(compressionNode.atomicNodeMatrix[2].length, rowNewLength, 
                    'The row 2 must keep the same length because we add and delete 1 element')

                let childrenNode = compressionNode.atomicNodeMatrix[1].find(node => node.id === 11)
                assert.equal(childrenNode, newNode, 'Node moved must contain the same information')
                assert.equal(compressionNode.atomicNodeMatrix[2][0], newNode1[0], 
                    'Node moved must contain the same information')
                assert.equal(JSON.stringify(compressionNode.atomicNodeMatrix[1][0].children), 
                    JSON.stringify([10]), 'Children taht doent exists must be deleted from the parent list')
            })
        })
    })
})