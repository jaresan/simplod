/**
 * @file Definition of state keys for controls
 * @module @@app-state/controls
 */
import { compose, lensProp } from 'ramda';

export const initial = {
  selectedEdgePropertyIds: [],
  importingModelFile: false,
  labelsLoadingProgress: 0,
  loaded: true,
};

const root = 'controls';
export const rootLens = lensProp(root);

const forKey = k => compose(rootLens, lensProp(k));

export const selectedEdgePropertyIds = forKey('selectedEdgePropertyIds');
export const importingModelFile = forKey('importingModelFile');
export const labelsLoadingProgress = forKey('labelsLoadingProgress');
export const loaded = forKey('loaded');
