import { assoc, compose, lens, lensProp, prop } from 'ramda';

export const initial = {
  language: navigator.language,
  labelsLoadingProgress: 0,
  showHumanReadable: false,
  limitEnabled: false,
  limit: 100,
  lastSave: 0
};

const root = 'settings';
export const rootLens = lensProp(root);

const forKey = k => compose(rootLens, lensProp(k));

const withAutoSave = k => compose(rootLens, lens(prop(k), (toSet, state) => {
  const newSettings = assoc(k, toSet, state);

  // Require directly to prevent circular dependencies
  require('@@actions/save-load').updateLocalSettings({[k]: toSet});
  return newSettings;
}));

export const lastSave = withAutoSave('lastSave');
export const labelsLoadingProgress = forKey('labelsLoadingProgress');
export const limit = withAutoSave('limit');
export const limitEnabled = withAutoSave('limitEnabled');
export const showHumanReadable = withAutoSave('showHumanReadable');
export const language = withAutoSave('language');
