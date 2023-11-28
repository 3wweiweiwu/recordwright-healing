[Test Step]
{testStep}

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
{{
isUniqueRowHeaders: boolean,
rowHeaderList: string[],
rowHeaderCell: string,
isTargetRowHeader: boolean,
targetElement: string
}}

"isUniqueRowHeaders" indicates if the table has unique row headers.
"rowHeaderList" represents an array of row header containers for the outermost table. The container is in "tag#id" format. In cases where there are no unique row headers, the container is in the format of numbers such as 1, 2, 3.
"rowHeaderCell" is derived from the prior value of the row header list. It represents the row headers that uniquely identify the row in the outermost table containing the target element. It is within rowHeaderList. The cell container is in "tag#id" format. In cases where there are no unique row headers, the container is in the format of numbers such as 1, 2, 3. Note that the rowHeaderCell should be the only row that contains the target element, not the target element itself.
"isTargetRowHeader" returns if the target element is within a row header container.
"targetElement" returns the id of the target element in tag#id format such as "div#100".

[Web Page]
{webPage}