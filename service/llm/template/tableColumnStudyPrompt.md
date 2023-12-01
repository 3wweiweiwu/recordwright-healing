[Test Step]
{testStep}

[Method]

* The table within web page section provide outermost scope of a table
* Based on the outermost table, identify it has approriate column headers that summarize its context based on general visualization. In case there is sub-table or sub-matrix in the column, treat the whole sub-table and sub-matrix as one column.
* Output identification result to "isUniquecolumnHeaders"
* If there is no appropriate column header, add column header to original table with unique number such as 1,2,3.
* Output the column headers of outermost table to "columnHeaderList"
* Based on the test step and web page, identify the target element. Return result to targetElement.
* Iterate column header that are identified by column headers until it find target element. If target element are found within the column, The output the column header will become the output of columnHeaderCell
* Test if the target element is a column header after table header update, return result to isTargetColumnHeader.

[Output]  
Output result in JSON format.
Following is a template.
{{
isUniqueColumnHeaders: boolean,
columnHeaderList:string[],
columnHeaderCell:string,
isTargetColumnHeader:boolean,
targetElement:string
}}
"isUniqueColumnHeaders" represents if the table has column headers different from each other and provide genearl summaryto the content of its column.
"columnHeaderList" represents array of column header container for the out-most table. The container is in "tag#id" format. In case there is no appropriate column header, the container is in the format of number such as 1,2,3  
"columnHeaderCell" is coming from prior value of column header list. It represents the column headers that identifies the column in the out-most table containing the target element. It is within columnHeaderList. The cell container is in "tag#id" format . In case there is no column header that is generally summarize the column context, the container is in the format of number such as 1,2,3. Note that the columnHeaderCell should be the only column that contains the target element, not the target element itself.  
"isTargetColumnHeader" returns if target element is within a column header container
targetElement returns id of target element in tag#id format such as "div#100".

[Web Page]
{webPage}
