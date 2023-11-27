const assert = require('assert');
const JsonParser = require('../../../../service/llm/util/jsonParser');

describe('JsonParser', () => {
    it('should parse a JSON object from the text', async () => {
        const parser = new JsonParser();
        const input = '{"name": "John", "age": 30, "city": "New York"}';
        const expectedOutput = { name: 'John', age: 30, city: 'New York' };

        const result = await parser.parse(input);

        assert.deepStrictEqual(result, expectedOutput);
    });

    it('should return null if no JSON object is found in the text', async () => {
        const parser = new JsonParser();
        const input = 'This is some random text without a JSON object.';
        const expectedOutput = null;

        const result = await parser.parse(input);

        assert.strictEqual(result, expectedOutput);
    });

    it('should handle errors during JSON parsing', async () => {
        const parser = new JsonParser();
        const input = '{"name": "John", "age": 30, "city": "New York"';
        const expectedOutput = null;

        const result = await parser.parse(input);

        assert.strictEqual(result, expectedOutput);
    });
    it('should handle complex scenario', async () => {
        const parser = new JsonParser();
        const input = `
        Based on the provided method, we will iterate through each row of the outermost table. In each row, we will iterate through each column header and save the column container of each row into an array. The column container should correspond to a column header. If a column header has multiple cells corresponds to it, only output the outermost container. We will not include row or column header in the array. After completing row iteration, we will combine all the arrays together and output that into OuterTableCell.  
   
        Let's start with the first row. The row header is "div#505". The column headers are "div#601", "div#602", "div#603", "div#604". The column containers are "div#200", "div#201", "div#202", "div#203". So, the first row will be ["div#200", "div#201", "div#202", "div#203"].  
           
        The second row has the row header "div#501". The column containers are "div#204", "div#205", "div#206", "div#207". So, the second row will be ["div#204", "div#205", "div#206", "div#207"].  
           
        The third row has the row header "div#502". The column containers are "div#208", "div#209", "div#210", "div#211". So, the third row will be ["div#208", "div#209", "div#210", "div#211"].  
           
        The fourth row has the row header "div#503". The column containers are "div#212", "div#213", "div#214", "div#215". So, the fourth row will be ["div#212", "div#213", "div#214", "div#215"].  
           
        The fifth row has the row header "div#504". The column containers are "div#216", "div#217", "div#218", "div#219". So, the fifth row will be ["div#216", "div#217", "div#218", "div#219"].  
           
        Now, we combine all the rows together and output that into OuterTableCell.  
           
        Here is the output in JSON format:  
           

        {
            "OuterTableCell": [
                ["div#200", "div#201", "div#202", "div#203"],
                ["div#204", "div#205", "div#206", "div#207"],
                ["div#208", "div#209", "div#210", "div#211"],
                ["div#212", "div#213", "div#214", "div#215"],
                ["div#216", "div#217", "div#218", "div#219"]
            ]
        }

        `;
        const expectedOutput = {
            OuterTableCell: [
                ["div#200", "div#201", "div#202", "div#203"],
                ["div#204", "div#205", "div#206", "div#207"],
                ["div#208", "div#209", "div#210", "div#211"],
                ["div#212", "div#213", "div#214", "div#215"],
                ["div#216", "div#217", "div#218", "div#219"]
            ]
        };

        const result = await parser.parse(input);

        assert.deepStrictEqual(result, expectedOutput);
    });
});