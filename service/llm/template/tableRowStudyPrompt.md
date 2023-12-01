[Test Step]
{testStep}

[Method]

* The table within web page section provide outermost scope of a table
* Based on the outermost table, identify it has approriate row headers that summarize its context based on general visualization. In case there is sub-table or sub-matrix in the row, treat the whole sub-table and sub-matrix as one datacell in row.
* Output identification result to "isUniquerowHeaders"
* If there is no appropriate row header, assign a unique number to each row include in the outermost table as a row header, such as 1 for the first row, 2 for the second row, and so on. The assignment of these numbers should correspond to the order of the rows of outermost table.
* if isUniquerowHeaders is false, identify the row of column header. Remove that row from table.
* Output the row headers of outermost table to "rowHeaderList"
* Based on the test step and web page, identify the target element. Return result to targetElement
* Iterate row header that are identified by row headers until it find target element. If target element are found within the row, The output the row header will become the output of rowHeaderCell
* Test if the target element is a row header after table header update, return result to isTargetrowHeader.

[Output]  
Output result in JSON format.
Following is a template.
{{
isUniqueRowHeaders: boolean,  
rowHeaderList:string[],  
rowHeaderCell:string,
isTargetRowHeader:boolean,
targetElement:string
}}
"isUniqueRowHeaders" represents if the table has row headers that are different from each other and provide general summary to the content of its row.
"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format. In case there is no appripriate row header, the container is in the format of number such as 1,2,3  
"rowHeaderCell" is coming from prior value of row header list. It represents the row headers that identifies the row in the out-most table containing the target element. It is within rowHeaderList. The cell container is in "tag#id" format . In case there is no row header that generally summarize the row context, the container is in the format of number such as 1,2,3. Note that the rowHeaderCell should be the only row that contains the target element, not the target element itself.  
"isTargetRowHeader" returns if target element is within a row header container
targetElement returns id of target element in tag#id format such as "div#100".

[Web Page]  
{webPage}
