/**
 * File containing logic for saving/loading application data.
 */
import { dispatch, dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import { view, mergeDeepRight } from 'ramda';
import { getLastLocalState, saveLocalState } from '@@storage';
import { Graph } from '@@graph';
import { classes } from '@@app-state/model/state';

export const generateSaveData = () => {

  const bBoxesById = Graph.getBBoxesById();
  dispatch(ModelState.setBoundingBoxes(bBoxesById));
  return {model: view(ModelState.rootLens, getState())};
}

const getLoadData = json => json.model;

export const clearLocalSettings = () => saveLocalState({settings: {}});

export const updateLocalSettings = update => {
  const {settings} = getLastLocalState();
  saveLocalState({settings: mergeDeepRight(settings, update)});
}

export const loadLocalSettings = () => {
  const settings = getLastLocalState().settings;
  if (settings) {
    dispatchSet(SettingsState.rootLens, settings);
  }
}

export const saveDataLocally = () => {
  dispatchSet(SettingsState.lastSave, Date.now());
  saveLocalState(generateSaveData());
}

export const loadData = json => {
  const newData = getLoadData(json);
  Graph.reset();
  dispatchSet(ModelState.rootLens, newData);
  Graph.updatePositions(view(classes, getState()));
}

export const loadLocalData = () => loadData(getLastLocalState());
