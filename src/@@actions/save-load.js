/**
 * File containing logic for saving/loading application data.
 */
import { dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import { view, mergeDeepRight } from 'ramda';
import { getLastLocalState, saveLocalState } from '@@storage';

export const getSaveData = () => ({model: view(ModelState.rootLens, getState())});
export const getLoadData = json => json.model;

export const clearLocalSettings = () => saveLocalState({settings: {}});

export const updateLocalSettings = update => {
  const {settings} = getLastLocalState();
  saveLocalState({settings: mergeDeepRight(settings, update)});
}

export const loadLocalSettings = () => {
  dispatchSet(SettingsState.rootLens, getLastLocalState().settings);
}

export const saveDataLocally = () => {
  dispatchSet(SettingsState.lastSave, Date.now());
  saveLocalState(getSaveData());
}

export const loadLocalData = () => {
  const lastState = getLastLocalState();
  dispatchSet(ModelState.rootLens, getLoadData(lastState));
}
