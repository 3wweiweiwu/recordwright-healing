const model = require('../../../service/llm/openaiSingleton')
const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate
const fs = require('fs')
const path = require('path')
describe('A - This is a playground', () => {
    it("should work", async () => {
        let systemPrompt = `you are a quality engineer. You need to analyze web page and make output based on information from method and test step. Following four section provide information for you. Web Page section contains a web page and layout in PUG template. Test Step section provides test procedure. Understand test step context based on the web page. Output section provides rules you should follow to output result. Method section provides rules you should follow to generate output. Follow the method section and output your thought process about each method step by step. Each section header is wrapped around square brackets [].`
        let human1 = `
[Test Step]
N/A

[Method]

1. The PUG in web page section provide scope of a table. Identify the outermost table in the web page. 
2. The table has 8 rows in total. Which row does the column header row belong to according to PUG file? Provide me the index of row from 1 to 8.



[Output]
Output result in JSON format


[Web Page]  

.table#2

    .table-body#9
        .row.bg-primary#10
            .col#11 John
            .col#12 25
            .col#13 john@example.com
            .col#14
                .sub-table#15
                    .row#16
                        .col#17 Daughter
                        .col#18 Emily
                    .row#19
                        .col#20 Wife
                        .col#21 Lindsy
        .row.bg-secondary#22
            .col#23 Jane
            .col#24 30
            .col#25 jane@example.com
            .col#26
                .sub-table#27
                    .row#28
                        .col#29 Son
                        .col#30 Jack
                    .row#31
                        .col#32 Husband
                        .col#33 Sam
        .row.bg-primary#34
            .col#35 John
            .col#36 40
            .col#37 samuel@example.com
            .col#38
                .sub-table#39
                    .row#40
                        .col#41 Brother
                        .col#42 Michael
                    .row#43
                        .col#44 Wife
                        .col#45 Anna
        .row.bg-secondary#46
            .col#47 Lisa
            .col#48 28
            .col#49 lisa@example.com
            .col#50
                .sub-table#51
                    .row#52
                        .col#53 Sister
                        .col#54 Sarah
                    .row#55
                        .col#56 Mother
                        .col#57 Maggie
        .row.bg-primary#58
            .col#59 Daniel
            .col#60 35
            .col#61 daniel@example.com
            .col#62
                .sub-table#63
                    .row#64
                        .col#65 Father
                        .col#66 John Sr.
                    .row#67
                        .col#68 Daughter
                        .col#69 Danielle
        .row.bg-secondary#70
            .col#71 Maggie
            .col#72 60
            .col#73 maggie@example.com
            .col#74
                .sub-table#75
                    .row#76
                        .col#77 Daughter
                        .col#78 Lisa
                    .row#79
                        .col#80 Son
                        .col#81 Chris
        .row.bg-primary#82
            .col#83 Chris
            .col#84 32
            .col#85 chris@example.com
            .col#86
                .sub-table#87
                    .row#88
                        .col#89 Mother
                        .col#90 Maggie
                    .row#91
                        .col#92 Brother
                        .col#93 Luke
    .table-header#3
        .row#4
            .col#5 Name
            .col#6 Age
            .col#7 Email
            .col#8 Family Member
        `
        let ai1 = `
        Based on the provided method, here is my thought process:

        1. The PUG in web page section provide scope of a table. Identify the outermost table in the web page.
           - Looking at the web page section, the outermost table is identified by the tag ".table#2".
        
        2. List the first cell of each rows for outermost table. It should follow the actual order of the rows in the PUG file or HTML document, regardless of whether they are header rows or data rows. If there is sub-component such as sub-tables or sub-matrices in first row, consider sub-tables or sub-matrices within row as single data cell and only output one container for overall cell.
           - The first cell of each row in the outermost table is as follows:
             - ".col#5" from the header row
             - ".col#11" from the first data row
             - ".col#23" from the second data row
             - ".col#35" from the third data row
             - ".col#47" from the fourth data row
             - ".col#59" from the fifth data row
             - ".col#71" from the sixth data row
             - ".col#83" from the seventh data row
        
             Method Step 3: Set result form step 2 to "firstCellList."
             Thought Process: The "firstCellList" is set to [".col#5", ".col#11", ".col#23", ".col#35", ".col#47", ".col#59", ".col#71", ".col#83"].
             
             Method Step 4: Examine all elements in in the "firstCellList", ensure that the sequence of element that followsfollow the actual order of the rows in the PUG file or HTML document, regardless of whether they are header rows or data rows. This is very important step, because the sequence of elements in the "firstCellList" will be used to identify the row header list for the outermost table. Based on that, update firstCellList
             Thought Process: The sequence of elements in the "firstCellList" follows the actual order of the rows in the PUG file or HTML document. Therefore, no update is needed for "firstCellList".
             
             Method Step 5: Output "firstCellList."
             Thought Process: The output will be the "firstCellList" in JSON format.

        The output in JSON format would be:
        
        {
          "firstCellList": ["col#5", "col#11", "col#23", "col#35", "col#47", "col#59", "col#71", "col#83"]
        }
        
        
        
        
        
        `

        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["human", human1.replace(/{/g, "{{").replace(/}/g, "}}")],

            // ['ai', ai1.replace(/{/g, "{{").replace(/}/g, "}}")],

            // ["human", `explain why .col#5 does not follow the actual order of the row in pug file? `],

            // ['ai', `The ".col#5" is the first element in the "firstCellList" because it represents the first cell of the header row in the outermost table. According to the PUG template provided, ".col#5" is the first ".col" div tag within the ".row" div tag of the table header (".table-header#3"), which makes it the first cell of the header row. The method specified to include the first cell of each row for the outermost table, including the row of column header if it exists. Therefore, ".col#5" is included as the first element in the "firstCellList".
            // `],

            // ['human', `But according to the PUG file, the right sequence should be [".col#11", ".col#23", ".col#35", ".col#47", ".col#59", ".col#71", ".col#83",".col#5"]. Explain where the confusion is coming from and provide suggestion about way to improve the instruciton to avoid future confusion.`],

            // ['ai', `The DIV#25 is not considered as a row container in the rowHeaderList because the rowHeaderList was created based on the test step which asked to click the name of the wife in the row where the name is John and age is 40. 

            // In the provided web page layout, the row represented by DIV#25 does not meet this condition as the name in this row is Chris and the age is 32. Therefore, DIV#25 was not included in the rowHeaderList.`],

            // ['human', "Update the method"],
        ]);
        const chain = chatPrompt.pipe(model);
        const result = await chain.invoke()
        console.log(result.content)
    }).timeout(9999999)
})