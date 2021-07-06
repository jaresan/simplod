/**
 * @file Actions to be invoked during app lifecycle, e.g. startup, exit, when data is changed.
 * @module @@actions/lifecycle
 **/
import hotkeys from 'hotkeys-js';
import { dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import { mapObjIndexed, view } from 'ramda';
import { loadLocalData, loadLocalSettings } from '@@actions/load';
import { saveData } from '@@actions/save';
import { onSolidStart } from '@@actions/solid/lifecycle';

/**
 * Used to setup the application on start. Hotkeys, state loading, pre data fetching initialization goes here.
 */
export const onAppStart = () => {
  hotkeys('command+s,ctrl+s', e => {
    e.preventDefault()
    saveData();
  });

  hotkeys('command+l,ctrl+l', e => {
    e.preventDefault()
    loadLocalData();
  });

  loadLocalSettings();
  return onSolidStart();
};

/**
 * Parses new data when a new data schema is loaded. Aggregates propertyIds under their respective subjects.
 */
export const onDataLoaded = () => {
  const state = getState();
  const properties = view(ModelState.properties, state);
  const propsById = Object.entries(properties).reduce((acc, [id, p]) => {
    const subjectId = p.source;
    const existing = acc[subjectId] || [];

    return Object.assign(acc, {[subjectId]: existing.concat(id)});
  }, {});

  const newClasses = mapObjIndexed((c, id) => Object.assign(c, {propertyIds: propsById[id], id}), view(ModelState.classes, state));
  dispatchSet(ModelState.classes, newClasses);
}
