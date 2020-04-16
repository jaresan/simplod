import G6 from '@antv/g6';
import {flatten, values} from 'ramda';
import {setState} from './setState';
const EDGE_TYPE = 'graphEdge';

const stateStyles = {
  default: {
    'edge-shape': {
      stroke: '#666',
      lineWidth: 1,
      opacity: 0.4
    },
    'text-shape': {
      opacity: 0.4,
      lineWidth: 1,
      stroke: '#666'
    }
  },
  selected: {
    'edge-shape': {
      stroke: 'steelblue',
      lineWidth: 30,
      opacity: 1
    },
    'text-shape': {
      stroke: 'black',
      opacity: 1
    }
  },
  inRelation: {
    'edge-shape': {
      stroke: 'steelblue',
      lineWidth: 3,
      opacity: 1
    },
    'text-shape': {
      stroke: 'black',
      opacity: 1
    }
  },
  notInRelation: {
    'edge-shape': {
      opacity: 0.1,
      stroke: '#666',
      lineWidth: 1
    },
    'text-shape': {
      opacity: 0.1
    },
  }
};

const EdgeImplementation = {
  setState: setState(stateStyles)
};

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
        weight
      })
    }
    return acc;
  }, {}))));

G6.registerEdge(EDGE_TYPE, EdgeImplementation, 'line');
