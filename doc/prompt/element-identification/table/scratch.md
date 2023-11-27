You are a product ownwer try to design a rest api service. The "Web Element Identifier Service" is a REST API designed for Quality Engineers. It enables the identification of specific web elements within a web page, facilitating automated testing and quality assurance processes. The service operates via a single endpoint that accepts POST requests.

Following are algorithm it used to identify the target element. Based on that, create user story:

## Web Element Identification Algorithm

### Key Algorithms

- General Evaluation
- Step Evolution
- Table or Matrix Evaluation

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

### Step Evolution

#### Step Evolution Introduction

Based on the test step, web page and outermost container, update the test step. This includes analyzing a specific container in the web page, determining if any part of the test step is used to identify this container, and then remove relevant information from original test step.

#### Step Evolution Input Schema

- `testStep` (string): Describes the test step used to identify the element.
- `webPage` (string): The current web page in PUG format.
- `OutMostContainer` (string): The container element for the target element in the web page.

#### Step Evolution Output Schema

{
UpdatedStep:string
}
"UpdatedStep" represents the updated step for target element identification and remove relevant information that is being used to identify the outermost table container. If you reference the outmost table cell container in the updated step, reference that as "specified wrapper table cell" only.

#### Next Step after Step Evolution

No action

### Table or Matrix Evaluation

#### Introduction for Table or Matrix Evaluation

Based on the web page, type of outermost container and test step, identify the location of the target element within the table or matrix. Depends on the type of outermost container, it will either proceed with table evaluation or matrix evaluation. Based on the result of table evaluation or matrix evaluation, it will list all data cells and then get the target element or container that contains target element

#### Table or Matrix Evaluation Input Schema

- `testStep` (string): Describes the test step used to identify the element.
- `webPage` (string): The current web page in PUG format.
- `OutermostContainerType` (string): The container element type for the target element in the web page.

#### Process Flow for Table or Matrix Evaluation

- Run alglrithm based on outer most container type
  - If table, run "table evaluation" algorithm to get column header and row header for target element
  - If matrix, run "matrix evaluation" algirithm to get column header and row header for target element
- Based on web page, column header and row header for target element, test step, run "cell list" algorithm
- Get updated container for the target element
  - If final container is the same as target element, return target element and stop
  - If updated container is different from target element,
    - Get updated step by running "step evolution" with on original web page, test step and final container
    - Get children of updated container and use that as updated web page
    - Run "general classification" with updated step, updated web page

#### Table Evaluation

##### Process Flow for Table Evaluation

- Run "Get Column Header in Table"
- Run "Get Row Header in Table"
- Join output from two algorithms together and return

##### Get Column Header in Table

###### Get Column Header in Table Introduction

Analyzing a web page's table structure, add column header if it is missing, identify the column header for target element and its relationship to the target element.

###### Get Column Header in Table Input Schema

- `testStep` (string): Describes the test step used to identify the element.
- `webPage` (string): The current web page in PUG format.

###### Get Column Header in Table Output Schema

{  
isUniqueColumnHeaders: boolean,  
columnHeaderList:string[],  
columnHeaderCell:string,
isTargetColumnHeader:boolean,
targetElement:string
}  
"isUniqueColumnHeaders" represents if the table has unique column header,
"columnHeaderList" represents array of column header container for the out-most table. The container is in "tag#id" format. In case there is no unique column header, the container is in the format of number such as 1,2,3  
"columnHeaderCell" is coming from prior value of column header list. It represents the column headers that uniquely identifies the column in the out-most table containing the target element. It is within columnHeaderList. The cell container is in "tag#id" format . In case there is no unique column header, the container is in the format of number such as 1,2,3. Note that the columnHeaderCell should be the only column that contains the target element, not the target element itself.  
"isTargetColumnHeader" returns if target element is within a column header container
targetElement returns id of target element in tag#id format such as "div#100".

##### Get Row Header in Table

###### Get Row Header in Table Introduction

Analyzing a web page's table structure, add row header if it is missing, identify the row header for target element and its relationship to the target element.

###### Get Row Header in Table Input Schema

- `testStep` (string): Describes the test step used to identify the element.
- `webPage` (string): The current web page in PUG format.

###### Get Row Header in Table Output Schema

Following is a template.  
{  
isUniqueRowHeaders: boolean,  
rowHeaderList:string[],  
rowHeaderCell:string,
isTargetRowHeader:boolean,
targetElement:string
}  
"isUniqueRowHeaders" represents if the table has unique row header,
"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format. In case there is no unique row header, the container is in the format of number such as 1,2,3  
"rowHeaderCell" is coming from prior value of row header list. It represents the row headers that uniquely identifies the row in the out-most table containing the target element. It is within rowHeaderList. The cell container is in "tag#id" format . In case there is no unique row header, the container is in the format of number such as 1,2,3. Note that the rowHeaderCell should be the only row that contains the target element, not the target element itself.  
"isTargetRowHeader" returns if target element is within a row header container
targetElement returns id of target element in tag#id format suc

#### Matrix Evaluation

##### Process Flow for Matrix Evaluation

- Run "Get Column Header in Matrix"
- Run "Get Row Header in Matrix"
- Join output from two algorithms together and return

##### Get Column Header in Matrix

The same as "Get Column Header in Table" except for prompt

##### Get Row Header in Matrix

The same as "Get Row Header in Table" except for prompt

#### Cell List

##### Introduction for Cell List

Get all data grid cell from table.

##### Cell List Input Schema

- `testStep` (string): Describes the test step used to identify the element.
- `webPage` (string): The current web page in PUG format.
- `columnHeaderList`(string[]): list of column header in current table
- `rowHeaderList`(string[]): list of row header in current table

##### Cell List Output Schema

{
OuterTableCell:string[][],  
}  

"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container follows "tag#id" strictly. For example: div#5.
