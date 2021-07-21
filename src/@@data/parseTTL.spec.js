import {parseTTL} from './parseTTL';
import { should } from 'chai';
import fs from 'fs';
import path from 'path';

import govExampleResult from './testData/data.gov.cz.sparql.results.json';
import biboResult from './testData/bibo.result.json';

should();

describe('parseTTL', () => {
  it('should parse bibo file', async () => {
    const rdf = fs.readFileSync(path.join(__dirname, './testData/bibo.ttl'), 'utf-8');
    const result = await parseTTL(rdf);
    result.should.eql(biboResult);
  });

  it('should parse data gov file', async () => {
    const rdf = fs.readFileSync(path.join(__dirname, './testData/data.gov.cz.sparql.ttl'), 'utf-8');
    const result = await parseTTL(rdf);
    result.should.eql(govExampleResult);
  });
});
