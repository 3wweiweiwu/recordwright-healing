const fs = require('fs').promises;

class PugGenerator 
{
    pugfile = ''
    constructor()
    {
    }

    async getMatrix()
    {
        const matrixFile = await fs.readFile('./original.json');
        //this.matrix = JSON.parse(matrixFile).atomicMatrix;
        this.matrix = JSON.parse(matrixFile);
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
        if(id)
        {
            // in case that have child but there is no other row, it shouldnt happen but just in case
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
        this.pugfile += this.tabs(row) + this.matrix[row][node].nodeName.replace('#','')
        let attributes = ''
        let add = false
        for(const [key, value] of Object.entries(this.matrix[row][node].attributes))
        {
            if(add)
            {
                attributes += ', '
            }
            attributes += `${key}="${value}"`
            add = true
        }
        if(attributes !== '')
        {
            this.pugfile += `(${attributes})`
        }
        if(this.matrix[row][node].text)
        {
            //this.pugfile += ` ${this.matrix[row][node].text.replaceAll('\n','')}`
            this.pugfile += ` ${this.matrix[row][node].text.replaceAll('\n','').replaceAll('\t','')}`
            //I used the "" to show th \t in the html, but it deoesn't works, maybe we clould delete the "" and the \t
        }
        this.pugfile += '\n'
        this.matrix[row][node].writted = true
        for(let child of this.matrix[row][node].children)
        {
            //for some reason some thimes cleanup the row and enter here, that is way I use this
            if(node !== null) 
            {
                this.printInformation(row+1, null, id = child)
            }
        }
    }

    async createPugFile()
    {
        await this.getMatrix()
        console.log(this.matrix)
        this.pugfile = ''
        for(let row = 0; row < this.matrix.length; row++)
        {
            for(let node = 0; node < this.matrix[row].length; node++)
            {
                this.printInformation(row, node)
            }
            
        }
        fs.writeFile('./testOriginal.pug', this.pugfile, err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
        });
    }
}

module.exports = PugGenerator