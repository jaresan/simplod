import {parseTTL} from './parseTTL';
import chai from 'chai';

chai.should();

describe('parseTTL', () => {
  it('should parse file', async () => {
    const rdf = `# Prefixes
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix bibo: <http://purl.org/ontology/bibo/> .
@prefix dcterm: <http://purl.org/dc/terms/> .
@prefix xml: <http://www.w3.org/2001/XMLSchema#> .

<urn:uuid:1cf291d4-a8ca-478f-bb67-44f4a1738d31> #1
  <rdf:subject> <bibo:Collection/instance>; #2
  <rdf:predicate> <dcterm:hasPart>; #3
  <rdf:object> <bibo:Collection/instance> . #4

<urn:uuid:1cf291d4-a8ca-478f-bb67-44f4a1738d32>
  <rdf:subject> <bibo:Collection/instance>;
  <rdf:predicate> <dcterm:title>;
  <rdf:object> <xml:String> .

<urn:uuid:1cf291d4-a8ca-478f-bb67-44f4a1738d33>
  <rdf:subject> <bibo:Collection/instance>;
  <rdf:predicate> <dcterm:owner>;
  <rdf:object> <dcterm:Actor/instance> .

<urn:uuid:1cf291d4-a8ca-478f-bb67-44f4a1738d34>
  <rdf:subject> <dcterm:Actor/instance>;
  <rdf:predicate> <dcterm:title>;
  <rdf:object> <xml:String> .

<bibo:Collection/instance> a <bibo:Collection> . #5
<dcterm:Actor/instance> a <dcterm:Actor> . #5
`;
    const result = await parseTTL(rdf);
    result.should.eql({
      data: {
        'bibo:Collection': {
          properties: [],
          methods: [
            {
              predicate: 'dcterm:hasPart',
              object: 'bibo:Collection',
              weight: undefined
            },
            {
              predicate: 'dcterm:title',
              object: 'xml:String',
              weight: undefined
            },
            {
              predicate: 'dcterm:owner',
              object: 'dcterm:Actor',
              weight: undefined
            }
          ]
        },
        'dcterm:Actor': {
          properties: [],
          methods: [
            {
              predicate: 'dcterm:title',
              object: 'xml:String',
              weight: undefined
            }
          ]
        }
      },
      __prefixes__: {
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        bibo: 'http://purl.org/ontology/bibo/',
        dcterm: 'http://purl.org/dc/terms/',
        xml: 'http://www.w3.org/2001/XMLSchema#'
      }
    });
  });
});
