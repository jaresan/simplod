import G6 from '@antv/g6';
import {flatten, values} from 'ramda';
import entityTypes from '../../constants/entityTypes';
const EDGE_TYPE = 'graphEdge';

export const Edge = data => ({
  ...data,
  type: EDGE_TYPE
});

export const getEdges = data => {
  const existingEdges = {};
  const res = Object.entries(data).map(([sourceId, {methods}]) =>
    values(methods.reduce((acc, {object: targetId}) => {
      // Prevent duplicates for the same source-target pair
      if (existingEdges[`${sourceId}`] === targetId || existingEdges[`${targetId}`] === sourceId) {
        return acc;
      }
      existingEdges[sourceId] = targetId;
      return Object.assign(acc, {
        [targetId]: Edge({
          source: sourceId,
          target: targetId,
          data: {
            source: sourceId,
            target: targetId,
            type: entityTypes.edge
          }
        })
      })
    }, {})));

  return flatten(res);
}

G6.registerEdge(EDGE_TYPE, {}, 'line');
