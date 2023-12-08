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
        
        1. The PUG in web page section provide scope of a table. A table is normally consist of table body, table footer and table caption. A table body normally contains data cells and at least one row header or column header. . Identify the outermost table body in the web page.
        2. Check if there is row header in main outermost table. Please note, we re checking outermost table not table body.
        3. If step 2 is true, list the cell from row header. Consider sub-tables or sub-matrices within row as single data cells for the row.
        4. If step 2 is false, List the first cell of each rows for outermost table body. The rows includes the row of column header and all data rows. Consider sub-tables or sub-matrices within row as single data cells for the row.
        5. Output result from to "firstCellList".
        
        [Output]
        Output result in JSON format
        {
          firstCellList:string[]
        }
        "firstCellList" represents array of first cells in row header container for the outermost table. All container in the array should be in "tag#id" format such as div#1.
        [Web Page]
        BODY#5(data-new-gr-c-s-check-loaded="14.1048.0",data-gr-ext-installed="")
        TABLE#19
            THEAD#25
                TR#29
                    text#87 Month
                    text#88 Region
                TR#31
                    text#89 North America
                    text#90 Europe
                    text#91 Asia
                TR#33
                    text#92 Product A
                    text#93 Product B
                    text#94 Product A
                    text#95 Product B
                    text#96 Product A
                    text#97 Product B
            TBODY#27
                TR#36
                    text#98 January
                    text#99 $12,000
                    text#100 $15,000
                    text#101 €8,000
                    text#102 €11,000
                    text#103 ¥5,000
                    text#104 ¥7,000
                TR#38
                    text#105 February
                    text#106 $14,000
                    text#107 $16,000
                    TD#86
                        text#108 €9,000
                        comment#109                    
        text#23 Monthly Sales Report
        `
        let ai1 = `
        Based on the provided information, let's follow the method step by step:

        1. The PUG in the web page section provides the scope of a table. The outermost table body in the web page is TBODY#27.
        
        2. We need to check if there is a row header in the main outermost table. Looking at the web page section, we can see that the outermost table (TABLE#19) does have a row header, which is THEAD#25.
        
        3. Since step 2 is true, we need to list the cells from the row header. The cells in the row header are text#87 (Month), text#88 (Region), text#89 (North America), text#90 (Europe), text#91 (Asia), text#92 (Product A), text#93 (Product B), text#94 (Product A), text#95 (Product B), text#96 (Product A), and text#97 (Product B).
        
        4. Since step 2 is true, we don't need to perform step 4.
        
        5. The output result from "firstCellList" would be ["text#87", "text#88", "text#89", "text#90", "text#91", "text#92", "text#93", "text#94", "text#95", "text#96", "text#97"].
        
        Following the output rules, the final output in JSON format would be:
        
        {
          "firstCellList": ["text#87", "text#88", "text#89", "text#90", "text#91", "text#92", "text#93", "text#94", "text#95", "text#96", "text#97"]
        }
        `

        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["human", human1.replace(/{/g, "{{").replace(/}/g, "}}")],

            ['ai', ai1.replace(/{/g, "{{").replace(/}/g, "}}")],

            ["human", `Why THEAD#25 is a row header? Please explain this confusion in detail`],

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