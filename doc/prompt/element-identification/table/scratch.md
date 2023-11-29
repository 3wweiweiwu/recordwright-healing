Based on the provided method and the code, here's a structured summary of the `HtmlSnapshotCompresed` class:

---

- **Class Definition - `HtmlSnapshotCompresed`**:
  - **Constructor**:
    - **Purpose**: To create a new instance of `HtmlSnapshotCompresed`.
    - **Parameters**:
      - `json` (string): A JSON string that will be parsed into an atomic node matrix.
    - **Functionality**: Parses the JSON input to create an atomic node matrix and initiates the compression process.
  - **Methods** (excluding static methods and private methods):
    - **parse(json)**: Parses a JSON string into an atomic node matrix.
    - **updateTextInCurrnetLevel(level)**: Updates the text in the current level of nodes.
    - **getNodeInformationById(id)**: Retrieves node information by its ID.
    - **rebuildMatrix()**: Rebuilds the atomic node matrix.
    - **mergeAttribute(sourceNode, targetNode)**: Merges attributes from a source node to a target node.
    - **getInvisibleNodeInLevel(atomicNodeLevel)**: Identifies nodes that qualify for removal based on visibility.
    - **getSingleChildNodeInLevel(atomicNodeLevel)**: Identifies nodes with only one child that qualify for removal.
    - **deleteScripts(atomicNodeLevel)**: Deletes script nodes and their children from the current level.
    - **deleteRowsNoNode(atomicNodeMatrix)**: Deletes rows with no nodes.
    - **deleteRowsNoAttNoRect(atomicNodeMatrix)**: Deletes rows with nodes having no attributes and invisible rectangles.
    - **mergeAttributes(atomicNodeMatrix)**: Merges attributes in the atomic node matrix.
    - **deleteNodesMergedNoChildren(atomicNodeMatrix)**: Deletes merged nodes with no children.
  - **Export**:
    - The class `HtmlSnapshotCompresed` and the `AtomicNode` class are exported as a module.

This summary captures the essential elements of the `HtmlSnapshotCompresed` class from the JavaScript code, detailing its purpose, constructor, methods, and the export statement, following the markdown format outlined in the [Example Output].

---