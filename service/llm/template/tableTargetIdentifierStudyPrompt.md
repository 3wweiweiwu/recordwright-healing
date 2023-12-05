[Test Step]  
{step}

[Method]

1. The PUG in web page section provide scope of a {tableType}
2. First Cell List [{elementCharacterList}] are first cell of {identifierType} for outermost table. Iterate through first cell list, find the element from first cell list that is in the same {identifierType} as target element. The target element is the the element you you want to interact with. It's identified based on the test step instructions. Output the desired element from first cell list to "characterItem"
3. Identify the target element based on step information and web page. Output result to "targetElement"

[Output]
Output result in JSON format
{{
  characterItem:string
  targetElement:string
}}
targetElement returns id of target element in tag#id format such as "div#100".
characterItem returns id of {identifierType} character item in tag#id format such as "div#100". Return null if it cannot be found.

[Web Page]  

```PUG
{webPage}
