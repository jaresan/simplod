module.exports = {
  data: {
    'bibo:Collection': {
      properties: [
        {
          predicate: 'dcterm:title',
          type: 'xml:String',
        }
      ],
      methods: [
        {
          predicate: 'dcterm:hasPart',
          object: 'bibo:Collection'
        },
        {
          predicate: 'dcterm:owner',
          object: 'dcterm:Actor'
        }
      ]
    },
    'dcterm:Actor': {
      properties: [
        {
          predicate: 'dcterm:title',
          type: 'xml:String'
        }
      ],
      methods: []
    }
  },
  __prefixes__: {
    'http://onto.fel.cvut.cz/ontologies/dataset-descriptor/s-p-o-summary/': 'ns',
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#': 'rdf',
  }
};
