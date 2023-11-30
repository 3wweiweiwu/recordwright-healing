[Test Step]
In the row name is john and age is 40 click the name of the wife

[Method]

* The table within web page section provide outermost scope of a table
* Based on the outermost table, identify it has approriate column headers that summarize its context based on general visualization. Output identification result to "isUniquecolumnHeaders"
* If there is no appropriate column header, add column header to original table with unique number such as 1,2,3.
* Output the column headers of outermost table to "columnHeaderList"
* Based on the test step and web page, identify the target element. Return result to targetElement.
* Iterate column header that are identified by column headers until it find target element. If target element are found within the column, The output the column header will become the output of columnHeaderCell
* Test if the target element is a column header after table header update, return result to isTargetColumnHeader.

[Output]  
Output result in JSON format.
Following is a template.
{{
isUniqueColumnHeaders: boolean,
columnHeaderList:string[],
columnHeaderCell:string,
isTargetColumnHeader:boolean,
targetElement:string
}}
"isUniqueColumnHeaders" represents if the table has column headers different from each other and provide genearl summaryto the content of its column.
"columnHeaderList" represents array of column header container for the out-most table. The container is in "tag#id" format. In case there is no appropriate column header, the container is in the format of number such as 1,2,3  
"columnHeaderCell" is coming from prior value of column header list. It represents the column headers that identifies the column in the out-most table containing the target element. It is within columnHeaderList. The cell container is in "tag#id" format . In case there is no general column header, the container is in the format of number such as 1,2,3. Note that the columnHeaderCell should be the only column that contains the target element, not the target element itself.  
"isTargetColumnHeader" returns if target element is within a column header container
targetElement returns id of target element in tag#id format such as "div#100".

[Web Page]

DIV#17(class="table-body",automationid="9")
 DIV#19(class="row bg-primary",automationid="10")
  text#59 John
  text#60 25
  text#61 <john@example.com>
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
  text#65 <jane@example.com>
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
  text#69 <samuel@example.com>
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
  text#73 <lisa@example.com>
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
  text#77 <daniel@example.com>
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
  text#81 <maggie@example.com>
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
  text#85 <chris@example.com>
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
