const { prefix } = require('./parsePrefix');
const { Parser, DataFactory, Store } = require('n3');
const { namedNode } = DataFactory;
const { get } = require('axios');
const { RdfXmlParser } = require('rdfxml-streaming-parser');

const tryParseXML = txt => new Promise((res, err) => {
  const myParser = new RdfXmlParser();

  const quads = [];
  myParser
    .on('data', q => quads.push(q))
    .on('error', err)
    .on('end', () => res(quads));

  myParser.write(txt);
  myParser.end();
});

const tryParseTTL = txt => new Promise((res, err) => {
  const parser = new Parser();
  const quads = [];

  parser.parse(txt, (error, quad) => {
    if (quad) {
      quads.push(quad);
    } else if (!error) {
      res(quads);
    } else {
      err(error);
    }
  });
});

const getFullIri = (prefixes, iri) => {
  const [prefix, suffix] = iri.split(':');
  if (!suffix) {
    return iri;
  } else {
    return `${prefixes[prefix]}${suffix}`;
  }
};

const dataMapping = {
  label: namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
  description: namedNode('http://www.w3.org/2000/01/rdf-schema#comment')
}
const getData = (quads, prefixes) => {
  quads = quads.map(q => {delete q.graph; return q;});
  const store = new Store(quads);

  return Object.entries(dataMapping).reduce((acc, [key, predicate]) => {
    const quads = store.getQuads(null, predicate, null);
    quads.forEach(({subject, object}) => {
      const subjectId = prefix(prefixes, subject.value);
      const language = object.language || 'default';
      acc[subjectId] = (acc[subjectId] || {});
      acc[subjectId][language] = (acc[subjectId][language] || {});
      acc[subjectId][language][key] = object.value;
    });

    return acc;
  }, {});
};

const downloadHumanReadableData = async (url, prefixToIri, iriToPrefix) => {
  try {
    const {data} = await get(getFullIri(prefixToIri, url), {headers: {Accept: 'text/turtle'}});
    // console.log('Downloaded ttl:', data.length, data);
    // console.log('parsing');
    const quads = await tryParseXML(data).catch(() => tryParseTTL(data));
    // console.log('Parsed quads');
    // console.log('Getting labels:', quads.length);
    return getData(quads, iriToPrefix);
  } catch (e) {
    // console.log('failed');
    console.error(e);

    // Swallow the exception and return empty mapping
    return Promise.resolve({});
  }
};

const getHumanReadableDataForUrls = async (urls, prefixToIri, iriToPrefix) => {
  return await urls.reduce(async (acc, url) => {
    acc = await acc;
    if (!acc[url]) {
      const data = await downloadHumanReadableData(url, prefixToIri, iriToPrefix);
      return Object.assign(acc, data);
    }

    return acc;
  }, {});
};

export const fetchLabels = async ({urls, prefixToIri, iriToPrefix}) => await getHumanReadableDataForUrls(urls, prefixToIri, iriToPrefix);
