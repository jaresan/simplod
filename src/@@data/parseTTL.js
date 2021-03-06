import { Parser } from 'n3';
import { invertObj } from 'ramda';
import possiblePrefixes from '@@constants/possible-prefixes';
import { parsePrefix } from './parsePrefix';

export const parseTTL = ttlString =>
  getQuads(ttlString)
    .then(({quads, prefixes}) => {
      const {data, usedPrefixes} = parseQuads(quads, Object.assign(possiblePrefixes, invertObj(prefixes)));
      return {
        data,
        __prefixes__: Object.assign(usedPrefixes, invertObj(prefixes))
      };
    });

const getQuads = ttlString => new Promise((res, err) => {
  const parser = new Parser();
  const quads = [];

  parser.parse(ttlString, (error, quad, prefixes) => {
    error && err(error);
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
    if (iri.match(/\/instance$/)) return iri;
    try {
      const url = new URL(iri);
      if (!url.host) {
        return iri;
      }
    } catch (e) {
      // Bad URL
      return iri;
    }

    const {alias, prefixIri, suffix} = parsePrefix(prefixes, iri);

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

  const classMapping = {
    // {
    //   [blankNodeId]: className
    // }
  };
  quads.forEach(quad => {
    quad.object.id = prefix(quad.object.id);
    quad.subject.id = prefix(quad.subject.id);
    quad.predicate.id = prefix(quad.predicate.id);
    if (quad.predicate.id === typeIRI) {
      // Empty node --> className mapping
      classMapping[quad.subject.id] = quad.object.id;
    }
  });


  const predicateKeys = {
    [predicateSpecIRI]: 'predicate',
    [objectSpecIRI]: 'object',
    [subjectSpecIRI]: 'subject',
    [hasWeightIRI]: 'weight'
  };

  let edges = Object.values(
    quads.filter(isEdge).reduce((acc, quad) => {
      const predicateId = quad.subject.id;
      const key = predicateKeys[quad.predicate.id];
      const value = classMapping[quad.object.id] || quad.object.id;

      acc[predicateId] = acc[predicateId] || {};
      Object.assign(acc[predicateId], {[key]: value});

      return acc;
    }, {})
  );

  const existingEdges = {};
  edges = edges.filter(({subject, predicate, object}) => {
    const exists = existingEdges[`${subject}${predicate}${object}`];
    existingEdges[`${subject}${predicate}${object}`] = true;
    return !exists;
  });

  const hasOutgoingEdges = edges.reduce((acc, {subject}) => Object.assign(acc, {[subject]: true}), {});

  // Populated classes with existing outgoing relationships (no outgoing relationships --> data property)
  const data = edges
    .filter(({subject}) => hasOutgoingEdges[subject])
    .reduce((acc, {predicate, object, subject}) => {
      if (!acc[subject]) {
        acc[subject] = {
          dataProperties: {},
          objectProperties: {}
        };
      }

      // Data property
      if (!hasOutgoingEdges[object]) {
        if (!acc[subject].dataProperties[predicate]) {
          acc[subject].dataProperties[predicate] = [];
        }
        acc[subject].dataProperties[predicate].push(object);
      } else {
        if (!acc[subject].objectProperties[predicate]) {
          acc[subject].objectProperties[predicate] = [];
        }
        acc[subject].objectProperties[predicate].push(object);
      }

      return acc;
    }, {});

  return {data, usedPrefixes};
};
