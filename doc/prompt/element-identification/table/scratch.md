you are a developer write Javascript code based on existing code snippet based on the instruction.  Following four section provide information for you. Code section contains a javascript code. Method section provides rules you should follow to generate output. Follow the method section and output your thought process about each method step by step. Each section header is wrapped around square brackets [].

[Method]
* Analyze the class, in the code section, create a class with similar pattern.
* Name the new class talbeRowStudyResult
* Add proper jsdoc comment
* Object Schema:
{  
isUniqueRowHeaders: boolean,  
rowHeaderList:string[],  
rowHeaderCell:string,
isTargetRowHeader:boolean,
targetElement:string
}  
"isUniqueRowHeaders" represents if the table has unique row header,
"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format. In case there is no unique row header, the container is in the format of number such as 1,2,3  
"rowHeaderCell" is coming from prior value of row header list. It represents the row headers that uniquely identifies the row in the out-most table containing the target element. It is within rowHeaderList. The cell container is in "tag#id" format . In case there is no unique row header, the container is in the format of number such as 1,2,3. Note that the rowHeaderCell should be the only row that contains the target element, not the target element itself.  
"isTargetRowHeader" returns if target element is within a row header container
targetElement returns id of target element in tag#id format such as "div#100".

[Code]
/**

* Represents a study of table columns.
 */
class TableColumnStudy {
    /**
  * Creates a new instance of TableColumnStudy.
  * @param {boolean} isUniqueColumnHeaders - Indicates if the table has unique column headers.
  * @param {string[]} columnHeaderList - Array of column header containers for the outermost table.
  * @param {string} columnHeaderCell - The column header that uniquely identifies the column containing the target element.
  * @param {boolean} isTargetColumnHeader - Indicates if the target element is within a column header container.
  * @param {string} targetElement - The ID of the target element in "tag#id" format.
     */
    constructor(isUniqueColumnHeaders, columnHeaderList, columnHeaderCell, isTargetColumnHeader, targetElement) {
        this.isUniqueColumnHeaders = isUniqueColumnHeaders;
        this.columnHeaderList = columnHeaderList;
        this.columnHeaderCell = columnHeaderCell;
        this.isTargetColumnHeader = isTargetColumnHeader;
        this.targetElement = targetElement;
    }

    /**
  * Parses the JSON object and creates a new instance of TableColumnStudy.
  * @param {object} jsonObject - The JSON object to parse.
  * @returns {TableColumnStudy} - The parsed TableColumnStudy instance.
     */
    static parseFromJSON(jsonObject) {
        const {
            isUniqueColumnHeaders,
            columnHeaderList,
            columnHeaderCell,
            isTargetColumnHeader,
            targetElement
        } = jsonObject;

        return new TableColumnStudy(
            isUniqueColumnHeaders,
            columnHeaderList,
            columnHeaderCell,
            isTargetColumnHeader,
            targetElement
        );
    }
}

module.exports = TableColumnStudy
