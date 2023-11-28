
[Test Step]
{testStep}

[Method]

1. The web page section provide outermost scope of a table.
2. {rowHeaderState}
3. {columnHeaderState}
4. Iterate through each row of outermost table. In each row, iterate through each column header and save the column container of each row into array. The column container should corresponds to a column header. If a column header has multiple cells corresponds to it, only output outermost container. Do not include row or column header in the array.
5. After completing row iteration, combine all the array together and output that into OuterTableCell

[Output]
Output result in JSON format. Following is a template. Output JSON only. No reasoning.
{{
OuterTableCell:string[][],
}}

"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container follows "tag#id" strictly. For example: div#5.

[Web Page]
{webPage}
