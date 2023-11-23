[Test Step]
Click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'.

[Method]
* The web page section provides the outermost scope of a matrix.
* Based on the outermost matrix, identify if it has an appropriate vertical axis and categories associated with it.
* If there are no unique categories (headers) associated with the vertical axis, add categories to the original matrix with unique numbers such as 1, 2, 3.
* Output the vertical categories of the outermost table to "rowHeaderList".
* Based on the test step and web page, identify the target element. Return the result to targetElement.
* Iterate through vertical categories identified by vertical headers until the target element is found. If the target element is found within a category, output the vertical category to rowHeaderCell.
* Test if the target element is a vertical category after matrix category update, return the result to isTargetRowHeader.

[Output]
Output the result in JSON format.
Here is a template:
{
isUniqueRowHeaders: boolean,
rowHeaderList: string[],
rowHeaderCell: string,
isTargetRowHeader: boolean,
targetElement: string
}

"isUniqueRowHeaders" indicates if the table has unique row headers.
"rowHeaderList" represents an array of row header containers for the outermost table. The container is in "tag#id" format. In cases where there are no unique row headers, the container is in the format of numbers such as 1, 2, 3.
"rowHeaderCell" is derived from the prior value of the row header list. It represents the row headers that uniquely identify the row in the outermost table containing the target element. It is within rowHeaderList. The cell container is in "tag#id" format. In cases where there are no unique row headers, the container is in the format of numbers such as 1, 2, 3. Note that the rowHeaderCell should be the only row that contains the target element, not the target element itself.
"isTargetRowHeader" returns if the target element is within a row header container.
"targetElement" returns the id of the target element in tag#id format such as "div#100".

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
