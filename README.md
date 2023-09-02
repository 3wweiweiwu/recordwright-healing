# Action Item (ETA: Aug 30)
1.	[] Convert html to json with htmlSnapshot: https://github.com/recordwright/recordwright/blob/locator-definer/test/controller/browser-control/files/script-1.html
2.	[] Migrate code into the new healing repo: https://github.com/3wweiweiwu/recordwright-healing.git
3.	[] Create unit test for htmlsnapshot compressor to ensure it is working as expected
4.	[] Create unit test for PUG converter

# Daniel ideas
- Improve README because I'don't have too much experience on it
- Add Architecture diagrams in documentation folder
- Integrate ChateGPT query in this repo ***not now***
- Set Express framework (It use to include extra files and functionalities)
- In the future will be good to automate the creation of the JSON file needed in the UT ***Think more on this or deprecate the idea***
- Add lists, pictures, dropdown menu, forms, dialogs into the HTML test file

# Discussion
Daniel:
I noticed tha you change the names and te bussines logic of the coompresion, I like them but I think that there were not thinking on TDD

I'm sure thath you already know this but here are some of the best practices:
1. Test step by step, this helps with the maintenance, and finding defects
2. Code is written to stisfy the code

In the way that the script is written we only can check the input and the output, the problem that I see is that if there is any change, add somethig, delete something, or change the functionatilty we need to change all the UT (Unit Testing).

As I see we only can test the feature in a System Integration level, that is not the scope of the UT. If we change one of the steps, lile delete scripts, and it fails, we won't now if the problem is because of the function itself or because of the integration with the rest of the workflow

To try to fix it I will change the private functions to puclic functions.I will try to create smoke data to test each function.

To do a System Integration test we can use the HTML file that you made.

This is just my opinion but if you have a different point of view we can have a discussionm here, I know that you are busy.





