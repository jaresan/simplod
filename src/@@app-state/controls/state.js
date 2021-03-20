import { compose, lensProp } from 'ramda';

export const initial = {
  selectedEdgePropertyIds: []
};

const root = 'controls';
export const rootLens = lensProp(root);

const forKey = k => compose(rootLens, lensProp(k));

export const selectedEdgePropertyIds = forKey('selectedEdgePropertyIds');
export const selectedEdge = forKey('selectedEdge');
