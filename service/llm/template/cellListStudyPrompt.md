
[Test Step]
{testStep}

[Method]

1. The web page section provide outermost scope of a table.
2. {rowHeaderState}
3. {columnHeaderState}
4. Now, we need to iterate through each row of the outermost table. For each row, we will create an array to store the identifiers of the individual data cells or the outermost container of sub-components (like a sub-table) within the row. Do not include the identifier of the entire row itself. These identifiers should correspond to the specific outermost row and column header. If a column has a sub-component (like a sub-table), only include the identifier of the outermost container of the sub-component in the array. If a column has a sub-component (like a sub-table), do not include data cells within the sub-component in the array. We repeat this process for all rows in the table, excluding the header row. By the end of this step, we should have an array for each row in the table. Each of these arrays should contain the identifiers of the data cells or outermost container, in the order of the column headers.  

[Output]
Output result in JSON format. Following is a template. Output JSON only. No reasoning.
{{
OuterTableCell:string[][],
}}

"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container follows "tag#id" strictly. For example: div#5.

[Web Page]
{webPage}
