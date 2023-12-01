const model = require('../../../service/llm/openaiSingleton')
const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate
const fs = require('fs')
const path = require('path')
describe('This is a playground', () => {
    it("should work", async () => {
        let systemPrompt = fs.readFileSync(path.join(__dirname, '../../../service/llm/template/systemPrompt.md'), 'utf8')
        let human1 = `
[Test Step]
In the row name is john and age is 40 click the name of the wife

[Method]

* The table within web page section provide outermost scope of a table
* Based on the outermost table, identify it has approriate row headers that summarize its context based on general visualization. In case there is sub-table or sub-matrix in the row, treat the whole sub-table and sub-matrix as one datacell in row.
* Output identification result to "isUniquerowHeaders"
* If there is no appropriate row header, assign a unique number to each row include in the outermost table as a row header, such as 1 for the first row, 2 for the second row, and so on. The assignment of these numbers should correspond to the order of the rows of outermost table. 
* if isUniquerowHeaders is false, identify the row of column header. Remove that row from table. 
* Output the row headers of outermost table to "rowHeaderList"
* Based on the test step and web page, identify the target element. Return result to targetElement
* Iterate row header that are identified by row headers until it find target element. If target element are found within the row, The output the row header will become the output of rowHeaderCell
* Test if the target element is a row header after table header update, return result to isTargetrowHeader.

[Output]  
Output result in JSON format.
Following is a template.
{{
isUniqueRowHeaders: boolean,  
rowHeaderList:string[],  
rowHeaderCell:string,
isTargetRowHeader:boolean,
targetElement:string
}}
"isUniqueRowHeaders" represents if the table has row headers that are different from each other and provide general summary to the content of its row.
"rowHeaderList" represents array of row header container for the out-most table. The container is in "tag#id" format. In case there is no appripriate row header, the container is in the format of number such as 1,2,3  
"rowHeaderCell" is coming from prior value of row header list. It represents the row headers that identifies the row in the out-most table containing the target element. It is within rowHeaderList. The cell container is in "tag#id" format . In case there is no row header that generally summarize the row context, the container is in the format of number such as 1,2,3. Note that the rowHeaderCell should be the only row that contains the target element, not the target element itself.  
"isTargetRowHeader" returns if target element is within a row header container
targetElement returns id of target element in tag#id format such as "div#100".

[Web Page]  
DIV#17(class="table-body",automationid="9")
 DIV#19(class="row bg-primary",automationid="10")
  text#59 John
  text#60 25
  text#61 john@example.com
  DIV#62(class="sub-table",automationid="15")
   DIV#91(class="row",automationid="16")
    text#133 Daughter
    text#134 Emily
   DIV#92(class="row",automationid="19")
    text#135 Wife
    text#136 Lindsy
 DIV#20(class="row bg-secondary",automationid="22")
  text#63 Jane
  text#64 30
  text#65 jane@example.com
  DIV#66(class="sub-table",automationid="27")
   DIV#93(class="row",automationid="28")
    text#137 Son
    text#138 Jack
   DIV#94(class="row",automationid="31")
    text#139 Husband
    text#140 Sam
 DIV#21(class="row bg-primary",automationid="34")
  text#67 John
  text#68 40
  text#69 samuel@example.com
  DIV#70(class="sub-table",automationid="39")
   DIV#95(class="row",automationid="40")
    text#141 Brother
    text#142 Michael
   DIV#96(class="row",automationid="43")
    text#143 Wife
    text#144 Anna
 DIV#22(class="row bg-secondary",automationid="46")
  text#71 Lisa
  text#72 28
  text#73 lisa@example.com
  DIV#74(class="sub-table",automationid="51")
   DIV#97(class="row",automationid="52")
    text#145 Sister
    text#146 Sarah
   DIV#98(class="row",automationid="55")
    text#147 Mother
    text#148 Maggie
 DIV#23(class="row bg-primary",automationid="58")
  text#75 Daniel
  text#76 35
  text#77 daniel@example.com
  DIV#78(class="sub-table",automationid="63")
   DIV#99(class="row",automationid="64")
    text#149 Father
    text#150 John Sr.
   DIV#100(class="row",automationid="67")
    text#151 Daughter
    text#152 Danielle
 DIV#24(class="row bg-secondary",automationid="70")
  text#79 Maggie
  text#80 60
  text#81 maggie@example.com
  DIV#82(class="sub-table",automationid="75")
   DIV#101(class="row",automationid="76")
    text#153 Daughter
    text#154 Lisa
   DIV#102(class="row",automationid="79")
    text#155 Son
    text#156 Chris
 DIV#25(class="row bg-primary",automationid="82")
  text#83 Chris
  text#84 32
  text#85 chris@example.com
  DIV#86(class="sub-table",automationid="87")
   DIV#103(class="row",automationid="88")
    text#157 Mother
    text#158 Maggie
   DIV#104(class="row",automationid="91")
    text#159 Brother
    text#160 Luke
DIV#26(class="row",automationid="4")
 text#87 Name
 text#88 Age
 text#89 Email
 text#90 Family Member


        
        `
        let ai1 = `
        [Method Step 1]
        The outermost table is identified by the DIV#17 tag. 
        
        [Method Step 2]
        The table does not have unique row headers that summarize its context based on general visualization. The row headers are not unique as they are repeating for each row (Name, Age, Email, Family Member). 
        
        [Method Step 3]
        Since there are no appropriate row headers, we assign a unique number to each row in the outermost table as a row header. The assignment is as follows: 
        1 for the first row (DIV#19), 
        2 for the second row (DIV#20), 
        3 for the third row (DIV#21), 
        4 for the fourth row (DIV#22), 
        5 for the fifth row (DIV#23), 
        6 for the sixth row (DIV#24), 
        7 for the seventh row (DIV#25), 
        8 for the eighth row (DIV#26).
        
        [Method Step 4]
        The row headers of the outermost table are: ["1", "2", "3", "4", "5", "6", "7", "8"]
        
        [Method Step 5]
        Based on the test step and web page, the target element is the name of the wife in the row where the name is John and age is 40. This corresponds to text#144 Anna.
        
        [Method Step 6]
        Iterating through the row headers, we find the target element in the row header "3".
        
        [Method Step 7]
        The target element is not a row header after table header update.
        
        [Output]
        {{
        "isUniqueRowHeaders": false,  
        "rowHeaderList": ["1", "2", "3", "4", "5", "6", "7", "8"],  
        "rowHeaderCell": "3",
        "isTargetRowHeader": false,
        "targetElement": "text#144"
        }}

        `

        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["human", human1],
            ['ai', ai1],
            ["human", `Check method again and see if rowHeaderList" is ["1", "2", "3", "4", "5", "6", "7", "8"] is correct`],

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