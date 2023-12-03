const model = require('../../../service/llm/openaiSingleton')
const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate
const fs = require('fs')
const path = require('path')
describe('This is a playground', () => {
    it("should work", async () => {
        let systemPrompt = fs.readFileSync(path.join(__dirname, '../../../service/llm/template/systemPrompt.md'), 'utf8')
        let human1 = `
        [Test Step]
        N/A
        
        [Method]
        
        1. The PUG in web page section provide scope of a table. Identify the outermost table in the web page.
        2. From visual perspective, list the first cell of each rows for outermost table including the row of column header if exists. Consider sub-tables or sub-matrices within row as single data cells for the row.
        3. Output result from step 2 to "firstCellList".
        
        [Output]
        Output result in JSON format
        {
          firstCellList:string[]
        }
        "firstCellList" represents array of first cells in row header container for the outermost table. All container in the array should be in "tag#id" format such as div#1.
        
        [Web Page]  
        div.row
            div.heatmap-body-heading Criticality
            div.heatmap-body-grid
                div
                    div.row
                        div#505.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Very High
                        div#200.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#104 --
                            div.row.heatmap-card-item
                                svg
                                div#105 --
                            div.row.heatmap-card-item
                                svg
                                div#106 --
                        div#201.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#107 --
                            div.row.heatmap-card-item
                                svg
                                div#108 --
                            div.row.heatmap-card-item
                                svg
                                div#109 --
                        div#202.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#110 --
                            div.row.heatmap-card-item
                                svg
                                div#111 --
                            div.row.heatmap-card-item
                                svg
                                div#112 --
                        div#203.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#113 --
                            div.row.heatmap-card-item
                                svg
                                div#114 --
                            div.row.heatmap-card-item
                                svg
                                div#115 --
                    div.row
                        div#501.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted High
                        div#204.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#116 --
                            div.row.heatmap-card-item
                                svg
                                div#117 --
                            div.row.heatmap-card-item
                                svg
                                div#118 --
                        div#205.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#119 --
                            div.row.heatmap-card-item
                                svg
                                div#120 --
                            div.row.heatmap-card-item
                                svg
                                div#121 --
                        div#206.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#122 --
                            div.row.heatmap-card-item
                                svg
                                div#123 --
                            div.row.heatmap-card-item
                                svg
                                div#124 --
                        div#207.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#125 --
                            div.row.heatmap-card-item
                                svg
                                div#126 --
                            div.row.heatmap-card-item
                                svg
                                div#127 --
                    div.row
                        div#502.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Medium
                        div#208.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#128 --
                            div.row.heatmap-card-item
                                svg
                                div#129 --
                            div.row.heatmap-card-item
                                svg
                                div#130 --
                        div#209.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#128 --
                            div.row.heatmap-card-item
                                svg
                                div#129 --
                            div.row.heatmap-card-item
                                svg
                                div#130 --
                        div#210.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#131 --
                            div.row.heatmap-card-item
                                svg
                                div#132 6
                            div.row.heatmap-card-item
                                svg
                                div#133 --
                        div#211.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#134 --
                            div.row.heatmap-card-item
                                svg
                                div#135 1
                            div.row.heatmap-card-item
                                svg
                                div#136 --
                    div.row
                        div#503.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Low
                        div#212.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#137 --
                            div.row.heatmap-card-item
                                svg
                                div#138 --
                            div.row.heatmap-card-item
                                svg
                                div#139 --
                        div#213.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#140 --
                            div.row.heatmap-card-item
                                svg
                                div#141 --
                            div.row.heatmap-card-item
                                svg
                                div#142 --
                        div#214.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#143 --
                            div.row.heatmap-card-item
                                svg
                                div#144 --
                            div.row.heatmap-card-item
                                svg
                                div#145 --
                        div#215.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#146 --
                            div.row.heatmap-card-item
                                svg
                                div#147 --
                            div.row.heatmap-card-item
                                svg
                                div#148 --
                    div.row
                        div#504.heatmap-body-subheading.heatmap-body-subheading--vertical.ng-star-inserted Very Low
                        div#216.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#149 --
                            div.row.heatmap-card-item
                                svg
                                div#150 --
                            div.row.heatmap-card-item
                                svg
                                div#151 --
                        div#217.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#152 --
                            div.row.heatmap-card-item
                                svg
                                div#153 --
                            div.row.heatmap-card-item
                                svg
                                div#154 --
                        div#218.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#155 --
                            div.row.heatmap-card-item
                                svg
                                div#156 --
                            div.row.heatmap-card-item
                                svg
                                div#157 --
                        div#219.ng-star-inserted.heatmap-card-heatmap-card--p3
                            div.row.heatmap-card-item
                                svg
                                div#158 --
                            div.row.heatmap-card-item
                                svg
                                div#159 --
                            div.row.heatmap-card-item
                                svg
                                div#160 --
                    div.row
                        div#600 white space
                        div#601.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Low
                        div#602.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Medium
                        div#603.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted High
                        div#604.heatmap-body-subheading.heatmap-body.subheading-horizontal.ng-star-inserted Very High
        
        div.heatmap-footer Severity

        `
        let ai1 = `
        Based on the provided information, let's follow the method step by step:

        1. The PUG in web page section provide scope of a table. Identify the outermost table in the web page.
        
        The outermost table in the web page is represented by the div with the class 'row' and contains the div with the class 'heatmap-body-grid'. This is the main container for the table.
        
        2. From visual perspective, list the first cell of each rows for outermost table including the row of column header if exists. Consider sub-tables or sub-matrices within row as single data cells for the row.
        
        The first cell of each row in the outermost table are as follows:
        
        - div.heatmap-body-heading (Criticality)
        - div#505 (Very High)
        - div#501 (High)
        - div#502 (Medium)
        - div#503 (Low)
        - div#504 (Very Low)
        - div#600 (white space)
        
        3. Output result from step 2 to "firstCellList".
        
        The output result from step 2 is:
        
        {
          "firstCellList": ["div.heatmap-body-heading", "div#505", "div#501", "div#502", "div#503", "div#504", "div#600"]
        }
        
        }
        `

        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["human", human1.replace(/{/g, "{{").replace(/}/g, "}}")],

            ['ai', ai1.replace(/{/g, "{{").replace(/}/g, "}}")],

            ["human", `if we classify div#505, div#501, div#502, div#503, div#504, Div#600 as row header, is div.heatmap-body-heading is in the row header or column header or data cell? or title of overall column eader or title of overall row header?`],

            // ['ai', `The div.heatmap-body-heading is included in the firstCellList because it represents the first cell of the first row in the outermost table. In the context of a table, the first row often contains the headers for the columns. In this case, "Criticality" is the header for the first column. Therefore, it is considered as the first cell of the first row. `],

            // ['human', "div.heatmap-body-heading should be a matrix label that is being used to describe "],

            // ['ai', `The DIV#25 is not considered as a row container in the rowHeaderList because the rowHeaderList was created based on the test step which asked to click the name of the wife in the row where the name is John and age is 40. 

            // In the provided web page layout, the row represented by DIV#25 does not meet this condition as the name in this row is Chris and the age is 32. Therefore, DIV#25 was not included in the rowHeaderList.`],

            // ['human', "Update the method"],
        ]);
        const chain = chatPrompt.pipe(model);
        const result = await chain.invoke()
        console.log(result.content)
    }).timeout(9999999)
})