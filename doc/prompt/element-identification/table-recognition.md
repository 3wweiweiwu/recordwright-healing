# Identify Element in Complex Grid or Table

- [Identify Element in Complex Grid or Table](#identify-element-in-complex-grid-or-table)
  - [System Prompt](#system-prompt)
  - [Element Container Classification](#element-container-classification)
    - [Intent for Element Container Classification](#intent-for-element-container-classification)
  - [User Message for Element Container Classification](#user-message-for-element-container-classification)
    - [Next Step](#next-step)
  - [Identification of Row Header and Column Header](#identification-of-row-header-and-column-header)
    - [Intent for Identification of Row Header and Column Header](#intent-for-identification-of-row-header-and-column-header)
    - [User Message for Initial Screening](#user-message-for-initial-screening)
    - [User Message for Cell Confirmation](#user-message-for-cell-confirmation)
    - [Next Step after Identification of Row Header and Column Header](#next-step-after-identification-of-row-header-and-column-header)
  - [Cell Identification](#cell-identification)
    - [Intent for Cell Identification](#intent-for-cell-identification)
    - [User Message for Cell Identification](#user-message-for-cell-identification)

## System Prompt

```text
you are a quality engineer try to identify web element in a web page based on test step, and output according to the spec. Following three section provide information for you. Web Page section contains a web page and layout in PUG template. Current div tags are placeholder, you need to evaluate the most suitable tag for each web element based on the textual and layout context. Test Step section provides test procedure. Understand test step context based on the web page. Output section provides rules you should follow to output result. Each section header is wrapped around square brackets []. 
```

## Element Container Classification

### Intent for Element Container Classification

- Find out element container, based on container type, conduct different classification
  - Table/Grid
  - Simple Form
- If result is in simple form, return target element, otherwise, conduct further prosessing

## User Message for Element Container Classification

```text
[Test Step]  
Click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'.   
[Output]   
Output result in JSON format. 
targetElementId returns id of target element in tag#id format such as "div#100". isTargetMatrixTableGrid returns if target element is in a table, or grid or matrix. From table, grid, matrix perspective, isTargetHeader returns if element is a row or column header. OutMostContainer is the out-most table or grid container for the target element described in test step in tag#id foramt such as div#100. Output a JSON result only.
{   
"isTargetHeader":boolean,   
"targetElementId":"",   
"isTargetMatrixTableGrid":boolean,
"OutMostContainer"string
}   
[Web Page]   
```

### Next Step

- End with target element
  - isTargetMatrixTableGrid = false
- Table Grid Recognition
  - isTargetMatrixTableGrid = true

## Identification of Row Header and Column Header

### Intent for Identification of Row Header and Column Header

- Narrow down the target element to the table cell
- Identify row and column header of target element
- Do this because target element may be incorrect because chatgpt cannot handle complex table structure
- Intent for Small Operation
- Initial Screening: Find out row and column header at high level
- Cell Confirmation: Iterate through target element in scenario where there is only 1 row header or column header

### User Message for Initial Screening

```text
[Test Step]
Click "Very High" was under the "Severity" heading.
[Output]
Output result in JSON format. Following is a template.
{
UpdatedStep:string,
rowHeaderCell:string,
columnHeaderCell:string
columnHeaderList:string[],
rowHeaderList:string[],
targetElementId:string
}

 "UpdatedStep" represents updated step for target element identification. Given known the table cell container, update the test step to remove relevant information that is used to identify data cell container. Keep relevant information to identify target element. Minimize the change to the test step and try to minimize the information from original step. If you reference table cell container in the updated step, reference that as "specified wrapper table cell" only.
"rowHeaderCell" represents the column that uniquely identifies the row in the out-most table containing the target element. The cell container is in "tag#id" format
"columnHeaderCell" represents the row that uniquely identifies the column in the out-most table containing the target element. The cell container is in "tag#id" format
"columnHeaderList" represents array of column header container for the out-most table. The container is in "tag#id" format
"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format
"targetElementId" represents id of target element in tag#id format such as "div#100".

[Web Page]
```

### User Message for Cell Confirmation

```text
Check again if this table have row and column header that can uniquely identify the elements row and column header.  If there is column or row header, double check prior output. If there is no row Header, we should add row header by ourself with unique number such as 1,2,3, and update rowHeaderCell with number index so that it match the index of row in the out-most table containing target element. If there is no column header, we should add row header by ourself with unique number such as 1,2,3, and update columnHeaderCell with number index so that it match the index of column in the out-most table containing target element.
Based on that, output updated JSON
```

### Next Step after Identification of Row Header and Column Header

- Minimum Iteration:1, Max Iteration: 3
- If column index and row index match for twice, confirm row/column index
- If target element is not in the column and row header, go to [Cell Identification](#cell-identification), and get next level table cell
- If table cell match target element, return target element. Otherwise, go to [Identification of Row Header and Column Header](#element-container-classification) and iterate on cell

## Cell Identification

### Intent for Cell Identification

- Get out-most table cell so that we can identify target element level by level

### User Message for Cell Identification

```text
[Test Step]
Click "Very High" was under the "Severity" heading.
[Output]
Output result in JSON format. Following is a template. Output JSON only. No reasoning.  
{  
OuterTableCell:string[][],  
}  

"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container is in "tag#id" format such as 

[Web Page] 
```
