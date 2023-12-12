const model = require('../../../service/llm/openaiSingleton')
const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate
const fs = require('fs')
const path = require('path')
describe('A - This is a playground', () => {
    it("should work", async () => {
        let systemPrompt = `you are a quality engineer. You need to analyze web page and make output based on information from method and test step. Following four section provide information for you. Web Page section contains a web page and layout in PUG template. Html tags are placeholder, you need to evaluate the most suitable tag for each web element based on the textual and layout context.Test Step section provides test procedure. Understand test step context based on the web page. Output section provides rules you should follow to output result. Method section provides rules you should follow to generate output. Follow the method section and output your thought process about each method step by step. Each section header is wrapped around square brackets [].`
        let human1 = `
        [Test Step]  
        Click on the first text element within
        
        [Method]
        
        1. Based on the test step and web page, identify the target element. Return result to targetElement
        2. Traverse through all parent container of target element all the way to the top level container, get the outermost table or matrix container for the target element. If outermost table or matrix exists, output the result of outermost table or matrix identification result to OutMostContainer.
        3. If outermost table or matrix exists according to prior step, identify the type of OutermostContainerType based on following description
           * Definition of table: A table typically contains structured, tabular data where each row represents a different record and each column represents a different field or attribute. It should have at least 2 rows and 2 columns.
           * Definition of matrix: A matrix, other than the critiera of table, it has additional row and column dimension that categorizes the data across rows and column header. 
        
        [Output]
        Output result in JSON format.
        {
        "targetElementId":string,
        "OutMostContainer"string,
        "OutermostContainerType":string
        }
        targetElementId returns id of target element in tag#id format such as "div#100".
        OutMostContainer is the outermost container for the target element. If it exists, it's in "tag#id" foramt such as "div#100". If it does not exists, it is null.
        OutermostContainerType returns type of Outer most container. It's will return one of following: "matrix", "table" or null.
        
        [Web Page]
        div.row.heatmap-card-item
            svg
            div#125 --
        div.row.heatmap-card-item
            svg
            div#126 --
        div.row.heatmap-card-item
            svg
            div#127 --
        `
        let ai1 = `
        Based on the provided information, let's go through the method step by step.

        1. The test step mentions "Click on the first text element within". However, the web page layout does not provide any text elements. The elements provided are 'div' and 'svg'. Since the test step is not clear about which element to click, we cannot identify the target element. 
        
        2. Since we cannot identify the target element, we cannot traverse through all parent containers of the target element to the top level container. Therefore, we cannot get the outermost table or matrix container for the target element.
        
        3. As we could not identify the outermost table or matrix in the previous step, we cannot identify the type of OutermostContainerType.
        
        Based on the above analysis, the output would be:
        
        {
        "targetElementId": null,
        "OutMostContainer": null,
        "OutermostContainerType": null
        }
        
        Please note that the test step needs to be more specific about which element to click. The web page layout should also provide text elements if the test step mentions clicking on a text element.
        
        `
        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["human", human1.replace(/{/g, "{{").replace(/}/g, "}}")],

            ['ai', ai1.replace(/{/g, "{{").replace(/}/g, "}}")],

            ["human", `Why div#125 is not a text element? It contains text`],

            ['ai', `I apologize for the confusion. You're correct. The 'div#125' could indeed be considered as a text element as it might contain text. I misunderstood the context. Let's revise the steps:

            1. The test step mentions "Click on the first text element within". In the web page layout, the first 'div' element with an id, which could contain text, is 'div#125'. So, 'div#125' is our target element.
            
            2. The parent container of the target element 'div#125' is 'div.row.heatmap-card-item'. However, this parent container does not seem to be a table or matrix as it does not contain structured, tabular data with at least 2 rows and 2 columns. Therefore, there is no outermost table or matrix container for the target element.
            
            3. Since there is no outermost table or matrix container, the OutermostContainerType is null.
        
            `],

            ['human', `Identify the root cause of your prior confusion. Based on that, update the a universal instruction to enhance your ability to identify element in similar case like this"`],

            // ['ai', `The DIV#25 is not considered as a row container in the rowHeaderList because the rowHeaderList was created based on the test step which asked to click the name of the wife in the row where the name is John and age is 40. 

            // In the provided web page layout, the row represented by DIV#25 does not meet this condition as the name in this row is Chris and the age is 32. Therefore, DIV#25 was not included in the rowHeaderList.`],

            // ['human', "Update the method"],
        ]);
        const chain = chatPrompt.pipe(model);
        const result = await chain.invoke()
        console.log(result.content)
    }).timeout(9999999)
})