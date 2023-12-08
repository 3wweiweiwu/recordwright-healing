const { HtmlSnapshotCompresed } = require('../../service/snapshot')
const { PugGenerator } = require('../../service/pugGenerator/pugGenerator')

class ElementIdentificationManager {
    /**
     * @param {HtmlSnapshotCompresed} htmlSnap PUG HTML Snapshot
     * @param {string} testStep Test Step
     * @param {string} containerId id of the container of the element to be identified. if container id is null, return whole pug page
     **/
    constructor(htmlSnap, testStep, containerId = null) {
        this.htmlSnapshot = htmlSnap
        this.testStep = testStep
        this.containerId = containerId
        this.webPage = this._getPugTextById(this.htmlSnapshot, this.containerId)
    }

    /**
     * Get element id from element such as tag#15->15
     * @param {string} element 
     * @returns {number} element id
     */
    _getElementId(element) {
        return parseInt(element.split('#')[1])
    }
    /**
     * Based on Html Snapshot and element id, return the pug text of the element children
     * @param {HtmlSnapshotCompresed} htmlSnapshot 
     * @param {string} targetId it's in tag#id format 
     * @returns {string} pug text of the element children
     */
    _getPugTextById(htmlSnapshot, targetId) {
        try {
            let htmlSnapshotMatrixStr = ''
            if (targetId == null) {
                //if target id is null, we will return the whole pug page
                htmlSnapshotMatrixStr = JSON.stringify(htmlSnapshot.atomicNodeMatrix)

            }
            else {
                //if target is not null, we will return target element based on id
                targetId = this._getElementId(targetId)
                let targetNodeChildrenMatrix = htmlSnapshot.getChildrenAtomicMatrixById(targetId)
                htmlSnapshotMatrixStr = JSON.stringify(targetNodeChildrenMatrix)
            }

            let pugGen = new PugGenerator(htmlSnapshotMatrixStr)
            pugGen.createPugFile()
            let pugStr = pugGen.pugStr
            return pugStr
        } catch (error) {
            console.error('error in _getPugTextById')
        }

    }

    async identifyElement() {
        throw 'Not implemented'
    }

}

module.exports = ElementIdentificationManager

