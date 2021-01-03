import G6 from '@antv/g6';
import {flatten, values, concat} from 'ramda';
import {entityTypes} from '@@model/entity-types';
import {Edge as EdgeWrapper} from './wrappers';
const EDGE_TYPE = 'graphEdge';

export const Edge = data => ({
  ...data,
  type: EDGE_TYPE
});

export const getEdges = data => {
  const existingEdges = {};
  const res = Object.entries(data).map(([sourceId, {objectProperties}]) => {
    const targets = values(objectProperties).reduce(concat, []);

    return values(targets.reduce((acc, targetId) => {
      // Prevent duplicates for the same source-target pair
      if (sourceId === targetId || existingEdges[sourceId] === targetId || existingEdges[targetId] === sourceId) {
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
    }, {}));
  });

  return flatten(res);
}

G6.registerEdge(EDGE_TYPE, {
  afterDraw(cfg, {cfg: {item}}) {
    item.set('wrapper', new EdgeWrapper(item));
  }
}, 'line');
