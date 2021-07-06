Example of redux store data in the application:
```js
{
  "yasgui": {
    "query": "SELECT DISTINCT * WHERE {\n\n}", // Query to be displayed in the SPARQL editor
    "instance": {} // Instance of the query editor
  },
  "solid": {  // Represents data for Solid
    "session": {...}, // Session provided by solid-auth
    "files": {  // Files fetched from the user's Solid Pod
      // Entries for files are [key]: null
      // Entries for folders are [key]: { [key]: 'file or folder', ... }
      // All folders are lazy loaded on expand --> __loaded is used to determine whether a folder's contents
      // have already been loaded to either trigger a fetch or expand the folder directly
      "/": {  // Root folder
        "public": {
          "__loaded": true, // Folder's contents have been loaded --> is populated
          "file.json": null
        },
        "examples": {
          "__loaded": false // Folder's contents have not been loaded
        },
        "a.json": null, // a file
        "__loaded": true // Folder's contents have been loaded
      }
    },
    "avatar": "https://your_pod.inrupt.net/profile/avatar.png", // Image of the user taken from their Solid Pod
    "modelFileLocation": "" // Contains path to the project file if it's saved remotely
  },
  "model": { // Application project data --> this whole key gets exported/imported when saving/loading
    "entities": { // Description of all entities present in the application
      "property": {
        "property_nobel:NobelPrize-nobel:category-rdf:Literal": { // Id of the property : options
          "asVariable": true, // If the property should be queried and displayed in the result set
          "selected": true, // If the property is selected
          "target": "rdf:Literal", // RDF Object, id of the entity
          "targetType": "rdf:Literal", // Type of the object (due to the ability of duplicating entities, target type might be the same and targets differ)
          "source": "nobel:NobelPrize", // RDF Subject
          "predicate": "nobel:category", // RDF Predicate
          "varName": "category", // Variable name this property should be queried under
          "dataProperty": true // If the property is data property (false for object properties)
        }
      },
      "edge": {
        "edge_nobel:Laureate-nobel:NobelPrize": {
          "highlighted": true // Whether the edge is highlighted in the graph (clicked on)
        }
      },
      "class": {
        "nobel:NobelPrize": {
          "selected": true, // If the entity is currently selected
          "asVariable": true, // If the entity should be queried and displayed in the result set
          "info": { // Information about the entity taken from the vocabulary in available languages
            "byLanguage": {
              "default": { // Fallback language
                "label": "Nobel Prize", // Default language label, taken from rdfs:label
                "description": "The Nobel Prize is a set of ..." // Default language label, taken from rdfs:comment
              },
              "en": { // Same fields for each language available in the vocabulary
                "label": "Nobel Prize",
                "description": "The Nobel Prize is a set of ..."
              }
            },
            "label": "Nobel Prize", // Currently used label and description
            "description": "The Nobel Prize is a set of ..."
          },
          "propertyIds": [ // Ids of the properties of this entity
            "property_nobel:NobelPrize-nobel:category-rdf:Literal",
            "property_nobel:NobelPrize-nobel:year-rdf:Literal"
          ],
          "hidden": false, // Whether the entity is hidden in the graph via the eye icon
          "expanded": false, // Whether the entity's property container is expanded
          "varName": "NobelPrize", // Variable name should the entity be queried
          "type": "nobel:NobelPrize", // Type of the entity
          "id": "nobel:NobelPrize" // Id of the entity
        }
      }
    },
    "customPrefixes": { // Custom prefix definition { [newKey]: oldKey }
      "db": "dbpedia"
    },
    "dirty": true, // Whether the model has been changed after last save (save resets dirty to false)
    "selectionOrder": [ // Selection order determining the order of ?a ?b variables in the SELECT query
      "nobel:NobelPrize",
      "property_nobel:NobelPrize-nobel:category-rdf:Literal"
    ],
    "endpoint": "https://data.nobelprize.org/store/sparql", // SPARQL Endpoint
    "dataSchemaURL": "https://jaresan.github.io/simplod/examples/example.ttl", // URL of the loaded data schema
    "filename": "Project title", // Project name
    "description": "Project description", // Project description
    "cartesianProduct": false, // Whether a cartesian product is possible due to the current selection
    "propertyLanguages": [ // Property languages to be queried when rdf:langString is found
      "en"
    ],
    "prefixes": { // Direct mapping of prefix --> IRI
      "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      "ns_": "http://onto.fel.cvut.cz/ontologies/dataset-descriptor/s-p-o-summary/",
      "foaf": "http://xmlns.com/foaf/0.1/",
      "nobel": "http://data.nobelprize.org/terms/",
      "db": "http://dbpedia.org/property/"
    },
    "query": "" // If the users edit the query directly in the editor, it's saved in the model
  },
  "settings": { // User specific settings
    "language": "en", // Language of the application
    "labelLanguage": "cs", // Language of the displayed labels
    "showHumanReadable": true, // Whether to use rdfs:label & rdfs:comment in the list view or stick with IRIs
    "limitEnabled": true, // If the query limit is enabled
    "limit": 100, // Limit value
    "lastSave": 1625590728458, // Last browser storage save timestamp
    "horizontalLayout": true // Whether the application should be in the horizontal or vertical layout
  },
  "controls": { // Controls to help interaction with the application
    "selectedEdgePropertyIds": [], // Property ids to be shown
    "loaded": true, // If the graph is loaded
    "labelsLoadingProgress": 100, // Progress of loading the human readable data
    "importingModelFile": false // If an import of another model file is currently ongoing
  }
}
```
