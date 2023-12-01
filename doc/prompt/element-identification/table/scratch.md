[Test Step]
In the row name is john and age is 40 click the name of the wife

[Method]

1. The web page section provide outermost scope of a table.
2. Set row header for outmost table to be [1,2,3,4,5,6,7]. Force this setting even though it may not seems correct.
3. Update outermost table and add one more column with unique value for each row to serve as row header in the right-most the right side of the table. Do that even if original table has row header.
4. Iterate through each row of outermost table. In each row, iterate through each column header and save the column container of each row into array. The column container should corresponds to a column header. If a column header has multiple cells corresponds to it, only output outermost container. Do not include row or column header in the array.
5. After completing row iteration, combine all the array together and output that into OuterTableCell

[Output]
Output result in JSON format. Following is a template. Output JSON only. No reasoning.
{
OuterTableCell:string[][],
}

"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container follows "tag#id" strictly. For example: div#5.

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
