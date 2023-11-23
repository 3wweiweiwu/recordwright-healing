[Test Step]
In, click the name of the brother
[Method]

* The web page section provide outermost scope of a matrix or table
* Based on the outermost table, get the context of each row. Identify it has correct row headers that summarize its context.
* If there is no correct row header that served as label for data in each row, add row header to original table with unique number such as 1,2,3.
* Based on the outermost table, get the context of each column. Identify it has correct column headers that summarize its context.
* If there is no correct column header that served as label for data in each column, add column header to original table with unique number such as 1,2,3.
* Iterate through each row of outermost table. In each row, iterate through each column header and save the outermost column container of each row into array.
* After completing row iteration, combine all the array together and output that into OuterTableCell

[Output]
Output result in JSON format. Following is a template. Output JSON only. No reasoning.  
{
OuterTableCell:string[][],  
}  

"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container follows "tag#id" strictly. For example: div#5.

[Web Page]
.col#38
    .sub-table#39
        .row#40
            .col#41 Brother
            .col#42 Michael
        .row#43
            .col#44 Wife
            .col#45 Anna