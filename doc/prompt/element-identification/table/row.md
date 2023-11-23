[Test Step]
In the row where name is john and age is 25, click the name of the wife

[Method]

* The table within web page section provide outermost scope of a table
* Based on the outermost table, identify it has approriate row headers that summarize its context. Output identification result to "isUniquerowHeaders"
* If there is no unique row header, add row header to original table with unique number such as 1,2,3.
* Output the row headers of outermost table to "rowHeaderList"
* Based on the test step and web page, identify the target element. Return result to targetElement
* Iterate row header that are identified by row headers until it find target element. If target element are found within the row, The output the row header will become the output of rowHeaderCell
* Test if the target element is a row header after table header update, return result to isTargetrowHeader.

[Output]  
Output result in JSON format.  
Following is a template.  
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

[Web Page]  
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
