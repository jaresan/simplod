import {keys, all, prop, groupBy, mergeWith, concat, filter, map, complement} from 'ramda';

export const getConnectedEntities = (p, edgesByNode) => {
  const stack = p;
  let reachableNodes = {};
  while (stack.length) {
    const {target, source, dataProperty, optional} = stack.pop();
    if (optional) {
      continue;
    }
    if (!reachableNodes[source]) {
      stack.push(...(edgesByNode[source] || []));
      reachableNodes[source] = true;
    }
    if (!reachableNodes[target] && !dataProperty) {
      stack.push(...(edgesByNode[target] || []));
      reachableNodes[target] = true;
    }
  }

  return reachableNodes;
};

export const isConnected = ({properties, entityIds}) => {
  if (!properties.length) {
    return entityIds.length <= 1;
  }

  const queriedEntities = entityIds.reduce((acc, id) => Object.assign(acc, {[id]: true}), {});
  properties
    .forEach(p => {
      if (!p.dataProperty) {
        queriedEntities[p.target] = true;
      }
      queriedEntities[p.source] = true;
    });


  const edgesBySource = groupBy(prop('source'), properties);
  const edgesByTarget = groupBy(prop('target'), properties);
  const edgesByEntity = mergeWith(concat, edgesBySource, edgesByTarget);

  const subGraph = getConnectedEntities(Object.values(edgesByEntity)[0], edgesByEntity);
  return all(k => subGraph[k], keys(queriedEntities))
};
