[Test Step]
 N/A

[Method]

1. The PUG in web page section provide scope of a matrix
2. From top to bottom, iterate through each row of the outermost matrix, including the column header row. For each row, create an array to store the identifiers of the individual cells or the outermost container of sub-components (like a sub-matrix) within the row. These identifiers should correspond to the specific outermost row and column header. If a column has a sub-component (like a sub-matrix), only include the identifier of the outermost container of the sub-component in the array. If a column has a sub-component (like a sub-matrix), do not include data cells within the sub-component in the array. Also, include the identifiers of the elements in the column header row in the array. We repeat this process for all rows in the matrix, including the header row. By the end of this step, we should have an array for each row in the matrix, including the column header row. Each of these arrays should contain the identifiers of the data cells or outermost container, in the order of the column headers.
3. If there is row of column header in the result of step 2, move the row to the right index where it appears visually in the matrix.  
4. Ouptut result from step 3 to cellList

 [Output]
 Output result in JSON format
 {{
   cellList:string[][]
 }}
 "cellList" represents outer-most matrix in array of array format. The outer array represents array of rows. The inner array represents array cell container in the row. The cell container follows "tag#id" strictly. For example: div#5.

 [Web Page]

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
