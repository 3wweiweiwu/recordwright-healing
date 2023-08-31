//const { assert } = require('console')
const assert = require('assert');
const { HtmlSnapshotCompresed } = require('../../../controller/snapshot')
const { PugGenerator } = require('../../../controller/pugGenerator/pugGenerator.js')

describe('Pug Generator', () => {
    describe('Test function by function', () => {
        let snapshotJsonNode = require('./files/singlerowsinglenode.json')
        let pugGenerator = null;
        beforeEach('Prepare information for the Unit Tests', () =>{
            snapshotJsonNode[0][0].text = ''
            snapshotJsonNode[0][0].attributes = {}
            snapshotJsonNode[0][0].children = []
            pugGenerator = new PugGenerator(JSON.stringify(snapshotJsonNode))
        })
        describe('Test tabs function', () =>{
            it('No space', async() =>{
                assert.equal(pugGenerator.tabs(0), '', 'Tab 0 should be a ""')
            })
            it('One space', async() =>{
                assert.equal(pugGenerator.tabs(1), ' ', 'Tab 0 should be a " "')
            })
            it('Multiple spaces', async() =>{
                assert.equal(pugGenerator.tabs(2), '  ', 'Tab 0 should be a "  "')
            })
        })
        describe('Test getAttributes function', () =>{
            let emptyAtt = {}
            let singleAtt = {class : 'test'}
            let multipleAtt = {class : 'test', style : 'styleTest'}
            let emptyAttResult = ''
            let singleAttResult = '(class="test")'
            let multipleAttResult = '(class="test",style="styleTest")'
            it('No attributtes', async()=>{
                pugGenerator.matrix[0][0].attributes = emptyAtt
                let result = pugGenerator.getAttributes(0, 0)
                assert.equal(result, emptyAttResult, 
                    'The atribbutes in pug should be "" for node with no attributes')
            })
            it('Single attribute', async()=>{
                pugGenerator.matrix[0][0].attributes = singleAtt
                let result = pugGenerator.getAttributes(0, 0)
                assert.equal(result, singleAttResult, 
                    'The atribbutes in pug should be "" for node with no attributes')
            })
            it('Multiple attributes', async()=>{
                pugGenerator.matrix[0][0].attributes = multipleAtt
                let result = pugGenerator.getAttributes(0, 0)
                assert.equal(result, multipleAttResult, 
                    'The atribbutes in pug should be "" for node with no attributes')
            })
        })
        describe('Test printInformation function', () =>{
            it('single node, no text, no attributes, no children', () =>{
                let expectedResult = pugGenerator.matrix[0][0].nodeName
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 1, 'For a node only a node must be generated')
                assert.equal(pugGenerator.pugfile[0], expectedResult, 
                    'The first line only must contain the node name')
            })
            it('single node, text, no attributes, no children', () => {
                pugGenerator.matrix[0][0].nodeName = '#text'
                pugGenerator.matrix[0][0].text = 'test text'
                let expectedResult = 'text test text'
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 1, '2 Elements must be created')
                assert.equal(pugGenerator.pugfile[0], expectedResult, 
                    'The first line must contain the node name and text')

            })
            it('single node, no text, attributes, no children',() =>{
                pugGenerator.matrix[0][0].attributes = {class : 'Test class'}
                let expectedResult = pugGenerator.matrix[0][0].nodeName + pugGenerator.getAttributes(0, 0)
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 1, 'For a node only a element must be generated')
                assert.equal(pugGenerator.pugfile[0], expectedResult, 
                    'The first line only must contain the node name')
            })
            it('single node, no text, no attributes, one child', () =>{
                let newMatrix = [[snapshotJsonNode[0][0]],[snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][0].children = [1]
                pugGenerator.matrix[1][0].id = 1
                let expectedResult = pugGenerator.matrix[0][0].nodeName
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 2, 
                    'For a node with a child should be 2 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult, 
                    'The first line only must contain the node name')
                assert.equal(pugGenerator.pugfile[1], ' '+expectedResult, 
                        'The second line must contain the node name and a white space')
            })
            it('single node, no text, no attributes, two children', () =>{
                let newMatrix = [[snapshotJsonNode[0][0]],[snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][0].children = [1]
                pugGenerator.matrix[1][0].id = 1
                let expectedResult = pugGenerator.matrix[0][0].nodeName
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 2, 
                    'For a node with a child should be 2 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult, 
                    'The first line only must contain the node name')
                assert.equal(pugGenerator.pugfile[1], ' '+expectedResult, 
                    'The second line must contain the node name and a white space')
            })
            it('single node, text, attributes, two children', () =>{
                let newMatrix = [[snapshotJsonNode[0][0]],[snapshotJsonNode[0][0],snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][0].children = [1,2]
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName
                pugGenerator.matrix[1][0].id = 1
                pugGenerator.matrix[1][0].nodeName = 'p'
                let expectedResult2 = ' ' + pugGenerator.matrix[1][0].nodeName
                pugGenerator.matrix[1][1].id = 2
                pugGenerator.matrix[1][1].nodeName = 'div'
                let expectedResult3 = ' ' + pugGenerator.matrix[1][1].nodeName
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 3, 
                    'For a node with a child should be 2 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line only must contain the node name, attributes')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                    'The second line must contain the node name, attributes, and a white space')
                assert.equal(pugGenerator.pugfile[2], expectedResult3, 
                    'The thirth line must contain the node name, attributes, text, and two white space')
            })
            it('single node, text, attributes, two children on cascade', () =>{
                let newMatrix = [[snapshotJsonNode[0][0]],[snapshotJsonNode[0][0]],[snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][0].children = [1]
                pugGenerator.matrix[0][0].attributes = {class : 'test class'}
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + pugGenerator.getAttributes(0,0)
                pugGenerator.matrix[1][0].id = 1
                pugGenerator.matrix[1][0].children = [2]
                pugGenerator.matrix[1][0].nodeName = 'p'
                pugGenerator.matrix[1][0].attributes = {style : 'test style'}
                let expectedResult2 = ' ' + pugGenerator.matrix[1][0].nodeName + pugGenerator.getAttributes(0,1)
                pugGenerator.matrix[2][0].id = 2
                pugGenerator.matrix[2][0].nodeName = '#text'
                pugGenerator.matrix[2][0].text = 'test text'
                let expectedResult3 = '  text test text'
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 3, 
                    'For a node with a child should be 2 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line only must contain the node name, attributes')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                    'The second line must contain the node name, attributes, and a white space')
                assert.equal(pugGenerator.pugfile[2], expectedResult3, 
                    'The thirth line must contain the node name, attributes, text, and two white space')
            })
            it('multiple nodes, no text, no attributes, no children', () =>{
                let newMatrix = [[snapshotJsonNode[0][0],snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][1].id = 1
                pugGenerator.matrix[0][1].nodeName = 'div'
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName
                let expectedResult2 = pugGenerator.matrix[0][1].nodeName
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 2, 
                    'For two nodes should be 2 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line only must contain the node name')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                    'The second line only must contain the second node name')
            })
            it('multiple nodes, text, no attributes, no children', () =>{
                let newMatrix = [[snapshotJsonNode[0][0],snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][0].nodeName = '#text'
                pugGenerator.matrix[0][0].text = 'test text1'
                let expectedResult1 = 'text test text1'
                pugGenerator.matrix[0][1].id = 1
                pugGenerator.matrix[0][1].nodeName = '#text'
                pugGenerator.matrix[0][1].text = 'test text2'
                let expectedResult2 = 'text test text2'
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 2, 
                    'For two nodes should be 2 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line must contain the node name and the text')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                    'The second line must contain the second node name and the text')
            })
            it('multiple nodes, no text, attributes, no children', () =>{
                let newMatrix = [[snapshotJsonNode[0][0],snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][0].attributes = {class : 'test class'}
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + pugGenerator.getAttributes(0,0)
                pugGenerator.matrix[0][1].id = 1
                pugGenerator.matrix[0][1].nodeName = 'div'
                pugGenerator.matrix[0][1].attributes = {style : 'test style'}
                let expectedResult2 = pugGenerator.matrix[0][1].nodeName + pugGenerator.getAttributes(1,0)
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 2, 
                    'For two nodes should be 2 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line only must contain the node name and attrutes')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                    'The second line only must contain the second node name')
            })
            it('multiple nodes, no text, no attributes, one child')
            it('multiple nodes, no text, no attributes, two children')
            it('multiple nodes, no text, no attributes, two children on cascade')
        })
    }) 
})