const model = require('../../../service/llm/openaiSingleton')
const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate
const fs = require('fs')
const path = require('path')
describe('A - This is a playground', () => {
    it("should work", async () => {
        let systemPrompt = `you are a quality engineer. You need to analyze web page and make output based on information from method and test step. Following four section provide information for you. Web Page section contains a web page and layout in PUG template. Test Step section provides test procedure. Understand test step context based on the web page. Output section provides rules you should follow to output result. Method section provides rules you should follow to generate output. Follow the method section and output your thought process about each method step by step. Each section header is wrapped around square brackets [].`
        let human1 = `
        [Test Step]  
        Click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'.
        
        [Method]
        
        1. The PUG in web page section provide scope of a matrix. identify the horizontal axis and label for the outermost matrix.
        2. Set column identifier for outermost matrix be [div.heatmap-body-heading Criticality,div#505,div#200,div#201,div#202,div#203]. 
        3. Identify corresponds horizontal category of outermost matrix with each element in column identifier.
        4. Iterate through column identifier until find the elment that is in the same column as target element is found. The target element is found based on information from test step and web page.Output the element from column identifier to "characterItem"
        
        [Output]
        Output result in JSON format
        {
          characterItem:string
          targetElement:string
        }
        targetElement returns id of target element in tag#id format such as "div#100".
        characterItem returns id of column character item in tag#id format such as "div#100".
        
        [Web Page]  
        
        PUG
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
        Based on the provided information, let's start with the method section.

        1. The PUG in web page section provide scope of a matrix. identify the horizontal axis and label for the outermost matrix.
        
        The horizontal axis of the matrix is represented by the div elements with the class 'heatmap-body-subheading' and 'heatmap-body.subheading-horizontal.ng-star-inserted'. The labels for the outermost matrix are 'Low', 'Medium', 'High', and 'Very High'.
        
        2. Set column identifier for outermost matrix be [div.heatmap-body-heading Criticality,div#505,div#200,div#201,div#202,div#203].
        
        The column identifiers for the outermost matrix are set as per the given identifiers.
        
        3. Identify corresponds horizontal category of outermost matrix with each element in column identifier.
        
        The corresponding horizontal categories for the column identifiers are as follows:
        - div.heatmap-body-heading Criticality: This is the heading of the matrix.
        - div#505: This corresponds to the 'Very High' category.
        - div#200, div#201, div#202, div#203: These correspond to the different severity levels under the 'Very High' category.
        
        4. Iterate through column identifier until find the element that is in the same column as target element is found. The target element is found based on information from test step and web page. Output the element from column identifier to "characterItem".
        
        The test step mentions that we need to click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'. From the web page, we can see that the target element is div#104 under div#200 which is under div#505. So, the characterItem would be div#200.
        
        The output based on the above analysis would be:
        
        {
          "characterItem": "div#200",
          "targetElement": "div#104"
        }
        
        `

        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["human", human1.replace(/{/g, "{{").replace(/}/g, "}}")],

            ['ai', ai1.replace(/{/g, "{{").replace(/}/g, "}}")],

            ["human", `Why div#200 corresponds to "Very High" severity category? `],

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