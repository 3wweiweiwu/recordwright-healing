# Identify Element in Complex Grid where column and row header both exists
## Scenario
* isTargetHeader==false
* isTargetMatrixTableGrid==true
* length of column header>0
* length of row header>0
## Process
1. **Target Element Scan**: Conduct initial target element identification.
2. Test scenario and see if isTargetHeader==false and isTargetMatrixTableGrid==true
3. Extract inner HTML of outer most table
4. Get data cell table view and updated step
5. **Data Grid Identification**: Based on cell table from step 2, target column, target row, column header and row header, identify data cell where target element is located
6. update remove reference in "specified wrapper table cell" in the test step
7. **Data Grid Identification Iteration**: Iterate process till it gives right answer
8. Repeat step 1 till isTargetHeader=false and isTargetMatrixTableGrid==false or targetElementId=Identified Element from Outer Cell

# Target Element Scan
## System Prompt
```
you are a quality engineer try to identify web element in a web page based on test step, and output according to the spec. Following three section provide information for you. Web Page section contains a web page and layout in PUG template. Current div tags are placeholder, you need to evaluate the most suitable tag for each web element based on the textual and layout context. Test Step section provides test procedure. Understand test step context based on the web page. Output section provides rules you should follow to output result. Each section header is wrapped around square brackets []. 
```

## User Message
```
[Test Step]  
Click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'.   
[Output]   
Output result in JSON format. targetElementId returns id of target element in tag#id format such as "div#100". isTargetMatrixTableGrid returns if target element is in a table, or grid or matrix. From table, grid, matrix perspective, isTargetHeader returns if element is a row or column header.  ColumnsHeaders is an array that represents the text names of the columns. TargetColumnName is the text of the column name where the target cell is located.  Perform following operation and output a JSON result only. OutMostContainer is the out-most table or grid container for the target element described in test step in tag#id foramt such as div#100.
{   
"TargetRowName":""   
"ColumnsHeaders":[],   
"rowHeaders":[]   
"TargetColumnName": "",   
"isTargetHeader":boolean,   
"targetElementId":"",   
"isTargetMatrixTableGrid":boolean,
"OutMostContainer"string
}   
&nbsp;   
[Web Page]   
//- ChatGPT, you are a quality engineer try to identify web element in a web page based on test step. Following two section provide information for you. Web Page section contains a web page and layout in PUG template. Current div tags are placeholder, you need to evaluate the most suitable tag for each web element based on the textual and layout context. Test Step section provides test procedure. Each section header is wrapped around square brackets []. 
//- [Test Step]
//- Click the cell where critiality and Severity are both very high.

//- ChatGPT, describe following web page in PUG template. Is there table or matrix in there? If so, whatare column headers and row headers? What's the container element id of the cell where critiality and Severity are both very high?

//- [Web Page]
extends layout
block content

 div.row.heatmap-heading#100
  div.heatmap-heading___title Issues by Severity
  div.heatmap-heading___alert
   svg.heatmap-heading-alert__icon.material-icons.maerial-icons-outlined
   div.heatmap-heading-alert__caption#101 Failure
  div.heatmap-heading___alert
   svg.heatmap-heading-alert__icon.material-icons.maerial-icons-outlined
   div.heatmap-heading-alert__caption#102 Anoamaly
  div.heatmap-heading___alert
   svg.heatmap-heading-alert__icon.material-icons.maerial-icons-outlined
   div.heatmap-heading-alert__caption#103 Other
 div#500.heatmap-content.heatmap-body
  div.row
   div.heatmap-body-heading Criticality
   div.heatmap-body-grid
 div 
  div.row
   div#505.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Very High
   div#200.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#104 --
    div.row.heatmap-card-item
  svg
  div#105 --
    div.row.heatmap-card-item
  svg
  div#106 --
   div#201.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#107 --
    div.row.heatmap-card-item
  svg
  div#108 --
    div.row.heatmap-card-item
  svg
  div#109 --
   div#202.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#110 --
    div.row.heatmap-card-item
  svg
  div#111 --
    div.row.heatmap-card-item
  svg
  div#112 --
   div#203.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#113 --
    div.row.heatmap-card-item
  svg
  div#114 --
    div.row.heatmap-card-item
  svg
  div#115 --
  div.row
   div#501.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted High
   div#204.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#116 --
    div.row.heatmap-card-item
  svg
  div#117 --
    div.row.heatmap-card-item
  svg
  div#118 --
   div#205.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#119 --
    div.row.heatmap-card-item
  svg
  div#120 --
    div.row.heatmap-card-item
  svg
  div#121 --
   div#206.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#122 --
    div.row.heatmap-card-item
  svg
  div#123 --
    div.row.heatmap-card-item
  svg
  div#124 --
   div#207.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#125 --
    div.row.heatmap-card-item
  svg
  div#126 --
    div.row.heatmap-card-item
  svg
  div#127 --
  div.row
   div#502.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Medium
   div#208.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#128 --
    div.row.heatmap-card-item
  svg
  div#129 --
    div.row.heatmap-card-item
  svg
  div#130 --
   div#209.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#128 --
    div.row.heatmap-card-item
  svg
  div#129 --
    div.row.heatmap-card-item
  svg
  div#130 --
   div#210.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#131 --
    div.row.heatmap-card-item
  svg
  div#132 6
    div.row.heatmap-card-item
  svg
  div#133 --
   div#211.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#134 --
    div.row.heatmap-card-item
  svg
  div#135 1
    div.row.heatmap-card-item
  svg
  div#136 --
  div.row
   div#503.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Low
   div#212.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#137 --
    div.row.heatmap-card-item
  svg
  div#138 --
    div.row.heatmap-card-item
  svg
  div#139 --
   div#213.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#140 --
    div.row.heatmap-card-item
  svg
  div#141 --
    div.row.heatmap-card-item
  svg
  div#142 --
   div#214.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#143 --
    div.row.heatmap-card-item
  svg
  div#144 --
    div.row.heatmap-card-item
  svg
  div#145 --
   div#215.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#146 --
    div.row.heatmap-card-item
  svg
  div#147 --
    div.row.heatmap-card-item
  svg
  div#148 --
  div.row
   div#504.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Very Low
   div#216.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#149 --
    div.row.heatmap-card-item
  svg
  div#150 --
    div.row.heatmap-card-item
  svg
  div#151 --
   div#217.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#152 --
    div.row.heatmap-card-item
  svg
  div#153 --
    div.row.heatmap-card-item
  svg
  div#154 --
   div#218.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#155 --
    div.row.heatmap-card-item
  svg
  div#156 --
    div.row.heatmap-card-item
  svg
  div#157 --
   div#219.ng-star-inserted.heatmap-card-heatmap-card--p3
    div.row.heatmap-card-item
  svg
  div#158 --
    div.row.heatmap-card-item
  svg
  div#159 --
    div.row.heatmap-card-item
  svg
  div#160 --   
  div.row
   div#600 white space
   div#601.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Low
   div#602.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Medium
   div#603.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted High
   div#604.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Very High 

  div.heatmap-footer Severity

 style
  .row
   display: flex
   flex-direction: row
  .column
   display: flex
   flex-direction: column
  .grid 
   display: grid
   grid-template-columns: repeat(5, 1fr)
```

