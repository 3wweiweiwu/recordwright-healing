[Test Step]  
Click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'.
[Method]

1. Given div#207 a container in web page
2. Check if there is any portion of the test step is being used to identify the container mentioned in step 1.
3. If answer to step 2 is yes, update the test step and remove relevant information that is being used to identify container mentioned in step 1. Output updated test step to UpdatedStep.
4. If answer to prior step 2 is no, Output original test step to UpdatedStep

[Output]
Output result in JSON format.
{
UpdatedStep:string
}
 "UpdatedStep" represents the updated step for target element identification and remove relevant information that is being used to identify the outermost table container. If you reference the outmost table cell container in the updated step, reference that as "specified wrapper table cell" only.

 [Web Page]

```PUG
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
