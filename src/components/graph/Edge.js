import G6 from '@antv/g6';
import {flatten, values} from 'ramda';
import entityTypes from '../../constants/entityTypes';
const EDGE_TYPE = 'graphEdge';

export const Edge = data => ({
  ...data,
  type: EDGE_TYPE
});
export const getEdges = data => flatten(Object.entries(data).map(([id, {methods}]) =>
  values(methods.reduce((acc, {predicate, object, weight}) => {
    const targetId = object;
    if (acc[targetId]) {
      acc[targetId].weight += weight;
    } else {
      acc[targetId] = Edge({
        source: id,
        target: targetId,
        predicate,
        weight,
        data: {
          source: id,
          target: targetId,
          type: entityTypes.edge
        }
      })
    }
    return acc;
  }, {}))));

G6.registerEdge(EDGE_TYPE, {}, 'line');
