
[Test Step]
N/A

[Method]

1. The PUG in web page section provide scope of a matrix
2. From top to bottom, iterate through each row of the outermost matrix, including the column header row. For each row, create an array to store the identifiers of the individual cells or the outermost container of sub-components (like a sub-matrix) within the row. These identifiers should correspond to the specific outermost row and column header. If a column has a sub-component (like a sub-matrix), only include the identifier of the outermost container of the sub-component in the array. If a column has a sub-component (like a sub-matrix), do not include data cells within the sub-component in the array. Also, include the identifiers of the elements in the column header row in the array. We repeat this process for all rows in the matrix, including the header row. By the end of this step, we should have an array for each row in the matrix, including the column header row. Each of these arrays should contain the identifiers of the data cells or outermost container, in the order of the column headers.
3. If there is row of column header in the result of step 2, move the row to the right index where it appears visually in the matrix.  
4. Ouptut result from step 3 to cellList

[Output]
Output result in JSON format
{{
cellList:string[][]
}}
"cellList" represents outer-most matrix in array of array format. The outer array represents array of rows. The inner array represents array cell container in the row. The cell container follows "tag#id" strictly. For example: div#5.

[Web Page]
{webPage}
