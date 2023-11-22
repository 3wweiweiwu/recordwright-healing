# Identify Element in Complex Grid or Table

- [Identify Element in Complex Grid or Table](#identify-element-in-complex-grid-or-table)
  - [System Prompt](#system-prompt)
  - [Element Container Classification](#element-container-classification)
    - [Intent for Element Container Classification](#intent-for-element-container-classification)
    - [User Message for Element Container Classification](#user-message-for-element-container-classification)
    - [Next Step](#next-step)
  - [Identify Next-Level Test Step](#identify-next-level-test-step)
    - [Intent for Identify Next-Level Test Step](#intent-for-identify-next-level-test-step)
    - [Prompt template for Identify Next-Level Test Step](#prompt-template-for-identify-next-level-test-step)
    - [Note](#note)
  - [Identification of Cell Index](#identification-of-cell-index)
    - [Intent for Identification of Row Header and Column Header](#intent-for-identification-of-row-header-and-column-header)
    - [User Message for Initial Screening](#user-message-for-initial-screening)
    - [User Message for Cell Confirmation](#user-message-for-cell-confirmation)
      - [Intent](#intent)
      - [Prompt](#prompt)
      - [Logic](#logic)
    - [Cell List](#cell-list)
      - [Intent for Cell List](#intent-for-cell-list)
      - [Prompt for Cell List](#prompt-for-cell-list)
    - [Next Step after Identification of Row Header and Column Header](#next-step-after-identification-of-row-header-and-column-header)

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

### User Message for Element Container Classification

```text
[Test Step]  
Click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'.   
[Output]   
Output result in JSON format. 
targetElementId returns id of target element in tag#id format such as "div#100". isTargetMatrixTableGrid returns if target element is in a table, or grid or matrix. OutMostContainer is the out-most table or grid container for the target element described in test step in tag#id foramt such as div#100. Output a JSON result only.
{   
"targetElementId":"",   
"isTargetMatrixTableGrid":boolean,
"OutMostContainer"string
}   
[Web Page]   
```

### Next Step

- isTargetMatrixTableGrid = false
  - END. Return target element
- isTargetMatrixTableGrid = true
  - Identify Next-Level Test Step
  - Identification of Cell Index
  
## Identify Next-Level Test Step

### Intent for Identify Next-Level Test Step

- Get updated step for upcoming row/column header identification

### Prompt template for Identify Next-Level Test Step

```text
[Test Step]  
Click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'.
[Output]
Output result in JSON format.
{
UpdatedStep:string
}
 "UpdatedStep" represents the updated step for target element identification and remove relevant information that is being used to identify the outermost table container div#500. Test step should only be updated if it contains information used to identify the outermost container. And only update the portion that is relevant to outermost element identification. If you reference the outmost table cell container in the updated step, reference that as "specified wrapper table cell" only. 

 [Web Page]   
```

### Note

- div#500: this inforamtion is coming from prior element container classification

## Identification of Cell Index

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
rowHeaderCell:string,  
columnHeaderCell:string  
columnHeaderList:string[],  
rowHeaderList:string[],  
targetElementId:string,  
"isTargetColumnHeader":boolean,     
"isTargetRowHeader":boolean  
}  
"rowHeaderCell" represents the column that uniquely identifies the row in the out-most table containing the target element. The cell container is in "tag#id" format  
"columnHeaderCell" represents the row that uniquely identifies the column in the out-most table containing the target element. The cell container is in "tag#id" format  
"columnHeaderList" represents array of column header container for the out-most table. The container is in "tag#id" format  
"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format  
"targetElementId" represents id of target element in tag#id format such as "div#100".  
" isTargetRowHeader" returns if target element is a within a row header container.  
" isTargetColumnHeader" returns if target element is within a column header container  

[Web Page]
```

### User Message for Cell Confirmation

#### Intent

In the table where either row header or column header is missing, it's difficult for gpt to classify element as a table. In this case, add this step will help GPT to manually add row or column header and help gpt to automatically update the table context

| Father | Tim  |
| ------ | ---- |
| Mother | Lynn |
| Son    | Alex |

#### Prompt

```text
Check again if this table have row and column header that can uniquely identify the elements row and column header.  If there is column or row header, double check prior output. If there is no row Header, we should add row header by ourself with unique number such as 1,2,3, and update rowHeaderCell with number index so that it match the index of row in the out-most table containing target element. If there is no column header, we should add row header by ourself with unique number such as 1,2,3, and update columnHeaderCell with number index so that it match the index of column in the out-most table containing target element.
Based on that, output updated JSON
```

#### Logic

- Minimum Iteration:1, Max Iteration: 3
- If column index and row index match for twice, confirm row/column index

### Cell List

#### Intent for Cell List

- Get out-most table cell so that we can identify target element level by level

#### Prompt for Cell List

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

### Next Step after Identification of Row Header and Column Header

- If target element is not in the column and row header:
  - go to [Cell List](#cell-list), and get next level table cell
  - Goto [Identify Next Level Test Step](#identify-next-level-test-step)
  - If table cell match target element,
    - return target element.
  - If table cell different from target element
    - Go to [Element Container Classification](#element-container-classification)
- If target element is in row or column header, just use the cell as-is
