//const { assert } = require('console')
const assert = require('assert');
const { HtmlSnapshotCompresed } = require('../../../controller/snapshot')
const { PugGenerator } = require('../../../controller/pugGenerator/pugGenerator.js')

describe('Pug Generator', () => {
    describe('Test function by function', () => {
        let snapshotJsonNode = require('./files/singlerowsinglenode.json')
        let pugGenerator = null;


        beforeEach('Prepare information for the Unit Tests', () =>{
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
            it('No attributtes', async()=>{
                pugGenerator.matrix[0][0].attributes = {}
                let result = pugGenerator.getAttributes(0, 0)
                assert.equal(result, '', 
                    'The atribbutes in pug should be "" for node with no attributes')
            })
            it('Single attribute')
            it('Multiple attributes')
        })
        describe('Test printInformation function', () =>{
            it('single node, no text, no attributes, no children')
            it('single node, text, no attributes, no children')
            it('single node, no text, attributes, no children')
            it('single node, no text, no attributes, one child')
            it('single node, no text, no attributes, two children')
            it('single node, text, attributes, two children')
            it('multiple nodes, no text, no attributes, no children')
            it('multiple nodes, no text, no attributes, no children')
            it('multiple nodes, text, no attributes, no children')
            it('multiple nodes, no text, attributes, no children')
            it('multiple nodes, no text, no attributes, one child')
            it('multiple nodes, no text, no attributes, two children')
        })
    }) 
})