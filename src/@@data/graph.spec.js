import {getConnectedEntities, isASingleGraph} from '@@data/graph';
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
});
