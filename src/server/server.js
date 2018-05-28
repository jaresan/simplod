const express = require('express');
const { parseSPO } = require('./parseSPO');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/turtleExample', async (req, res) => {
  const ttlString = await fs.readFileSync(`${__dirname}/../ttl/spo-court.ttl`, 'utf-8');
  parseSPO(ttlString)
    .then(data => res.json(data));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
