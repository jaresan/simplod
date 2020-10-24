import {parseTTL} from './parseTTL';
import chai from 'chai';
import fs from 'fs';
import path from 'path';

chai.should();

describe('parseTTL', () => {
  it('should parse bibo file', async () => {
    const rdf = fs.readFileSync(path.join(__dirname, './tests/bibo.ttl'), 'utf-8');
    const result = await parseTTL(rdf);
    result.should.eql(require(path.join(__dirname, './tests/bibo.result.js')));
  });

  it('should parse data gov file', async () => {
    const rdf = fs.readFileSync(path.join(__dirname, './tests/data.gov.cz.sparql.ttl'), 'utf-8');
    const result = await parseTTL(rdf);
    result.should.eql(require(path.join(__dirname, './tests/data.gov.cz.sparql.results.json')));
  });
});
