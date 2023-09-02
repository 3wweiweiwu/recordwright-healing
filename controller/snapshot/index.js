class AtomicNode {
    /**
     * 
     * @param {HTMLElement} element 
     * @param {number} id
     */
    constructor(element, id) {
        this.element = element;
        /**
         * HTML Children's id
         * @type {number[]}
         */
        this.children = [];
        this.id = id;
        /**
         * The rectangle of the element
         * @type {DOMRect}
         */
        this.rect = this.getBoundingRect(element);

        this.text = this.retrieveText(element);

        this.nodeName = element.nodeName
        /**
         * The attribute of the element
         * @type {Object.<string, string>}
         */
        this.attributes = this.retrieveAttribute(element);

        this.isTarget = false
        /**@type {number[]} */
        this.compressedNodes = []
    }
    /**
     * Clone the atomic node object
     * @returns {AtomicNode}
     **/
    clone() {
        //clone the atomic node object
        let clone = new AtomicNode(this.element, this.id)
        clone.children = [...this.children]
        clone.rect = this.rect
        clone.text = this.text
        clone.nodeName = this.nodeName
        clone.attributes = { ...this.attributes }
        clone.isTarget = this.isTarget
        clone.compressedNodes = [...this.compressedNodes]
        return clone
    }
    /**
     * Return the level index of the element
     */
    getLevelIndex() {
        let level = 0
        let element = this.element
        let parentDocument = document


        if (window.frameElement && window.frameElement.contentWindow.parent.document) {
            parentDocument = window.frameElement.contentWindow.parent.document
        }

        while (element != document && element != parentDocument) {
            level++
            element = element.parentNode
        }
        return level
    }
    /**
     * set children element's id
     * @param {number[]} children 
     */
    setChildren(children) {
        this.children = children;
    }
    /**
     * If element have rectangle, returns object
     * @param {HTMLElement} element 
     * @returns {DOMRect}
     */
    getBoundingRect(element) {
        let rect = null
        //if element is a text node, use range to get bounding rectangle
        if (element.nodeType == 3) {
            let range = document.createRange();
            range.selectNodeContents(element);
            rect = range.getBoundingClientRect();
            return rect
        }

        try {
            rect = element.getBoundingClientRect();
        } catch (error) {


        }

        return rect;
    }
    /**
     * populate the attribute of the element
     * @param {HTMLElement} element
     * @returns {Object.<string, string>}
     */
    retrieveAttribute(element) {
        let attributes = {}
        //if there is no attributes, return empty object
        if (element.attributes == null) return attributes

        //loop through all the attributes
        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            attributes[attr.name] = attr.value;
        }
        return attributes
    }
    /**
     * populate the text of the element
     * @param {HTMLElement} element 
     * @returns 
     */
    retrieveText(element) {
        let text = null
        if (element.nodeType == 3) {
            text = element.nodeValue;
        }
        return text
    }
}

