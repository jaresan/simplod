import {Parser} from 'n3';
import { curry, invertObj, keys } from 'ramda';
import possiblePrefixes from '../constants/possiblePrefixes';

const propertyToName = {
  'xml:integer': 'int',
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString': 'string',
  'xml:string': 'string',
  'xml:decimal': 'decimal',
  'owl:Thing': 'thing',
  customMatch: str => {
    if (!str) return;
    const type = str.match(/xsd:(.*)$/);
    if (type && type[1]) {
      return type[1].toLowerCase();
    }
  }
};

const propertyTypes = Object.keys(propertyToName);

export const parseTTL = ttlString => new Promise((res, err) => {
  getQuads(ttlString)
    .then(({quads, prefixes}) => {
      res({
        data: parseQuads(quads, Object.assign(possiblePrefixes, invertObj(prefixes))),
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

const getWithPrefix = curry((prefixes, iri) => {
  for (let key of keys(prefixes)) {
    if (iri && iri.includes(key)) {
      return `${prefixes[key]}:${iri.replace(key, '')}`;
    }
  }
  return iri;
});

const parseQuads = (quads, prefixes) => {
  const prefixed = getWithPrefix(prefixes);
  const predicateSpecIRI = prefixed('http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate');
  const hasWeightIRI = prefixed('http://onto.fel.cvut.cz/ontologies/dataset-descriptor/s-p-o-summary/hasWeight');
  const typeIRI = prefixed('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
  const objectSpecIRI = prefixed('http://www.w3.org/1999/02/22-rdf-syntax-ns#object');
  const subjectSpecIRI = prefixed('http://www.w3.org/1999/02/22-rdf-syntax-ns#subject');

  const edgePredicates = [predicateSpecIRI, hasWeightIRI, objectSpecIRI, subjectSpecIRI];
  const isEdge = quad => edgePredicates.includes(quad.predicate.id);
  quads.forEach(quad => {
    quad.object.id = prefixed(quad.object.id);
    quad.subject.id = prefixed(quad.subject.id);
    quad.predicate.id = prefixed(quad.predicate.id);
  });

  const getDataProperty = (quad, classMapping) => {
    if (quad.predicate.id !== objectSpecIRI) {
      return null;
    }

    const classType = classMapping[quad.object.value];

    const possibleProp = [quad.object.datatypeString, quad.object.id, classType];
    return possibleProp.find(p => propertyToName[p] || propertyToName.customMatch(p));
  };


  /** Will look like:
   const classes = {
      [className]: {
        properties: [{ predicate: type }],
        methods: [{predicateName, objectClass}]
      }
    }
  **/
  const classes = {};

  // {
  //   [blankNodeId]: className
  // }
  const classMapping = quads.reduce((acc, quad) => {
    if (quad.predicate.id === typeIRI) {
      // Empty node --> className mapping
      acc[quad.subject.value] = quad.object.id;

      // ObjectId is type
      if (!propertyTypes.includes(quad.object.id) && !propertyToName.customMatch(quad.object.id)) {
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
