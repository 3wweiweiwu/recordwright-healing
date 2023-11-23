[Test Step]
In, click the name of the brother

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
                        .col#38
                            .sub-table#39
                                .row#40
                                    .col#41 Brother
                                    .col#42 Michael
                                .row#43
                                    .col#44 Wife
                                    .col#45 Anna
