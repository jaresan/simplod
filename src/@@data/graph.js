/**
 * @file Helper functions for handling graph operations
 * @module @@data/graph
 */
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
  clone, assoc
} from 'ramda';

const isObjectProperty = complement(prop('dataProperty'));

/**
 * Returns all connected entities for a given property by following the edges.
 * @function
 * @param p
 * @param edgesByNode
 * @returns {{}}
 */
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

/**
 * Returns whether a graph consisting of given properties and entityIds is a connected component.
 * @function
 * @param properties
 * @param entityIds
 * @returns {*|(function(*=): (*))|boolean}
 */
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

  if (keys(queriedEntities).length === 1) {
    return true;
  }

  const subGraph = objectProperties.length ? getConnectedEntities(Object.values(edgesByEntity)[0], edgesByEntity) : {[entityIds[0]]: true};
  return all(k => subGraph[k], keys(queriedEntities))
};

/**
 * Performs a DFS to get all the nodes for the given graph starting with provided node.
 * @function
 * @param n
 * @param propertiesBySource
 * @param expandedEdges
 * @param expandedNodes
 * @param ancestors
 * @param classes
 * @returns {{nodes: {}, root: *}|{nodes: {}, root: (*&{dataProperties: *, edges: *|(function(*=): (*))})}}
 */
export const expandRoot = ({n, propertiesBySource, expandedEdges = {}, expandedNodes = {}, ancestors = {}, classes}) => {
  if (expandedNodes[n.id]) {
    return {
      nodes: expandedNodes,
      root: expandedNodes[n.id]
    };
  }

  const [dataProperties, objectProperties] = partition(prop('dataProperty'), propertiesBySource[n.id] || {});

  const edgesToExpand = omit(keys(expandedEdges), clone(objectProperties));

  let currentExpandedEdges = mergeRight(expandedEdges, edgesToExpand);
  let currentExpandedNodes = mergeRight({
    [n.id]: true
  }, expandedNodes);

  for (let [edgeId, edge] of Object.entries(edgesToExpand)) {
    if (ancestors[edge.target]) {
      edgesToExpand[edgeId].shouldExpand = false;
      continue;
    }

    ancestors = assoc(n.id, true, ancestors);
    const expanded = expandRoot({
      n: classes[edge.target],
      propertiesBySource,
      expandedEdges: currentExpandedEdges,
      expandedNodes: currentExpandedNodes,
      classes,
      ancestors
    });

    currentExpandedEdges = mergeRight(currentExpandedEdges, expanded.root.edges);
    currentExpandedNodes = mergeRight(currentExpandedNodes, expanded.nodes);
    edgesToExpand[edgeId].shouldExpand = true;
  }

  const root = {
    ...n,
    dataProperties,
    edges: edgesToExpand
  };
  return {
    nodes :{
      ...currentExpandedNodes,
      [n.id]: root
    },
    root
  }
};
