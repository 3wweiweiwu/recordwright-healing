[Test Step]
N/A

[Method]

1. The PUG in web page section provide scope of a {tableType}. {tableTypeDefinition}. Identify the outermost {tableType} body in the web page.
2. Check if there is {identifierType} header in outermost {tableType}.
3. If step 2 is true, list the cell from {identifierType} header. Consider sub-tables or sub-matrices within {identifierType} as single data cells for the {identifierType}.
4. If step 2 is false, List the first cell of each {identifierType}s for outermost {tableType} body. The {identifierType}s includes the {identifierType} of {otherIdentifierType} header and all data {identifierType}s. Consider sub-tables or sub-matrices within {identifierType} as single data cells for the {identifierType}.
5. Output result from to "firstCellList".

[Output]
Output result in JSON format
{{
  firstCellList:string[]
}}
"firstCellList" represents array of first cells in {identifierType} header container for the outermost {tableType}. All container in the array should be in "tag#id" format such as div#1.

[Web Page]  
{webPage}
