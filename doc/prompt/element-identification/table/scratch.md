You are a helpful prompt engineer, help me to create a updated prompt. Following are Prompt, Sample Input and Expected Output sections. Each sections header is wrapped around a square bracket []. Help me to update my prompt so that it can extract data cell from a pug table. An example will be transate pug template from sample input section to array in expected output section


[Prompt]
Given following PUG template, I want to iterate through each row in the table. In each row, get the outermost container for each cell and create an array. When I done with iterating all rows, combine all arrays previously generated together into a new array and output that.

[Sample Input]
    .table-body#9
        .row.bg-primary#10
            .col#11 John
            .col#12 25
            .col#13 <john@example.com>
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
            .col#25 <jane@example.com>
            .col#26
                .sub-table#27
                    .row#28
                        .col#29 Son
                        .col#30 Jack
                    .row#31
                        .col#32 Husband
                        .col#33 Sam

[Expected Output]
[
["col#11","col#12","col#13","col#14"],
["col#23","col#24","col#25","col#26"],
["col#35","col#36","col#37","col#38"],
["col#47","col#48","col#49","col#50"],
["col#59","col#60","col#61","col#62"],
["col#71","col#72","col#73","col#74"],
["col#83","col#84","col#85","col#86"]
]

