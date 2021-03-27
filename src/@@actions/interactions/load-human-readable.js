import { dispatch, dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import { invertObj, isEmpty, map, view } from 'ramda';
import * as YasguiState from '@@app-state/yasgui/state';
import * as SettingsState from '@@app-state/settings/state';
import { getHumanReadableDataPromises } from '@@api';
import { updateLanguageInfo } from '@@model/class-entity';

/**
 * Loads labels and comments for the existing entities in the application.
 */
export const loadHumanReadableData = () => {
  dispatchSet(SettingsState.labelsLoadingProgress, 0);
  const state = getState();
  const prefixes = view(ModelState.prefixes, state);
  const language = view(SettingsState.language, state);
  const prefixToIri = prefixes;
  const iriToPrefix = invertObj(prefixes);
  const urls = Object.keys(view(ModelState.classes, state));

  let resolved = 0;
  const promises = getHumanReadableDataPromises({urls, prefixToIri, iriToPrefix})
    .map((p, i, arr) => {
      return p.then(data => {
        const classes = view(ModelState.classes, getState());
        const newClasses = Object.keys(data)
          .filter(id => classes.hasOwnProperty(id))
          .filter(id => data[id])
          .filter(id => JSON.stringify(classes[id].info.byLanguage) !== JSON.stringify(data[id]))
          .reduce((acc, id) => Object.assign(acc, {[id]: {
              ...classes[id],
              info: {byLanguage: (data[id] || {})}
            }}), {});

        // FIXME: Aggregate into one dispatch
        if (!isEmpty(newClasses)) {
          dispatch(ModelState.updateClasses(map(updateLanguageInfo(language), newClasses)));
        }
      })
        .catch(() => {})
        .finally(() => {
          resolved++;
          dispatchSet(SettingsState.labelsLoadingProgress, Math.round(resolved / arr.length * 100));
        })
    });

  return Promise.all(promises)
    .then(() => dispatchSet(SettingsState.labelsLoadingProgress, 100));
}