class NodeSearchResult {
    /**
     * 
     * @param {AtomicNode} node 
     * @param {number} level 
     * @param {AtomicNode} parentNode 
     */
    constructor(node, level, parentNode) {
        this.node = node
        this.levelIndex = level
        this.parentNode = parentNode
    }
}
class HtmlSnapshotCompresed {
    /**
     * Test compresor AtomicNodeMaatrix
     * @param {string} json
     * */
    constructor(json) {
        /**
         * AtomicNode Matrix by level. The first level is document
         * @type {AtomicNode[][]}
         */

        this.atomicNodeMatrix = this.parse(json)
        this._compress() //I think that the function doesnt receive parameters
    }
    /**
     * parse the json string to atomic node matrix
     * @param {string} json 
     */
    parse(json) { //Change from private to public
        let atomicNodeMatrix = JSON.parse(json)
        atomicNodeMatrix = atomicNodeMatrix.map(row => {
            let newRow = row.map(node => {
                let newNode = new AtomicNode(node.element, node.id)
                let updatedNode = { ...newNode, ...node }
                return updatedNode
            })
            return newRow
        })

        return atomicNodeMatrix
    }
    _compress() {
        for (let i = this.atomicNodeMatrix.length - 2; i > 0; i--) {
            let level = this.atomicNodeMatrix[i]
            let unqualifiedNodeInLevel = []
            do {
                //delete all script and associated children within current level
                this.deleteScripts(level)

                //update text in current level
                this.updateTextInCurrnetLevel(level)

                //delete all nodes that are not qualified for compression
                unqualifiedNodeInLevel = this.getInvisibleNodeInLevel(this.atomicNodeMatrix[i])
                unqualifiedNodeInLevel.forEach(node => {
                    this.deleteNodeAndUpdateParent(node.id, false)
                })

                unqualifiedNodeInLevel = this.getSingleChildNodeInLevel(this.atomicNodeMatrix[i])
                unqualifiedNodeInLevel.forEach(node => {
                    this.deleteNodeAndUpdateParent(node.id, true)
                })
            }
            while (unqualifiedNodeInLevel.length > 0)


        }

        this.rebuildMatrix()
    }
    /**
     * Update text in the node. If the text contains \n, remove it and following shite space
     * @param {AtomicNode[]} level 
     */
    updateTextInCurrnetLevel(level) {  //Change from private to public
        level.forEach(node => {
            if (node.text != null) {
                node.text = node.text.replace(/\n\s+/g, '')
            }
        })
        return level //For UT
    }
    /**
     * get the node information by id, return node, level index and parent node
     * @param {number} id 
     * @returns {NodeSearchResult}
     */
    getNodeInformationById(id) {
        let parentNode = null
        let result = null
        this.atomicNodeMatrix.find((level, index) => {
            //find the parent node whose children contains the id
            level.find(node => {
                if (node.children.includes(id)) {
                    parentNode = node
                }
            })

            //find the node that match id
            let node = level.find(node => node.id == id)
            if (node != null) {
                result = new NodeSearchResult(node, index, parentNode)
            }
        })
        return result
    }
    rebuildMatrix() {  //Change from private to public
        for (let i = 0; i < this.atomicNodeMatrix.length; i++) {
            let currentLevel = this.atomicNodeMatrix[i]
            let nextLevel = this.atomicNodeMatrix[i + 1]
            for (let j = 0; j < currentLevel.length; j++) {
                let currentNode = currentLevel[j]
                //move node's children to node's level
                this.moveNodeChildrenToRightLevel(currentNode, i + 1)
            }
        }
    }
    /**
     * Move node's children to the right level
     * @param {AtomicNode} node
     * @param {number} nextLevelIndex The children level of the node
     */
    moveNodeChildrenToRightLevel(node, nextLevelIndex) {  //Change from private to public

        node.children.forEach(nodeId => {
            let nextNodeLevel = this.atomicNodeMatrix[nextLevelIndex]
            let isChildInNextLevel = nextNodeLevel.find(node => node.id == nodeId)
            if (isChildInNextLevel == null) {
                //find node in the current matrix, move child node to next level
                let nodeResult = this.getNodeInformationById(nodeId)
                if (nodeResult != null) {
                    //remove node from current level
                    let nodeLevel = this.atomicNodeMatrix[nodeResult.levelIndex]
                    let index = nodeLevel.indexOf(nodeResult.node)
                    nodeLevel.splice(index, 1)

                    //add node to next level
                    nextNodeLevel.push(nodeResult.node)
                }
            }
        })
        return node //For UT
    }
    /**
     * Delete the node and move its children to its parent
     * @param {number} id 
     * @param {boolean} isMergeAttribute
     * @returns {number[]} the children of the deleted node
     * */
    deleteNodeAndUpdateParent(id, isMergeAttribute) {
        //TODO: potential performance issue
        let nodeInfo = this.getNodeInformationById(id)

        if (nodeInfo == null) {
            console.error('Unable to find node with id: ' + id)
        }

        //remove the node from its parent's children
        let parentNode = nodeInfo.parentNode
        let index = parentNode.children.indexOf(id)



        parentNode.children.splice(index, 1)



        //remove the node from current level
        let level = this.atomicNodeMatrix[nodeInfo.levelIndex]
        index = level.indexOf(nodeInfo.node)
        level.splice(index, 1)

        //add the node's children to its parent's children
        parentNode.children = [...parentNode.children, ...nodeInfo.node.children]

        //merge attributes to parent node
        if (isMergeAttribute) {
            this.mergeAttribute(parentNode, nodeInfo.node)
        }


        //move node's children to node's level
        // nodeInfo.node.children.forEach(childId => {
        //     let childNode = this.getNodeInformationById(childId)
        //     //remove node from its current level
        //     this.atomicNodeMatrix[childNode.levelIndex].splice(childNode.node, 1)
        //     //add node to its parent's children
        //     this.atomicNodeMatrix[childNode.levelIndex - 1].push(childNode.node)
        // })

        return nodeInfo.node.children
    }
    /**
     * Merge the attribute from source node to target node
     * @param {AtomicNode} targetNode 
     * @param {AtomicNode} sourceNode 
     */
    mergeAttribute(sourceNode, targetNode) { //Change from private to public
        //update compressed node attribute to note down the range. push source node to target node's compressed node
        targetNode.compressedNodes.push(sourceNode.id)
        targetNode.compressedNodes.filter(nodeId => nodeId != targetNode.id)
        targetNode.compressedNodes.push(targetNode.id)

        //merge attribute of sourceNode and targetNode
        for (const [key, value] of Object.entries(sourceNode.attributes)) {
            if (Object.keys(targetNode.attributes).includes(key)) {
                targetNode.attributes[key] = targetNode.attributes[key] + ' ' + value
            }
            else {
                targetNode.attributes[key] = value
            }
        }
        return targetNode //For UT
    }
    /**
     * Go through current atomic node and return nodes that quality for removal
     * @param {AtomicNode[]} atomicNodeLevel 
     * @returns {AtomicNode[]}
     */
    getInvisibleNodeInLevel(atomicNodeLevel) { //Change from private to public
        /**@type {AtomicNode[]} */
        let pendingDelete = []
        atomicNodeLevel.forEach(node => {
            //check rectangle
            if (!this._rectVisible(node.rect)) {
                pendingDelete.push(node)
            }

        })
        return pendingDelete
    }
    /**
     * Go through current atomic node and return nodes that quality for removal
     * @param {AtomicNode[]} atomicNodeLevel 
     * @returns {AtomicNode[]}
     */
    getSingleChildNodeInLevel(atomicNodeLevel) { //Change from private to public
        /**@type {AtomicNode[]} */
        let pendingDelete = []
        atomicNodeLevel.forEach(node => {
            //check rectangle
            if (node.children.length == 1) {
                pendingDelete.push(node)
            }
        })
        return pendingDelete
    }
    /**
     * Delete all nodes that are contained by SCRIPT node
     * @param {AtomicNode[]} atomicNodeLevel
     * */
    deleteScripts(atomicNodeLevel) { //I don't know who to test this because of the inputs and outputs
        var scriptList = atomicNodeLevel.filter(node => {
            if (node.nodeName == 'SCRIPT') {
                return node
            }
        })


        //keep deleting all nodes under script list till there is no more nodes
        while (scriptList.length > 0) {
            let nextLevelScriptChildren = []
            scriptList.forEach(node => {
                let scriptChildren = this.deleteNodeAndUpdateParent(node.id)
                nextLevelScriptChildren = [...nextLevelScriptChildren, ...scriptChildren]
            })
            scriptList = nextLevelScriptChildren

        }

    }

