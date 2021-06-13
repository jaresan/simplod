const endpointURL = 'https://data.gov.cz/sparql';

export const examples = [
  {
    dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/spo-job-applicants.ttl',
    endpointURL,
    title: 'Single'
  },
  {
    dataSchemaURL: 'https://jaresan.github.io/simplod/examples/opendata.ttl',
    endpointURL: 'http://linked.opendata.cz/sparql',
    title: 'Court example'
  },
  {
    dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/data.gov.cz.ttl',
    endpointURL,
    title: 'Gov example'
  },
  {
    dataSchemaURL: 'https://jaresan.github.io/simplod/examples/nobel_prizes.ttl',
    endpointURL: 'http://data.nobelprize.org/sparql',
    title: 'Nobel prizes'
  }
];
