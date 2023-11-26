[Test Step]
In the row name is john and age is 40 click the name of the wife

[Method]

* The web page section provide outermost scope of a matrix
* Based on the outermost matrix, identify it has approriate horizontal axis and categories associated with that
* If there is no unique category(headers) associated with horizontal axis, add category to original matrix with unique number such as 1,2,3.
* Output the horizontal categories of outermost table to "columnHeaderList"
* Based on the test step and web page, identify the target element. Return result to targetElement.
* Iterate horizontal category that are identified by horizontal categories until it find target element. If target element are found within the category, output the horizontal category to columnHeaderCell
* Test if the target element is a horizontal category after matrix category update, return result to isTargetColumnHeader.

[Output]  
Output result in JSON format.  
Following is a template.  
{  
isUniqueColumnHeaders: boolean,  
columnHeaderList:string[],  
columnHeaderCell:string,
isTargetColumnHeader:boolean,
targetElement:string
}  
"isUniqueColumnHeaders" represents if the table has unique column header,
"columnHeaderList" represents array of column header container for the out-most table. The container is in "tag#id" format. In case there is no unique column header, the container is in the format of number such as 1,2,3  
"columnHeaderCell" is coming from prior value of column header list. It represents the column headers that uniquely identifies the column in the out-most table containing the target element. It is within columnHeaderList. The cell container is in "tag#id" format . In case there is no unique column header, the container is in the format of number such as 1,2,3. Note that the columnHeaderCell should be the only column that contains the target element, not the target element itself.  
"isTargetColumnHeader" returns if target element is within a column header container
targetElement returns id of target element in tag#id format such as "div#100".

[Web Page]
```pug
.table#2

    .table-body#9
        .row.bg-primary#10
            .col#11 John
            .col#12 25
            .col#13 john@example.com
            .col#14
                .sub-table#15
                    .row#16
                        .col#17 Daughter
                        .col#18 Emily
                    .row#19
                        .col#20 Wife
                        .col#21 Lindsy
        .row.bg-secondary#22
            .col#23 Jane
            .col#24 30
            .col#25 jane@example.com
            .col#26
                .sub-table#27
                    .row#28
                        .col#29 Son
                        .col#30 Jack
                    .row#31
                        .col#32 Husband
                        .col#33 Sam
        .row.bg-primary#34
            .col#35 John
            .col#36 40
            .col#37 samuel@example.com
            .col#38
                .sub-table#39
                    .row#40
                        .col#41 Brother
                        .col#42 Michael
                    .row#43
                        .col#44 Wife
                        .col#45 Anna
        .row.bg-secondary#46
            .col#47 Lisa
            .col#48 28
            .col#49 lisa@example.com
            .col#50
                .sub-table#51
                    .row#52
                        .col#53 Sister
                        .col#54 Sarah
                    .row#55
                        .col#56 Mother
                        .col#57 Maggie
        .row.bg-primary#58
            .col#59 Daniel
            .col#60 35
            .col#61 daniel@example.com
            .col#62
                .sub-table#63
                    .row#64
                        .col#65 Father
                        .col#66 John Sr.
                    .row#67
                        .col#68 Daughter
                        .col#69 Danielle
        .row.bg-secondary#70
            .col#71 Maggie
            .col#72 60
            .col#73 maggie@example.com
            .col#74
                .sub-table#75
                    .row#76
                        .col#77 Daughter
                        .col#78 Lisa
                    .row#79
                        .col#80 Son
                        .col#81 Chris
        .row.bg-primary#82
            .col#83 Chris
            .col#84 32
            .col#85 chris@example.com
            .col#86
                .sub-table#87
                    .row#88
                        .col#89 Mother
                        .col#90 Maggie
                    .row#91
                        .col#92 Brother
                        .col#93 Luke
    .table-header#3
        .row#4
            .col#5 Name
            .col#6 Age
            .col#7 Email
            .col#8 Family Member
```
