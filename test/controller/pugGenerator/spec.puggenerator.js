//const { assert } = require('console')
const assert = require('assert');
const { HtmlSnapshotCompresed } = require('../../../controller/snapshot')
const fs = require('fs')
const path = require('path')

describe('Pug Generator', () => {
    describe('Test function by function', () => {
        beforeEach('Prepare information for the Unit Tests', () =>{

        })
        describe('Test tabs function', () =>{
            it('No space')
            it('One space')
            it('Multiple spaces')
        })
        describe('Test getAttributes function', () =>{
            it('No attributtes')
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