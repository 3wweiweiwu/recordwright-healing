const { AtomicNode } = require('../snapshot')

class PugGenerator 
{
    pugfile = []

    /**
     * PuG Generator
     * @param {string} json
     * */
    constructor(json)
    {
        this.matrix = this.parse(json)
    }

    parse(json) {
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

    tabs(number)
    {
        let tabString = ''
        for(let tab = 0; tab< number; tab++)
        {
            tabString += ' '
        }
        return tabString
    }

    printInformation(row, node = null, id = null)
    {
        let pugRow = ''
        if(id)
        {
            if(!this.matrix[row]) 
            {
                return
            }
            for(let nodeSearch = 0; nodeSearch<this.matrix[row].length; nodeSearch++)
            {
                if(this.matrix[row][nodeSearch].id === id)
                {
                    node = nodeSearch
                    break
                }
            }
        }
        if(this.matrix[row][node].writted)
        {
            return
        }
        pugRow += this.tabs(row) + this.matrix[row][node].nodeName.replace('#','')
        pugRow += ('#') + this.matrix[row][node].id
        pugRow += this.getAttributes(node, row)
        if(this.matrix[row][node].text)
        {
            pugRow += ` ${this.matrix[row][node].text}`
        }
        this.pugfile.push(pugRow)
        this.matrix[row][node].writted = true
        for(let child of this.matrix[row][node].children)
        {
            if(node !== null) 
            {
                this.printInformation(row+1, null, id = child)
            }
        }
    }

    getAttributes(node, row)
    {
        let attributes = ''
        let add = false
        for(const [key, value] of Object.entries(this.matrix[row][node].attributes))
        {
            if(add)
            {
                attributes += ','
            }
            if(key === 'id')
            {
                attributes += `automationid="${value}"`
            } else {
                attributes += `${key}="${value}"`
            }
            add = true
        }
        if(attributes !== '')
        {
            attributes = `(${attributes})`
        }
        return attributes
    }

    createPugFile()
    {
        this.pugfile = []
        for(let row = 0; row < this.matrix.length; row++)
        {
            for(let node = 0; node < this.matrix[row].length; node++)
            {
                this.printInformation(row, node)
            }
        }
    }
}

module.exports = { PugGenerator }