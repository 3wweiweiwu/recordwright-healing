[Test Step]
N/A

[Method]

1. The PUG in web page section provide scope of a {tableType}. {tableTypeDefinition}. Identify the outermost {tableType} body in the web page. 
2. List the first cell of each {identifierType}s for outermost {tableType} body. The {identifierType}s includes the {identifierType} of {otherIdentifierType} header and all data {identifierType}s. Consider sub-tables or sub-matrices within {identifierType} as single data cells for the {identifierType}.
3. Output result from step 2 to "firstCellList".


[Output]
Output result in JSON format
{{
  firstCellList:string[]
}}
"firstCellList" represents array of first cells in {identifierType} header container for the outermost {tableType}. All container in the array should be in "tag#id" format such as div#1.

[Web Page]  
{webPage}
