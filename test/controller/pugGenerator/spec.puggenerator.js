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
            let singleId = {id : 'testid'}
            let multipleAtt = {class : 'test', style : 'styleTest'}
            let multipleIdFirst = {id : 'testid', class : 'test'}
            let multipleIdEnd = {class : 'test', id : 'testid'}
            let emptyAttResult = ''
            let singleAttResult = '(class="test")'
            let singleIdResult = '(automationid="testid")'
            let multipleAttResult = '(class="test",style="styleTest")'
            let multipleIdFirstResult = '(automationid="testid",class="test")'
            let multipleIdEndResult = '(class="test",automationid="testid")'
            
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
            it('Single attribute Id', async()=>{
                pugGenerator.matrix[0][0].attributes = singleId
                let result = pugGenerator.getAttributes(0, 0)
                assert.equal(result, singleIdResult, 
                    'The atribbutes in pug should be "" for node with no attributes')
                })
            it('Multiple attribute Id first', async()=>{
                pugGenerator.matrix[0][0].attributes = multipleIdFirst
                let result = pugGenerator.getAttributes(0, 0)
                assert.equal(result, multipleIdFirstResult, 
                    'The atribbutes in pug should be "" for node with no attributes')
                })
            it('Multiple attribute Id end', async()=>{
                pugGenerator.matrix[0][0].attributes = multipleIdEnd
                let result = pugGenerator.getAttributes(0, 0)
                assert.equal(result, multipleIdEndResult, 
                    'The atribbutes in pug should be "" for node with no attributes')
                })
        })
        describe('Test printInformation function', () =>{
            it('single node, no text, no attributes, no children', () =>{
                let expectedResult = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 1, 'For a node only a node must be generated')
                assert.equal(pugGenerator.pugfile[0], expectedResult, 
                    'The first line only must contain the node name')
            })
            it('single node, text, no attributes, no children', () => {
                pugGenerator.matrix[0][0].nodeName = '#text'
                pugGenerator.matrix[0][0].text = 'test text'
                let expectedResult = 'text' + '#' + pugGenerator.matrix[0][0].id + ' test text'
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 1, '2 Elements must be created')
                assert.equal(pugGenerator.pugfile[0], expectedResult, 
                    'The first line must contain the node name and text')

            })
            it('single node, no text, attributes, no children',() =>{
                pugGenerator.matrix[0][0].attributes = {class : 'Test class'}
                let expectedResult = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id + pugGenerator.getAttributes(0, 0)
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 1, 'For a node only a element must be generated')
                assert.equal(pugGenerator.pugfile[0], expectedResult, 
                    'The first line only must contain the node name')
            })
            it('single node, no text, attibutes with id, no child',() =>{
                pugGenerator.matrix[0][0].attributes = {id : 'testId'}
                let expectedResult = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id + pugGenerator.getAttributes(0, 0)
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
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id
                let expectedResult2 = ' ' + pugGenerator.matrix[1][0].nodeName + '#' + pugGenerator.matrix[1][0].id
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 2, 
                    'For a node with a child should be 2 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line only must contain the node name')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                        'The second line must contain the node name and a white space')
            })
            it('single node, no text, no attributes, two children', () =>{
                let newMatrix = [[snapshotJsonNode[0][0]],[snapshotJsonNode[0][0],snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][0].children = [1,2]
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id
                pugGenerator.matrix[1][0].id = 1
                pugGenerator.matrix[1][0].nodeName = 'p'
                let expectedResult2 = ' ' + pugGenerator.matrix[1][0].nodeName + '#' + pugGenerator.matrix[1][0].id
                pugGenerator.matrix[1][1].id = 2
                pugGenerator.matrix[1][1].nodeName = 'div'
                let expectedResult3 = ' ' + pugGenerator.matrix[1][1].nodeName + '#' + pugGenerator.matrix[1][1].id
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
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id + pugGenerator.getAttributes(0,0)
                pugGenerator.matrix[1][0].id = 1
                pugGenerator.matrix[1][0].children = [2]
                pugGenerator.matrix[1][0].nodeName = 'p'
                pugGenerator.matrix[1][0].attributes = {style : 'test style'}
                let expectedResult2 = ' ' + pugGenerator.matrix[1][0].nodeName + '#' + pugGenerator.matrix[1][0].id + pugGenerator.getAttributes(0,1)
                pugGenerator.matrix[2][0].id = 2
                pugGenerator.matrix[2][0].nodeName = '#text'
                pugGenerator.matrix[2][0].text = 'test text'
                let expectedResult3 = '  text' + '#' + pugGenerator.matrix[2][0].id + ' test text'
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
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id
                let expectedResult2 = pugGenerator.matrix[0][1].nodeName + '#' + pugGenerator.matrix[0][1].id
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
                let expectedResult1 = 'text'  + '#' + pugGenerator.matrix[0][0].id + ' test text1'
                pugGenerator.matrix[0][1].id = 1
                pugGenerator.matrix[0][1].nodeName = '#text'
                pugGenerator.matrix[0][1].text = 'test text2'
                let expectedResult2 = 'text'  + '#' + pugGenerator.matrix[0][1].id + ' test text2'
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
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id + pugGenerator.getAttributes(0,0)
                pugGenerator.matrix[0][1].id = 1
                pugGenerator.matrix[0][1].nodeName = 'div'
                pugGenerator.matrix[0][1].attributes = {style : 'test style'}
                let expectedResult2 = pugGenerator.matrix[0][1].nodeName + '#' + pugGenerator.matrix[0][1].id + pugGenerator.getAttributes(1,0)
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 2, 
                    'For two nodes should be 2 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line only must contain the node name and attrutes')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                    'The second line only must contain the second node name')
            })
            it('multiple nodes, no text, attibutes with id, no child', () =>{
                let newMatrix = [[snapshotJsonNode[0][0],snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][0].attributes = {id : 'testid'}
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id + pugGenerator.getAttributes(0,0)
                pugGenerator.matrix[0][1].id = 1
                pugGenerator.matrix[0][1].nodeName = 'div'
                pugGenerator.matrix[0][1].attributes = {id : 'testid2'}
                let expectedResult2 = pugGenerator.matrix[0][1].nodeName + '#' + pugGenerator.matrix[0][1].id + pugGenerator.getAttributes(1,0)
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 2, 
                    'For two nodes should be 2 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line only must contain the node name and attrutes')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                    'The second line only must contain the second node name')
            })
            it('multiple nodes, no text, no attributes, one child', () =>{
                let newMatrix = [[snapshotJsonNode[0][0],snapshotJsonNode[0][0]],[snapshotJsonNode[0][0],snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][0].children = [2]
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][1].id
                pugGenerator.matrix[0][1].id = 1
                pugGenerator.matrix[0][1].nodeName = 'div'
                pugGenerator.matrix[0][1].children = [3]
                let expectedResult3 = pugGenerator.matrix[0][1].nodeName + '#' + pugGenerator.matrix[0][1].id
                pugGenerator.matrix[1][0].id = 2
                pugGenerator.matrix[1][0].nodeName = 'li'
                let expectedResult2 = ' ' + pugGenerator.matrix[1][0].nodeName + '#' + pugGenerator.matrix[1][0].id
                pugGenerator.matrix[1][1].id = 3
                pugGenerator.matrix[1][1].nodeName = 'p'
                let expectedResult4 = ' ' + pugGenerator.matrix[1][1].nodeName + '#' + pugGenerator.matrix[1][1].id
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 4, 
                    'For 4 nodes should be 4 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line only must contain the node name')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                    'The second line only must contain the node name')
                assert.equal(pugGenerator.pugfile[2], expectedResult3, 
                    'The thirth line only must contain the node name')
                assert.equal(pugGenerator.pugfile[3], expectedResult4, 
                    'The fourth line only must contain the node name')
            })
            it('multiple nodes, text, attributes, two children', () =>{
                let newMatrix = [[snapshotJsonNode[0][0],snapshotJsonNode[0][0]],[snapshotJsonNode[0][0],snapshotJsonNode[0][0],snapshotJsonNode[0][0],snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                pugGenerator.matrix[0][0].children = [2,3]
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id
                pugGenerator.matrix[0][1].id = 1
                pugGenerator.matrix[0][1].nodeName = 'div'
                pugGenerator.matrix[0][1].children = [4,5]
                let expectedResult4 = pugGenerator.matrix[0][1].nodeName + '#' + pugGenerator.matrix[0][1].id
                pugGenerator.matrix[1][0].id = 2
                pugGenerator.matrix[1][0].nodeName = 'div'
                let expectedResult2 = ' ' + pugGenerator.matrix[1][0].nodeName + '#' + pugGenerator.matrix[1][0].id
                pugGenerator.matrix[1][1].id = 3
                pugGenerator.matrix[1][1].nodeName = 'p'
                let expectedResult3 = ' ' + pugGenerator.matrix[1][1].nodeName + '#' + pugGenerator.matrix[1][1].id
                pugGenerator.matrix[1][2].id = 4
                pugGenerator.matrix[1][2].nodeName = 'li'
                let expectedResult5 = ' ' + pugGenerator.matrix[1][2].nodeName + '#' + pugGenerator.matrix[1][2].id
                pugGenerator.matrix[1][3].id = 5
                pugGenerator.matrix[1][3].nodeName = 'ol'
                let expectedResult6 = ' ' + pugGenerator.matrix[1][3].nodeName + '#' + pugGenerator.matrix[1][3].id
                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 6, 
                    'For 4 nodes should be 4 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line only must contain the node name')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                    'The second line only must contain the node name')
                assert.equal(pugGenerator.pugfile[2], expectedResult3, 
                    'The thirth line only must contain the node name')
                assert.equal(pugGenerator.pugfile[3], expectedResult4, 
                    'The fifth line only must contain the node name')
                assert.equal(pugGenerator.pugfile[4], expectedResult5, 
                    'The sixth line only must contain the node name')
                assert.equal(pugGenerator.pugfile[5], expectedResult6, 
                    'The seventh line only must contain the node name')
            })
            it('multiple nodes, text, attributes, two children on cascade', () =>{
                let newMatrix = [[snapshotJsonNode[0][0],snapshotJsonNode[0][0]],[snapshotJsonNode[0][0],snapshotJsonNode[0][0]],[snapshotJsonNode[0][0],snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                
                pugGenerator.matrix[0][0].children = [2]
                pugGenerator.matrix[0][0].attributes = {class : 'test class'}
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id + pugGenerator.getAttributes(0,0)
                pugGenerator.matrix[1][0].id = 2
                pugGenerator.matrix[1][0].children = [4]
                pugGenerator.matrix[1][0].nodeName = 'p'
                pugGenerator.matrix[1][0].attributes = {style : 'test style'}
                let expectedResult2 = ' ' + pugGenerator.matrix[1][0].nodeName + '#' + pugGenerator.matrix[1][0].id + pugGenerator.getAttributes(0,1)
                pugGenerator.matrix[2][0].id = 4
                pugGenerator.matrix[2][0].nodeName = '#text'
                pugGenerator.matrix[2][0].text = 'test text1'
                let expectedResult3 = '  text' + '#' + pugGenerator.matrix[2][0].id + ' test text1'

                pugGenerator.matrix[0][1].id = 1
                pugGenerator.matrix[0][1].children = [3]
                pugGenerator.matrix[0][1].attributes = {class : 'test class2'}
                let expectedResult4 = pugGenerator.matrix[0][1].nodeName + '#' + pugGenerator.matrix[0][1].id + pugGenerator.getAttributes(1,0)
                pugGenerator.matrix[1][1].id = 3
                pugGenerator.matrix[1][1].children = [5]
                pugGenerator.matrix[1][1].nodeName = 'p'
                pugGenerator.matrix[1][1].attributes = {style : 'test style2'}
                let expectedResult5 = ' ' + pugGenerator.matrix[1][1].nodeName + '#' + pugGenerator.matrix[1][1].id + pugGenerator.getAttributes(1,1)
                pugGenerator.matrix[2][1].id = 5
                pugGenerator.matrix[2][1].nodeName = '#text'
                pugGenerator.matrix[2][1].text = 'test text2'
                let expectedResult6 = '  text' + '#' + pugGenerator.matrix[2][1].id + ' test text2'

                pugGenerator.createPugFile()
                assert.equal(pugGenerator.pugfile.length, 6, 
                    'For 4 nodes should be 4 rows')
                assert.equal(pugGenerator.pugfile[0], expectedResult1, 
                    'The first line only must contain the node name')
                assert.equal(pugGenerator.pugfile[1], expectedResult2, 
                    'The second line only must contain the node name')
                assert.equal(pugGenerator.pugfile[2], expectedResult3, 
                    'The thirth line only must contain the node name')
                assert.equal(pugGenerator.pugfile[3], expectedResult4, 
                    'The fifth line only must contain the node name')
                assert.equal(pugGenerator.pugfile[4], expectedResult5, 
                    'The sixth line only must contain the node name')
                assert.equal(pugGenerator.pugfile[5], expectedResult6, 
                    'The seventh line only must contain the node name')
            })
        })
        describe('Test createPugFile function', () => {
            it('multiple nodes, text, attributes, two children on cascade', () =>{
                let newMatrix = [[snapshotJsonNode[0][0],snapshotJsonNode[0][0]],[snapshotJsonNode[0][0],snapshotJsonNode[0][0]],[snapshotJsonNode[0][0],snapshotJsonNode[0][0]]]
                pugGenerator = new PugGenerator(JSON.stringify(newMatrix))
                
                pugGenerator.matrix[0][0].children = [2]
                pugGenerator.matrix[0][0].attributes = {class : 'test class'}
                let expectedResult1 = pugGenerator.matrix[0][0].nodeName + '#' + pugGenerator.matrix[0][0].id + pugGenerator.getAttributes(0,0)
                pugGenerator.matrix[1][0].id = 2
                pugGenerator.matrix[1][0].children = [4]
                pugGenerator.matrix[1][0].nodeName = 'p'
                pugGenerator.matrix[1][0].attributes = {style : 'test style'}
                let expectedResult2 = ' ' + pugGenerator.matrix[1][0].nodeName + '#' + pugGenerator.matrix[1][0].id + pugGenerator.getAttributes(0,1)
                pugGenerator.matrix[2][0].id = 4
                pugGenerator.matrix[2][0].nodeName = '#text'
                pugGenerator.matrix[2][0].text = 'test text1'
                let expectedResult3 = '  text' + '#' + pugGenerator.matrix[2][0].id + ' test text1'

                pugGenerator.matrix[0][1].id = 1
                pugGenerator.matrix[0][1].children = [3]
                pugGenerator.matrix[0][1].attributes = {class : 'test class2'}
                let expectedResult4 = pugGenerator.matrix[0][1].nodeName + '#' + pugGenerator.matrix[0][1].id + pugGenerator.getAttributes(1,0)
                pugGenerator.matrix[1][1].id = 3
                pugGenerator.matrix[1][1].children = [5]
                pugGenerator.matrix[1][1].nodeName = 'p'
                pugGenerator.matrix[1][1].attributes = {style : 'test style2'}
                let expectedResult5 = ' ' + pugGenerator.matrix[1][1].nodeName + '#' + pugGenerator.matrix[1][1].id + pugGenerator.getAttributes(1,1)
                pugGenerator.matrix[2][1].id = 5
                pugGenerator.matrix[2][1].nodeName = '#text'
                pugGenerator.matrix[2][1].text = 'test text2'
                let expectedResult6 = '  text' + '#' + pugGenerator.matrix[2][1].id + ' test text2'

                pugGenerator.createPugFile()
                let finalResult = expectedResult1 + '\n' +expectedResult2 + '\n' +expectedResult3 + '\n' +expectedResult4 + '\n' + expectedResult5 + '\n' + expectedResult6 + '\n'
                assert.equal(pugGenerator.pugStr, finalResult, 
                    'The final string must be the sum of all the nodes')
            })
        })
    }) 
})