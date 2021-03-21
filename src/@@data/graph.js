import {keys, all, prop, groupBy, mergeWith, concat} from 'ramda';

export const getConnectedEntities = (p, edgesByEntity) => {
  const stack = [p];
  let appearingEntities = {};
  while (stack.length) {
    const {target, source, dataProperty, optional} = stack.pop();
    if (optional) {
      continue;
    }
    if (!appearingEntities[source]) {
      stack.push(...(edgesByEntity[source] || []));
      appearingEntities[source] = true;
    }
    if (!appearingEntities[target] && !dataProperty) {
      stack.push(...(edgesByEntity[target] || []));
      appearingEntities[target] = true;
    }
  }

  return appearingEntities;
};

export const isConnected = ({properties, entityIds}) => {
  if (!properties.length) {
    return entityIds.length <= 1;
  }

  const appearingEntities = entityIds.reduce((acc, id) => Object.assign(acc, {[id]: true}), {});
  properties
    .reduce((acc, p) => {
      if (!p.dataProperty) {
        acc[p.target] = true;
      }
      acc[p.source] = true;
      return acc;
    }, appearingEntities);


  const edgesBySource = groupBy(prop('source'), properties);
  const edgesByTarget = groupBy(prop('target'), properties);
  const edgesByEntity = mergeWith(concat, edgesBySource, edgesByTarget);

  const subGraph = getConnectedEntities(properties[0], edgesByEntity);
  return all(k => subGraph[k], keys(appearingEntities))
};
