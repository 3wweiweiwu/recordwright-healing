[Test Step]  
Click on the first text element located in the table cell where criticality level is categorized as "High" and severity levels is categorized as 'Very High'.

[Method]

1. The Web Page provide a scope a matrix
2. Based on the test step and web page, identify horizontal matrix category that contain target element.
3. Output result to characterItem

[Output]
Output result in JSON format
{
    characterItem:string
}
characterItem returns id of column character item in tag#id format such as "div#100".
        


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
