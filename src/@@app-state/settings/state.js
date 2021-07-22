/**
 * @file Definition of state keys for settings
 * @module @@app-state/settings
 */
import { assoc, compose, lens, lensProp, prop } from 'ramda';

export const initial = {
  language: navigator.language,
  labelLanguage: navigator.language,
  showHumanReadable: true,
  limitEnabled: true,
  limit: 100,
  lastSave: 0,
  horizontalLayout: true
};

const root = 'settings';
export const rootLens = lensProp(root);

/**
 * Taking a key, changes to this key get automatically saved to the local storage
 * @function
 * @param k
 */
const withAutoSave = k => compose(rootLens, lens(prop(k), (toSet, state) => {
  const newSettings = assoc(k, toSet, state);

  // Require directly to prevent circular dependencies
  require('@@actions/save').updateLocalSettings({[k]: toSet});
  return newSettings;
}));

export const lastSave = withAutoSave('lastSave');
export const limit = withAutoSave('limit');
export const limitEnabled = withAutoSave('limitEnabled');
export const showHumanReadable = withAutoSave('showHumanReadable');
export const language = withAutoSave('language');
export const labelLanguage = withAutoSave('labelLanguage');
export const horizontalLayout = withAutoSave('horizontalLayout');
