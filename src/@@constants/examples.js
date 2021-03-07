const endpointURL = 'https://data.gov.cz/sparql';

export const examples = [
  {
    dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/spo-job-applicants.ttl',
    endpointURL,
    title: 'Single'
  },
  {
    dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/spo-court.ttl',
    endpointURL,
    title: 'Court example'
  },
  {
    dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/data.gov.cz.ttl',
    endpointURL,
    title: 'Gov example'
  }
];
