const express = require('express');
const { parseSPO } = require('./parseSPO');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

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


app.use(express.static(__dirname+'/../build'));
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/../build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
