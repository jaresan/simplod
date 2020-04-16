import {Parser} from 'n3';

const propertyToName = {
  'http://www.w3.org/2001/XMLSchema#integer': 'Int',
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString': 'String',
  'http://www.w3.org/2001/XMLSchema#string': 'String',
  'http://www.w3.org/2001/XMLSchema#decimal': 'Decimal'
};

const propertyTypes = Object.keys(propertyToName);

const predicateSpecIRI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate';
const hasWeightIRI = 'http://onto.fel.cvut.cz/ontologies/dataset-descriptor/s-p-o-summary/hasWeight';
const typeIRI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const objectSpecIRI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#object';
const subjectSpecIRI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#subject';

const edgePredicates = [predicateSpecIRI, hasWeightIRI, objectSpecIRI, subjectSpecIRI];

export const parseSPO = ttlString => new Promise((res, err) => {
  getQuads(ttlString)
    .then(({quads, prefixes}) => {
      res({
        data: parseQuads(quads),
        __prefixes__: prefixes
      });
    });
});

const getQuads = ttlString => new Promise((res, err) => {
  const parser = new Parser();
  const quads = [];

  parser.parse(ttlString, (error, quad, prefixes) => {
    if (quad) {
      quads.push(quad);
    } else if (!error) {
      res({quads, prefixes});
    }
  });
});

const parseQuads = quads => {
  const isEdge = quad => edgePredicates.includes(quad.predicate.id);
  const getDataProperty = (quad, classMapping) => {
    if (quad.predicate.id !== objectSpecIRI) {
      return null;
    }

    const classType = classMapping[quad.object.value];
    return propertyToName[quad.object.datatypeString]
      || propertyToName[quad.object.id]
      || propertyToName[classType];
  };

  // {
  //   [className]: {
  //     properties: [{ predicate: type }],
  //     methods: [{predicateName, objectClass}]
  //   }
  // }
  const classes = {};

  // {
  //   [blankNodeId]: className
  // }
  const classMapping = quads.reduce((acc, quad) => {
    if (quad.predicate.id === typeIRI) {
      // Empty node --> className mapping
      acc[quad.subject.value] = quad.object.id;

      // ObjectId is type
      if (!propertyTypes.includes(quad.object.id)) {
        classes[quad.object.id] = {
          properties: [],
          methods: []
        };
      }
    }
    return acc;
  }, { });


  const predicateKeys = {
    [predicateSpecIRI]: 'predicate',
    [objectSpecIRI]: 'object',
    [subjectSpecIRI]: 'subject',
    [hasWeightIRI]: 'weight'
  };

  const edges = quads.reduce((acc, quad) => {
    let predicateID = '';
    let key = '';
    let value = '';
    if (isEdge(quad)) {
      predicateID = quad.subject.id;
      key = predicateKeys[quad.predicate.id];
      value = classMapping[quad.object.value] || quad.object.value;

      if (!acc[predicateID]) {
        acc[predicateID] = {
          [key]: value
        }
      } else {
        acc[predicateID][key] = value;
      }

      const dataProperty = getDataProperty(quad, classMapping);
      if (dataProperty) {
        acc[predicateID].dataProperty = dataProperty;
      }

    } else {
      return acc;
    }

    return acc;
  }, { });

  return Object.keys(edges).reduce((acc, key) => {
    const edge = edges[key];
    if (edge.dataProperty) {
      acc[edge.subject].properties.push({
        predicate: edge.predicate,
        type: edge.dataProperty
      });
    } else {
      acc[edge.subject].methods.push({
        predicate: edge.predicate,
        object: edge.object,
        weight: edge.weight
      });
    }

    return acc;
  }, classes);
};
