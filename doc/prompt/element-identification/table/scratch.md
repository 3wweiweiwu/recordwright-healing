You are a software developer. You try to design a rest api service. The "Web Element Identifier Service" is a REST API designed for Quality Engineers. It enables the identification of specific web elements within a web page, facilitating automated testing and quality assurance processes. The service operates via a single endpoint that accepts POST requests.

Following is one of the algorithm. It is written with NodeJS+LangChain+Azure OpenAI. Based on that, design the class

### General Evaluation

#### General Evaluation Introduction

Based on the test step and web page, classify if the target element is within a matrix or table. This is entry point for web element identification algorithm

#### Next Step after General Evaluation

- If target element is not within matrix or table, return target element id.
- If target element is within matrix or table,
  - Get updated step with step evolution algorithm by providing current web page, test step and OutMostContainer
  - Get table context by retrieving the children of Outermost container
  - Use Table or Matrix Classification conduct further processing by providing table context, test step and OutermostContainerType

#### General Evaluation Input Schema

- `testStep` (string): Describes the test step used to identify the element.
- `webPage` (string): The current web page in PUG format.

#### General Evaluation Output Schema

{
"targetElementId":"",
"OutMostContainer"string,
"OutermostContainerType":string
}
targetElementId returns id of target element in tag#id format such as "div#100".
OutMostContainer is the outermost container for the target element. If it exists, it's in "tag#id" foramt such as "div#100". If it does not exists, it is null.
OutermostContainerType returns type of Outer most container. It's will return one of following: "matrix", "table" or null.

#### Langchain Prompt Template

[Test Step]  
${testStep}

[Method]

1. Based on the test step and web page, identify the target element. Return result to targetElement
2. Traverse through all parent container of target element all the way to the top level container, get the outermost table or matrix container for the target element. If outermost table or matrix exists, output the result of outermost table or matrix identification result to OutMostContainer.
3. If outermost table or matrix exists according to prior step, classify the if outermost table or matrix container is a table or matrix based definition. Output that to the OutermostContainerType.
   - Definition of table: A table typically contains structured, tabular data where each row represents a different record and each column represents a different field or attribute. For example, a row might represent an individual person, and columns might represent details about that person, like their name and relationship status.
   - Definition of matrix: A matrix, on the other hand, often refers to a two-dimensional array or a cross-tabulation of data. It's typically used when data is more complex and relationships between different data points are being represented. For example, a matrix might show the correlations between different variables.

[Output]
Output result in JSON format.
{
"targetElementId":"",
"OutMostContainer"string,
"OutermostContainerType":string
}
targetElementId returns id of target element in tag#id format such as "div#100".
OutMostContainer is the outermost container for the target element. If it exists, it's in "tag#id" foramt such as "div#100". If it does not exists, it is null.
OutermostContainerType returns type of Outer most container. It's will return one of following: "matrix", "table" or null.

[Web Page]
${webPage}