# Data Grid Identification
## System Prompt
The same as prior one

## User Message
```
[Test Step]  
Click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'. 
[Output]
Output result in JSON format. 
{
UpdatedStep:string,
OuterTableCell:string[][],
rowHeaderCell:string,
columnHeaderCell:string
columnHeaderList:string[],
rowHeaderList:string[],
targetElementId:string
}

 "UpdatedStep" represents updated step for target element identification. Given known the table cell container, update the test step to remove relevant information that is used to identify data cell container. Keep relevant information to identify target element. Minimize the change to the test step and try to minimize the information from original step. If you reference table cell container in the updated step, reference that as "specified wrapper table cell" only.

"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container is in "tag#id" format such as "div#100". The output do not include row and column header.
"rowHeaderCell" represents the column that uniquely identifies the row in the out-most table containing the target element. The cell container is in "tag#id" format
"columnHeaderCell" represents the row that uniquely identifies the column in the out-most table containing the target element. The cell container is in "tag#id" format
"columnHeaderList" represents array of column header container for the out-most table. The container is in "tag#id" format
"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format
"targetElementId" represents id of target element in tag#id format such as "div#100".

[Web Page]
 div#500.heatmap-content.heatmap-body
  div.row
   div.heatmap-body-heading Criticality
   div.heatmap-body-grid
    div 
     div.row
      div#505.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Very High
      div#200.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#104 --
       div.row.heatmap-card-item
        svg
        div#105 --
       div.row.heatmap-card-item
        svg
        div#106 --
      div#201.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#107 --
       div.row.heatmap-card-item
        svg
        div#108 --
       div.row.heatmap-card-item
        svg
        div#109 --
      div#202.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#110 --
       div.row.heatmap-card-item
        svg
        div#111 --
       div.row.heatmap-card-item
        svg
        div#112 --
      div#203.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#113 --
       div.row.heatmap-card-item
        svg
        div#114 --
       div.row.heatmap-card-item
        svg
        div#115 --
     div.row
      div#501.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted High
      div#204.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#116 --
       div.row.heatmap-card-item
        svg
        div#117 --
       div.row.heatmap-card-item
        svg
        div#118 --
      div#205.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#119 --
       div.row.heatmap-card-item
        svg
        div#120 --
       div.row.heatmap-card-item
        svg
        div#121 --
      div#206.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#122 --
       div.row.heatmap-card-item
        svg
        div#123 --
       div.row.heatmap-card-item
        svg
        div#124 --
      div#207.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#125 --
       div.row.heatmap-card-item
        svg
        div#126 --
       div.row.heatmap-card-item
        svg
        div#127 --
     div.row
      div#502.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Medium
      div#208.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#128 --
       div.row.heatmap-card-item
        svg
        div#129 --
       div.row.heatmap-card-item
        svg
        div#130 --
      div#209.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#128 --
       div.row.heatmap-card-item
        svg
        div#129 --
       div.row.heatmap-card-item
        svg
        div#130 --
      div#210.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#131 --
       div.row.heatmap-card-item
        svg
        div#132 6
       div.row.heatmap-card-item
        svg
        div#133 --
      div#211.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#134 --
       div.row.heatmap-card-item
        svg
        div#135 1
       div.row.heatmap-card-item
        svg
        div#136 --
     div.row
      div#503.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Low
      div#212.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#137 --
       div.row.heatmap-card-item
        svg
        div#138 --
       div.row.heatmap-card-item
        svg
        div#139 --
      div#213.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#140 --
       div.row.heatmap-card-item
        svg
        div#141 --
       div.row.heatmap-card-item
        svg
        div#142 --
      div#214.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#143 --
       div.row.heatmap-card-item
        svg
        div#144 --
       div.row.heatmap-card-item
        svg
        div#145 --
      div#215.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#146 --
       div.row.heatmap-card-item
        svg
        div#147 --
       div.row.heatmap-card-item
        svg
        div#148 --
     div.row
      div#504.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Very Low
      div#216.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#149 --
       div.row.heatmap-card-item
        svg
        div#150 --
       div.row.heatmap-card-item
        svg
        div#151 --
      div#217.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#152 --
       div.row.heatmap-card-item
        svg
        div#153 --
       div.row.heatmap-card-item
        svg
        div#154 --
      div#218.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#155 --
       div.row.heatmap-card-item
        svg
        div#156 --
       div.row.heatmap-card-item
        svg
        div#157 --
      div#219.ng-star-inserted.heatmap-card-heatmap-card--p3
       div.row.heatmap-card-item
        svg
        div#158 --
       div.row.heatmap-card-item
        svg
        div#159 --
       div.row.heatmap-card-item
        svg
        div#160 --      
     div.row
      div#600 white space
      div#601.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Low
      div#602.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Medium
      div#603.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted High
      div#604.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Very High    

  div.heatmap-footer Severity

```
## Special Instruction of User Prompt
* Web Page should be children of OutMostContainer

