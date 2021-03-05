/**
 * Contains actions to be invoked during app lifecycle, e.g. startup, exit, when data is changed.
 **/
import hotkeys from 'hotkeys-js';
import { dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import { mapObjIndexed, view } from 'ramda';
import { loadLocalSettings, saveData } from '@@actions/save-load';
import { onSolidStart } from '@@actions/solid/lifecycle';

/**
 * Used to setup the application on start. Hotkeys, state loading, pre data fetching initialization goes here.
 */
export const onAppStart = () => {
  hotkeys('command+s,ctrl+s', e => {
    e.preventDefault()
    saveData();
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
    // FIXME: @reference p.source
    const subjectId = p.source;
    const existing = acc[subjectId] || [];

    return Object.assign(acc, {[subjectId]: existing.concat(id)});
  }, {});

  // FIXME: @reference to set propertyIds
  const newClasses = mapObjIndexed((c, id) => Object.assign(c, {propertyIds: propsById[id]}), view(ModelState.classes, state));
  dispatchSet(ModelState.classes, newClasses);
}
