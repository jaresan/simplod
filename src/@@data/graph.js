import {keys, all, prop, groupBy, mergeWith, concat, complement, fromPairs} from 'ramda';

const isObjectProperty = complement(prop('dataProperty'));

export const getConnectedEntities = (p, edgesByNode) => {
  const stack = p;
  let reachableNodes = {};
  while (stack.length) {
    const {target, source, dataProperty} = stack.pop();
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

  const queriedEntities = fromPairs(entityIds.map(id => [id, true]));
  properties
    .forEach(p => {
      if (!p.dataProperty) {
        queriedEntities[p.target] = true;
      }
      queriedEntities[p.source] = true;
    });


  const objectProperties = properties.filter(isObjectProperty);
  const edgesBySource = groupBy(prop('source'), objectProperties);
  const edgesByTarget = groupBy(prop('target'), objectProperties);
  const edgesByEntity = mergeWith(concat, edgesBySource, edgesByTarget);

  const subGraph = objectProperties.length ? getConnectedEntities(Object.values(edgesByEntity)[0], edgesByEntity) : {[entityIds[0]]: true};
  return all(k => subGraph[k], keys(queriedEntities))
};
