import G6 from '@antv/g6';
import { flatten, values, concat, path, assocPath } from 'ramda';
import {entityTypes} from '@@constants/entity-types';
import {Edge as EdgeWrapper} from '@@graph/wrappers';
const EDGE_TYPE = 'graphEdge';

export const Edge = data => ({
  ...data,
  type: EDGE_TYPE
});

const getPropertyIds = ({sourceId, targetId}, objProperties = {}) => Object.entries(objProperties)
  .reduce((acc, [predicate, targets]) =>
      acc.concat(targets
        .filter(t => t === targetId)
        .map(target => `property_${sourceId}-${predicate}-${target}`)
      ), []);

export const getEdges = data => {
  let existingEdges = {};

  const res = Object.entries(data).map(([sourceId, {objectProperties}]) => {
    const targets = values(objectProperties).reduce(concat, []);

    return values(targets.reduce((acc, targetId) => {
      // Prevent duplicates for the same source-target pair
      if (sourceId === targetId || path([sourceId, targetId], existingEdges) || path([targetId, sourceId], existingEdges)) {
        return acc;
      }

      existingEdges = assocPath([sourceId, targetId], true, existingEdges);
      return Object.assign(acc, {
        [targetId]: Edge({
          source: sourceId,
          target: targetId,
          propertyIds: getPropertyIds({sourceId, targetId}, objectProperties).concat(getPropertyIds({sourceId: targetId, targetId: sourceId}, path([targetId, 'objectProperties'], data))),
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
