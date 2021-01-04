import { assoc, compose, lens, lensProp, prop } from 'ramda';
import { saveSettingsLocally } from '@@actions/save-load';

export const initial = {
  language: navigator.language,
  loadingHumanReadable: 0,
  showHumanReadable: false,
  limitEnabled: false,
  limit: 100,
  lastSave: 0
};

const root = 'settings';
export const rootLens = lens(prop(root), (toSet, state) => {
  const res = assoc(root, toSet, state);
  saveSettingsLocally(res);
  return res;
});

const forKey = k => compose(rootLens, lensProp(k));

export const lastSave = forKey('lastSave');
export const labelsLoadingProgress = forKey('labelsLoadingProgress');
export const limit = forKey('limit');
export const limitEnabled = forKey('limitEnabled');
export const showHumanReadable = forKey('showHumanReadable');
export const language = forKey('language');