    /**
     * @param {DOMRect} rect
     */
    _rectVisible(rect) {
        if (rect === null) {
            return false
        }
        if (rect.width === 0 && rect.height === 0) {
            return false
        }
        return true
    }



    /**
     * Test compresor AtomicNodeMaatrix
     * @param {AtomicNode[][]} atomicNodeMatrix
     * @param {number} id
     * @returns {AtomicNode}
     * */
    getNodeFromMatrix(atomicNodeMatrix, id) //I could share the current row to scan just the row where should be the child, and spend less time in the compression
    {
        let result = atomicNodeMatrix.find(row => {
            var newNode = row.find(node => node.id == id)
            return newNode
        })
        return result
    }


    /**
     * Test compresor AtomicNodeMaatrix
     * @param {AtomicNode[][]} atomicNodeMatrix
     * */
    updatedChildren(atomicNodeMatrix) {
        var result = atomicNodeMatrix.map(row => {
            var newNode = row.map(node => {
                node.children = node.children.filter(id => this.getNodeFromMatrix(atomicNodeMatrix, id))
                return node
            })
            return newNode
        })
        return result
    }

    /**
     * Test compresor AtomicNodeMaatrix
     * @param {AtomicNode[][]} atomicNodeMatrix
     * */
    deleteRowsNoNode(atomicNodeMatrix) {
        var result = atomicNodeMatrix.filter(row => row.length > 0)
        return result
    }

