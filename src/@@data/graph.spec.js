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
      getConnectedEntities([{source: 'a', target: 'b'}], edges).should.eql({a: true, b: true, c: true});
      getConnectedEntities([{source: 'd', target: 'e'}], edges).should.eql({d: true, e: true});
    });
  });

  describe('isConnected()', () => {
    it('should consider graph connected with optional properties coming from the same source', () => {
      const properties = [{source: 'a', target: 'b', optional: true}, {source: 'a', target: 'c', optional: true}];
      const entityIds = ['a'];
      isConnected({properties, entityIds}).should.eql(true);
    });

    it('should consider graph connected with a single data property on a single entity', () => {
      const properties = [{source: 'a', target: 'b', dataProperty: true, optional: true}];
      const entityIds = ['a'];
      isConnected({properties, entityIds}).should.eql(true);
    });

    it('should consider graph not connected with two data properties on different entities', () => {
      const properties = [{source: 'a', target: 'str', dataProperty: true}, {source: 'b', target: 'str', dataProperty: true}];
      const entityIds = ['a'];
      isConnected({properties, entityIds}).should.eql(false);
    });

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

    it('should consider graph connected when there is a required path between all entities', () => {
      const properties = [{source: 'a', target: 'c'}, {source: 'b', target: 'a'}, {source: 'c', target: 'b'}];
      const entityIds = ['a', 'b', 'c'];
      isConnected({properties, entityIds}).should.eql(true);
    });

    it('should consider graph connected when there is an optional path between all entities', () => {
      const properties = [{source: 'a', target: 'c', optional: true}, {source: 'b', target: 'a', optional: true}, {source: 'c', target: 'b', optional: true}];
      const entityIds = ['a', 'b', 'c'];
      isConnected({properties, entityIds}).should.eql(true);
    });

    it('should consider graph not connected when entities not connected by a path are selected', () => {
      isConnected({properties: [], entityIds: ['a', 'b']}).should.eql(false);
    });

    it('should consider graph disconnected when querying data properties of two different entities', () => {
      isConnected({properties: [
          {source: 'a', target: 'str', dataProperty: true},
          {source: 'b', target: 'str', dataProperty: true}
        ], entityIds: []}).should.eql(false);
    });

    it('should consider graph connected when an edge between two queried nodes exists', () => {
      isConnected({properties: [
          {source: 'a', target: 'b', optional: true},
          {source: 'b', target: 'string', dataProperty: true}
        ], entityIds: []}).should.be.true;
    });
  });
});
