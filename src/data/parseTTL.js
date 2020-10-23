import {Parser} from 'n3';
import { assocPath, invertObj, keys } from 'ramda';
import possiblePrefixes from '../constants/possiblePrefixes';

export const parseTTL = ttlString => new Promise((res, err) => {
  getQuads(ttlString)
    .then(({quads, prefixes}) => {
      const {data, usedPrefixes} = parseQuads(quads, Object.assign(possiblePrefixes, invertObj(prefixes)));
      res({
        data,
        __prefixes__: usedPrefixes
      });
    });
});

const parsePrefix = (prefixes, iri) => {
  try {
    const url = new URL(iri);
    if (!url.host) {
      return iri;
    }
  } catch (e) {
    // Bad URL
    return iri;
  }

  const suffix = iri.replace(/.*(\/|#)/, '');
  const prefixIri = iri.replace(/(\/|#)[^/#]*$/, '$1');
  const alias = prefixes[prefixIri] || 'ns';

  return {
    alias,
    suffix,
    prefixIri
  }
};

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

const parseQuads = (quads, prefixes) => {
  const usedPrefixes = {};
  const usedAliases = {};
  let prefix = iri => {
    // TODO: Very slow implementation
    for (let key of keys(prefixes)) {
      if (iri && iri.includes(key)) {
        return `${prefixes[key]}:${iri.replace(key, '')}`;
      }
    }

    const {alias, prefixIri, suffix} = parsePrefix(prefixes, iri);

    if (!alias) {
      return iri;
    }

    let i = 0;
    let newAliasRoot = alias;
    let newAlias = newAliasRoot;
    while (usedAliases[newAlias] && usedAliases[newAlias] !== prefixIri) {
      newAlias = `${newAliasRoot}${i++}`;
    }
    usedAliases[newAlias] = prefixIri;
    usedPrefixes[prefixIri] = newAlias;

    return `${newAlias}:${suffix}`;
  };
  const predicateSpecIRI = prefix('http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate');
  const hasWeightIRI = prefix('http://onto.fel.cvut.cz/ontologies/dataset-descriptor/s-p-o-summary/hasWeight');
  const typeIRI = prefix('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
  const objectSpecIRI = prefix('http://www.w3.org/1999/02/22-rdf-syntax-ns#object');
  const subjectSpecIRI = prefix('http://www.w3.org/1999/02/22-rdf-syntax-ns#subject');

  const edgePredicates = [predicateSpecIRI, hasWeightIRI, objectSpecIRI, subjectSpecIRI];
  const isEdge = quad => edgePredicates.includes(quad.predicate.id);
  quads.forEach(quad => {
    quad.object.id = prefix(quad.object.id);
    quad.subject.id = prefix(quad.subject.id);
    quad.predicate.id = prefix(quad.predicate.id);
  });

  // {
  //   [blankNodeId]: className
  // }
  const classMapping = quads.reduce((acc, quad) => {
    if (quad.predicate.id === typeIRI) {
      // Empty node --> className mapping
      acc[quad.subject.value] = quad.object.id;
    }
    return acc;
  }, { });


  const predicateKeys = {
    [predicateSpecIRI]: 'predicate',
    [objectSpecIRI]: 'object',
    [subjectSpecIRI]: 'subject',
    [hasWeightIRI]: 'weight'
  };

  const edges = Object.values(
    quads.filter(isEdge).reduce((acc, quad) => {
      let predicateId = '';
      let key = '';
      let value = '';

      predicateId = quad.subject.id;
      key = predicateKeys[quad.predicate.id];
      value = classMapping[quad.object.value] || quad.object.value;

      acc = assocPath([predicateId, key], value, acc);

      return acc;
    }, { })
  );

  const hasOutgoingEdges = edges.reduce((acc, {subject}) => Object.assign(acc, {[subject]: true}), {});

  // Populated classes with existing outgoing relationships (no outgoing relationships --> data property)
  const data = edges
    .filter(({subject}) => hasOutgoingEdges[subject])
    .reduce((acc, {predicate, object, weight, subject}) => {
      if (!acc[subject]) {
        acc[subject] = {
          properties: [],
          methods: []
        };
      }

      // Data property
      if (!hasOutgoingEdges[object]) {
        acc[subject].properties.push({predicate, type: object});
      } else {
        acc[subject].methods.push({predicate, object, weight});
      }

      return acc;
  }, {});

  return {data, usedPrefixes};
};
