const express = require('express');
const { parseSPO } = require('./parseSPO');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser());

app.get('/api/test', (req, res) => {
	res.send({ api: 'running' });
});

app.get('/api/hardExample', async (req, res) => {
	const ttlString = await fs.readFileSync(`${__dirname}/ttl/spo-court.ttl`, 'utf-8');
	parseSPO(ttlString)
		.then(data => res.json(data));
});

app.get('/api/easyExample', async (req, res) => {
	const ttlString = await fs.readFileSync(`${__dirname}/ttl/spo-job-applicants.ttl`, 'utf-8');
	parseSPO(ttlString)
		.then(data => res.json(data));
});

const sparqlHandler = method => async (req, res) => {
  const paramField = method === 'POST' ? 'body' : 'query';
  const {
    endpoint,
    query
  } = req[paramField];

  const targetUrl = `${endpoint}?query=${encodeURIComponent(query)}`;

  const result = await fetch(targetUrl, { method }).then(res => res.text());

  res.send(result);
};

app.get('/api/sparql', sparqlHandler('GET'));
app.post('/api/sparql', sparqlHandler('POST'));

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(__dirname + '/../build'));
} else {
  app.use(express.static(path.join(__dirname, 'public')))
}

app.get('/index', (req, res) => {
  const {
    endpointURL,
    ttlURL
  } = req.query;

  const index = fs.readFileSync(path.join(__dirname+'/../build/index.html'), { encoding: 'utf8' });

  const withVars = index
    .replace('__endpoint_url__', endpointURL)
    .replace('__ttl_url__', ttlURL);

  res.send(withVars);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/../build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
