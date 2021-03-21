import {getConnectedEntities, isConnected} from '@@data/graph';
import chai from 'chai';

chai.should();

describe('@@data/graph', () => {
  describe('getConnectedEntities()', () => {
    // Two components
    const edges = {
      a: [{source: 'a', target: 'c'}, {source: 'b', target: 'a'}],
      b: [{source: 'b', target: 'a'}],
      c: [{source: 'a', target: 'c'}],
      d: [{source: 'd', target: 'e'}],
      e: [{source: 'd', target: 'e'}]
    }

    it('should return connected component for provided property', () => {
      getConnectedEntities({source: 'a', target: 'b'}, edges).should.eql({a: true, b: true, c: true});
      getConnectedEntities({source: 'd', target: 'e'}, edges).should.eql({d: true, e: true});
    });
  });

  describe('isConnected()', () => {
    it('should consider graph not connected when there are two connected components', () => {
      const properties = [{source: 'a', target: 'c'}, {source: 'b', target: 'a'}, {source: 'd', target: 'e'}];
      const entityIds = ['a', 'b', 'c', 'd', 'e'];
      isConnected({properties, entityIds}).should.eql(false);
    });

    it('should consider graph not connected when querying entities that have no edges', () => {
      const properties = [{source: 'a', target: 'c'}, {source: 'b', target: 'a'}];
      const entityIds = ['a', 'b', 'c', 'd'];
      isConnected({properties, entityIds}).should.eql(false);
    });

    it('should consider graph connected when there is a path between all entities', () => {
      const properties = [{source: 'a', target: 'c'}, {source: 'b', target: 'a'}, {source: 'c', target: 'b'}];
      const entityIds = ['a', 'b', 'c'];
      isConnected({properties, entityIds}).should.eql(true);
    });

    it('should consider graph not connected when only entities are being selected', () => {
      isConnected({properties: [], entityIds: ['a', 'b']}).should.eql(false);
    });

    it('should not take data properties into account as edges connecting the graph', () => {
      isConnected({properties: [
          {source: 'a', target: 'b', dataProperty: true},
          {source: 'c', target: 'b', dataProperty: true}
        ], entityIds: []}).should.eql(false);
    });

    it('should consider graph disconnected when querying data properties of two different entities', () => {
      isConnected({properties: [
          {source: 'a', target: 'str', dataProperty: true},
          {source: 'b', target: 'str', dataProperty: true}
        ], entityIds: []}).should.eql(false);
    });

    it('should graph mark as not connected when using optional properties', () => {
      const data = {
        'properties': [
          {
            'target': 'owl:Ontology',
            'source': 'prov:Entity',
            'optional': true
          },
          {
            'target': 'rdf:langString',
            'source': 'owl:Ontology',
            'dataProperty': true
          },
          {
            'target': 'lex:Court_1',
            'source': 'prov:Entity',
            'varName': 'Court_1'
          }
        ],
        'entityIds': [
          'prov:Entity',
          'owl:Ontology'
        ]
      };
      isConnected(data).should.eql(false);
      isConnected({
        properties: [
          {source: 'b', target: 'a'},
          {source: 'b', target: 'c', optional: true},
          {source: 'c', target: 'xsd:string', dataProperty: true}
        ],
        entityIds: ['b', 'c']
      }).should.eql(false);
    });
  });
});
