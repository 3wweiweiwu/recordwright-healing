const model = require('../../../service/llm/openaiSingleton')
const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate
const fs = require('fs')
const path = require('path')
describe('This is a playground', () => {
    it("should work", async () => {
        let systemPrompt = fs.readFileSync(path.join(__dirname, '../../../service/llm/template/systemPrompt.md'), 'utf8')
        let human1 = `
[Test Step]  
click the name of the wife

[Method]

1. Based on the test step and web page, identify the target element. Return result to targetElement
2. Traverse through all parent container of target element all the way to the top level container, get the outermost table or matrix container for the target element. If outermost table or matrix exists, output the result of outermost table or matrix identification result to OutMostContainer.
3. If outermost table or matrix exists according to prior step, classify the if outermost table or matrix container is a table or matrix based definition. Output that to the OutermostContainerType.
    * Definition of table: A table typically contains structured, tabular data where each row represents a different record and each column represents a different field or attribute. It should have at least 2 rows and 2 columns.
    * Definition of matrix: A matrix, on the other hand, often refers to a two-dimensional array or a cross-tabulation of data. It's typically used when data is more complex and relationships between different data points are being represented. For example, a matrix might show the correlations between different variables. It should have at least 2 rows and 2 columns.

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
DIV#95(class="row",automationid="40")
 text#141 Brother
 text#142 Michael
DIV#96(class="row",automationid="43")
 text#143 Wife
 text#144 Anna
        `
        let ai1 = `
        [Method Step 1]
        Based on the test step and web page, the target element is the name of the wife, which is "Anna". The corresponding tag for this element is "text#144".
        
        [Method Step 2]
        Traversing through all parent container of target element all the way to the top level container, the outermost container for the target element "text#144" is "DIV#96".
        
        [Method Step 3]
        The outermost container "DIV#96" is a row in a table-like structure, where each row represents a different record and each column represents a different field or attribute. Therefore, the OutermostContainerType is "table".
        
        [Output]
        {{
        "targetElementId":"text#144",
        "OutMostContainer":"DIV#96",
        "OutermostContainerType":"table"
        }}

        `

        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["human", human1],
            ['ai', ai1],
            ["human", `The expected OutermostContainerType is null instead of table? Identify the instruction that cause confusion and update construction to avoid future confusion `],

            // ['ai', `You're correct, my apologies for the oversight. The DIV#26 is indeed a column header, not a row header. It should not be included in the row header list. 

            // Let's correct the output:

            // [Method Step 3 - Correction]
            // Assign a unique number to each row in the outermost table as a row header. The assignment is as follows: 
            // 1 for the first row (DIV#19), 
            // 2 for the second row (DIV#20), 
            // 3 for the third row (DIV#21), 
            // 4 for the fourth row (DIV#22), 
            // 5 for the fifth row (DIV#23), 
            // 6 for the sixth row (DIV#24), 
            // 7 for the seventh row (DIV#25).

            // [Method Step 4 - Correction]
            // The row headers of the outermost table are: ["1", "2", "3", "4", "5", "6", "7"]

            // [Output - Correction]
            // {{
            // "isUniqueRowHeaders": false,  
            // "rowHeaderList": ["1", "2", "3", "4", "5", "6", "7"],  
            // "rowHeaderCell": "3",
            // "isTargetRowHeader": false,
            // "targetElement": "text#144"
            // }}`],

            // ['human', "Identify the instruction that cause the confusion. Improve or add additional the instruction so that you won't make similar mistake again"],

            // ['ai', `The confusion arose from the instruction in the Method section: "If there is no appropriate row header, add row header to original table with unique number such as 1,2,3." This could be interpreted as adding a unique number for each element in the row, rather than for each row itself.

            // Improved instruction: "If there is no appropriate row header, assign a unique number to each row in the table as a row header, such as 1 for the first row, 2 for the second row, and so on. These numbers should correspond to the order of the rows in the table." This makes it clear that the unique numbers are assigned to rows, not individual elements within the rows.`],
            // ['human', "but why adding a unique number for each element in the row will cause a n extra two rows?"],
        ]);
        const chain = chatPrompt.pipe(model);
        const result = await chain.invoke()
        console.log(result.content)
    }).timeout(9999999)
})