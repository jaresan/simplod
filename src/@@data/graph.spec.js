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
  });
});