    /**
     * Test compresor AtomicNodeMaatrix
     * @param {AtomicNode[][]} atomicNodeMatrix
     * */
    deleteRowsNoAttNoRect(atomicNodeMatrix) {
        var result = atomicNodeMatrix.map(row => {
            var newNode = row.filter(node => {
                if (Object.keys(node.attributes).length > 0) {
                    return node
                }
                if (this._rectVisible(node.rect)) {
                    return node
                }
            })
            return newNode
        })
        return result
    }

    /**
    * @param {DOMRect} rect1
    * @param {DOMRect} rect2
    * */
    _rectEqual(rect1, rect2) {  
        if (rect1.bottom == rect2.bottom &&
            rect1.height == rect2.height &&
            rect1.left == rect2.left &&
            rect1.right == rect2.right &&
            rect1.top == rect2.top &&
            rect1.width == rect2.width &&
            rect1.x == rect2.x &&
            rect1.y == rect2.y) {
            return true
        }
        return false
    }

    /**
     * Test compresor AtomicNodeMaatrix
     * @param {AtomicNode[][]} atomicNodeMatrix
     * @param {number} id
     * @param {number} startRow
     * @param {number} startNode
     * @param {DOMRect} rect
     * */
    _updateAttributes(atomicNodeMatrix, id, startRow, startNode, attribute, rect) {
        let row = (startRow + 1)
        for (let node = 0; node < atomicNodeMatrix[row].length; node++) // I could avoid this loop and just look in the next row, just to simplify the code
        {
            if (atomicNodeMatrix[row][node].id === id) {
                if (this._rectEqual(atomicNodeMatrix[row][node].rect, rect)) {
                    const matrixKeys = Object.keys(atomicNodeMatrix[row][node].attributes)
                    for (const [key, value] of Object.entries(attribute)) {
                        if (matrixKeys.includes(key)) {
                            atomicNodeMatrix[row][node].attributes[key] = atomicNodeMatrix[row][node].attributes[key] + ',' + value
                        }
                        else {
                            atomicNodeMatrix[row][node].attributes[key] = value
                        }
                    }
                    atomicNodeMatrix[startRow][startNode].children = this._removeItemOnce(atomicNodeMatrix[startRow][startNode].children, id)
                    //atomicNodeMatrix[startRow][startNode].children = atomicNodeMatrix[startRow][startNode].children.filter(id => this._idExists(atomicNodeMatrix, id))
                    atomicNodeMatrix[startRow][startNode].merged = true
                }
                return atomicNodeMatrix
            }
        }
        return atomicNodeMatrix
    }

    _removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            let arr2 = arr.toSpliced(index, 1);
            return arr2;
        }
        return arr

    }

    /**
     * Test compresor AtomicNodeMaatrix
     * @param {AtomicNode[][]} atomicNodeMatrix
     * */
    mergeAttributes(atomicNodeMatrix) {
        const rowLength = atomicNodeMatrix.length
        for (let row = 0; row < rowLength; row++) {
            let nodeLength = atomicNodeMatrix[row].length
            for (let node = 0; node < nodeLength; node++) {
                if (atomicNodeMatrix[row][node].children.length > 0) {
                    var attribute = atomicNodeMatrix[row][node].attributes
                    var rect = atomicNodeMatrix[row][node].rect
                    for (let childId of atomicNodeMatrix[row][node].children) {
                        atomicNodeMatrix = this._updateAttributes(atomicNodeMatrix, childId, row, node, attribute, rect)
                    }

                }
            }
        }
        return atomicNodeMatrix
    }

    /**
     * Test compresor AtomicNodeMaatrix
     * @param {AtomicNode[][]} atomicNodeMatrix
     * */
    deleteNodesMergedNoChildren(atomicNodeMatrix) {
        var result = atomicNodeMatrix.map(row => {
            var newNode = row.filter(node => {
                if (!node.merged) {
                    return node
                }
                if (node.children.length > 0) {
                    return node
                }
            })
            return newNode
        })
        return result
    }
}

module.exports = { HtmlSnapshotCompresed }