## Data Grid Identification Iteration
### Sample
```
{
  "UpdatedStep": "Click the name of the wife in the specified wrapper table cell",
  "OuterTableCell": [
    ["div#11", "div#12", "div#13", "div#14"],
    ["div#23", "div#24", "div#25", "div#26"],
    ["div#35", "div#36", "div#37", "div#38"],
    ["div#47", "div#48", "div#49", "div#50"],
    ["div#59", "div#60", "div#61", "div#62"],
    ["div#71", "div#72", "div#73", "div#74"],
    ["div#83", "div#84", "div#85", "div#86"]
  ],
  "rowHeaderCell": "div#11",
  "columnHeaderCell": "div#8",
  "columnHeaderList": ["div#5", "div#6", "div#7", "div#8"],
  "rowHeaderList": ["div#11", "div#23", "div#35", "div#47", "div#59", "div#71", "div#83"]
}
```
### Identification Point
* #row in outer table cell against length of row list
* #column in outer table cell against length of column list
* rowHeaderCell within columnHeader List
* columnHeaderCell within columnHeaderList
* The column or row size is equal or less than 2 because it's difficult to categorize as table
* Do it anyway....

### Prompt

Check again if this table have row and column header that can uniquely identify the elements row and column header.  If there is column or row header, ensure the length of columnHeaderList or rowHeaderList match OuterTableCell. If there is no row Header or column Header, we should add row header by ourselves with unique number such as 1,2,3. Respective rowHeaderCell and columnHeaderCell should be a number. 

Based on that, update JSON output. 