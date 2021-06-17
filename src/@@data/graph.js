import {
  keys,
  all,
  prop,
  groupBy,
  mergeWith,
  concat,
  complement,
  fromPairs,
  partition,
  omit,
  mergeRight,
  mergeDeepRight
} from 'ramda';

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

export const expandRoot = ({n, propertiesBySource, expandedEdges = {}, expandedNodes = {}, classes}) => {
  if (expandedNodes[n.id]) {
    return expandedNodes[n.id];
  }

  const [dataProperties, objectProperties] = partition(prop('dataProperty'), propertiesBySource[n.id]);

  const edgesToExpand = omit(keys(expandedEdges), objectProperties);

  let currentExpandedEdges = mergeRight(expandedEdges, edgesToExpand);
  let currentExpandedNodes = mergeRight({
    [n.id]: true
  }, expandedNodes);

  const preventExpanding = {};
  for (let [edgeId, edge] of Object.entries(edgesToExpand)) {
    if (currentExpandedNodes[edge.target]) {
      preventExpanding[edgeId] = {shouldExpand: false};
      continue;
    }

    const expanded = expandRoot({
      n: classes[edge.target],
      propertiesBySource,
      expandedEdges: currentExpandedEdges,
      expandedNodes: currentExpandedNodes,
      classes,
    });

    currentExpandedEdges = mergeRight(currentExpandedEdges, expanded.root.edges);
    currentExpandedNodes = mergeRight(currentExpandedNodes, expanded.nodes);
  }

  const root = {
    id: n.id,
    type: n.type,
    varName: n.varName,
    dataProperties,
    edges: mergeDeepRight(edgesToExpand, preventExpanding)
  };
  return {
    nodes :{
      ...currentExpandedNodes,
      [n.id]: root
    },
    root
  }
};
