[Test Step]
{testStep}

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
{{
isUniqueRowHeaders: boolean,  
rowHeaderList:string[],  
rowHeaderCell:string,
isTargetRowHeader:boolean,
targetElement:string
}}
"isUniqueRowHeaders" represents if the table has unique row header,
"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format. In case there is no unique row header, the container is in the format of number such as 1,2,3  
"rowHeaderCell" is coming from prior value of row header list. It represents the row headers that uniquely identifies the row in the out-most table containing the target element. It is within rowHeaderList. The cell container is in "tag#id" format . In case there is no unique row header, the container is in the format of number such as 1,2,3. Note that the rowHeaderCell should be the only row that contains the target element, not the target element itself.  
"isTargetRowHeader" returns if target element is within a row header container
targetElement returns id of target element in tag#id format such as "div#100".

[Web Page]  
{webPage}
