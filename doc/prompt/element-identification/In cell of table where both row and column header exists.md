# Identify Element in Complex Grid where column and row header both exists
## Scenario
* isTargetHeader==false
* isTargetMatrixTableGrid==true
* length of column header>0
* length of row header>0
## Process
1. [Target Element Scan]: Conduct initial target element identification.
2. Test scenario and see if isTargetHeader==false and isTargetMatrixTableGrid==true
3. Extract inner HTML of outer most table
4. Get data cell table view and updated step
5. [Data Grid Identification]: Based on cell table from step 2, target column, target row, column header and row header, identify data cell where target element is located
6. Repeat step 1 till isTargetHeader=false and isTargetMatrixTableGrid==false

# Target Element Scan
## System Prompt
you are a quality engineer try to identify web element in a web page based on test step, and output according to the spec. Following three section provide information for you. Web Page section contains a web page and layout in PUG template. Current div tags are placeholder, you need to evaluate the most suitable tag for each web element based on the textual and layout context. Test Step section provides test procedure. Understand test step context based on the web page. Output section provides rules you should follow to output result. Each section header is wrapped around square brackets []. 

## User Message
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
&nbsp;      
extends layout      
block content      
  div.row.class1#100      
    div.class2 Issues by Severity      
    div.class3      
      svg.class4.class5      
      div.class6#101 Failure      
    div.class3      
      svg.class4.class5      
      div.class6#102 Anoamaly      
    div.class3      
      svg.class4.class5      
      div.class6#103 Other      
  div#500.class7.class8      
    div.row      
      div.class9 Criticality      
      div.class8-grid      
        div       
      
          div.row      
            div.class10.class14.ng-star-inserted Very High      
            div#200.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#104 --      
              div.row.class13      
                svg      
                div#105 --      
              div.row.class13      
                svg      
                div#106 --      
            div#201.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#107 --      
              div.row.class13      
                svg      
                div#108 --      
              div.row.class13      
                svg      
                div#109 --      
            div#202.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#110 --      
              div.row.class13      
                svg      
                div#111 --      
              div.row.class13      
                svg      
                div#112 --      
            div#203.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#113 --      
              div.row.class13      
                svg      
                div#114 --      
              div.row.class13      
                svg      
                div#115 --      
          div.row      
            div.class10.class14.ng-star-inserted High      
            div#204.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#116 --      
              div.row.class13      
                svg      
                div#117 --      
              div.row.class13      
                svg      
                div#118 --      
            div#205.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#119 --      
              div.row.class13      
                svg      
                div#120 --      
              div.row.class13      
                svg      
                div#121 --      
            div#206.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#122 --      
              div.row.class13      
                svg      
                div#123 --      
              div.row.class13      
                svg      
                div#124 --      
            div#207.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#125 --      
              div.row.class13      
                svg      
                div#126 --      
              div.row.class13      
                svg      
                div#127 --      
          div.row      
            div.class10.class14.ng-star-inserted Medium      
            div#208.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#128 --      
              div.row.class13      
                svg      
                div#129 --      
              div.row.class13      
                svg      
                div#130 --      
            div#209.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#128 --      
              div.row.class13      
                svg      
                div#129 --      
              div.row.class13      
                svg      
                div#130 --      
            div#210.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#131 --      
              div.row.class13      
                svg      
                div#132 6      
              div.row.class13      
                svg      
                div#133 --      
            div#211.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#134 --      
              div.row.class13      
                svg      
                div#135 1      
              div.row.class13      
                svg      
                div#136 --      
          div.row      
            div.class10.class14.ng-star-inserted Low      
            div#212.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#137 --      
              div.row.class13      
                svg      
                div#138 --      
              div.row.class13      
                svg      
                div#139 --      
            div#213.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#140 --      
              div.row.class13      
                svg      
                div#141 --      
              div.row.class13      
                svg      
                div#142 --      
            div#214.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#143 --      
              div.row.class13      
                svg      
                div#144 --      
              div.row.class13      
                svg      
                div#145 --      
            div#215.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#146 --      
              div.row.class13      
                svg      
                div#147 --      
              div.row.class13      
                svg      
                div#148 --      
          div.row      
            div.class10.class14.ng-star-inserted Very Low      
            div#216.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#149 --      
              div.row.class13      
                svg      
                div#150 --      
              div.row.class13      
                svg      
                div#151 --      
            div#217.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#152 --      
              div.row.class13      
                svg      
                div#153 --      
              div.row.class13      
                svg      
                div#154 --      
            div#218.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#155 --      
              div.row.class13      
                svg      
                div#156 --      
              div.row.class13      
                svg      
                div#157 --      
            div#219.ng-star-inserted.class12      
              div.row.class13      
                svg      
                div#158 --      
              div.row.class13      
                svg      
                div#159 --      
              div.row.class13      
                svg      
                div#160 --                  
          div.row      
            div white space      
            div.class10.class8.class11.ng-star-inserted Low      
            div.class10.class8.class11.ng-star-inserted Medium      
            div.class10.class8.class11.ng-star-inserted High      
            div.class10.class8.class11.ng-star-inserted Very High          
    div.class15 Severity      
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


# Data Grid Identification
## System Prompt
The same as prior one

## User Message
[Test Step]  
Click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'.    
[Output]
Output result in JSON format. Following is a template. Output JSON only. No reasoning.
{
OuterTableCell:string[][],
UpdatedStep:string
}

"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container is in "tag#id" format 
such as "div#100". The output do not include row and column header.
"UpdatedStep" represents updated step for target element identification. Given known table cell container, update the test step to remove relevant information that is used to identify data cell container. Keep other relevant information to identify target element. Do not identify element based on id or class information. 

[Web Page]
  div.row
   div.heatmap-body-heading Criticality
   div.heatmap-body-grid
    div 
     div.row
      div white space
      div.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Low
      div.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Medium
      div.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted High
      div.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Very High    
     div.row
      div.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Very High
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
      div.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted High
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
      div.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Medium
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
      div.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Low
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
      div.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Very Low
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


  div.heatmap-footer Severity

## Special Instruction of User Prompt
* Web Page should be children of OutMostContainer
* 