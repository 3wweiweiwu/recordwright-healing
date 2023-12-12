[Test Step]  
{testStep}

[Method]

1. Based on the test step and web page, identify the target element. Return result to targetElement
2. Traverse through all parent container of target element all the way to the top level container, get the outermost table or matrix container for the target element. If outermost table or matrix exists, output the result of outermost table or matrix identification result to OutMostContainer.
3. If outermost table or matrix exists according to prior step, identify the type of OutermostContainerType based on following description
   * Definition of table: A table typically contains structured, tabular data where each row represents a different record and each column represents a different field or attribute. It should have at least 2 rows and 2 columns.
   * Definition of matrix: A matrix, other than the critiera of table, it has additional row and column dimension that categorizes the data across rows and column header. 

[Output]
Output result in JSON format.
{{
"targetElementId":string,
"OutMostContainer"string,
"OutermostContainerType":string
}}
targetElementId returns id of target element in tag#id format such as "div#100".
OutMostContainer is the outermost container for the target element. If it exists, it's in "tag#id" foramt such as "div#100". If it does not exists, it is null.
OutermostContainerType returns type of Outer most container. It's will return one of following: "matrix", "table" or null.

[Web Page]
{webPage}
