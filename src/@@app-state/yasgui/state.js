import {
  compose,
  filter,
  invertObj,
  lensProp,
  set,
  view,
  curry,
  omit,
  values,
  mapObjIndexed,
  prop,
  pipe,
  identity
} from 'ramda';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import * as ControlsState from '@@app-state/controls/state';
import { parseSPARQLQuery } from '@@data/parseQuery';

export const initial = {
  prefixes: {},
  query: '',
  instance: null
};

export const root = lensProp('yasgui');

const forKey = k => compose(root, lensProp(k));

export const prefixes = forKey('prefixes');
export const prefixById = id => compose(prefixes, lensProp(id));
export const query = forKey('query');
export const instance = forKey('instance');

/**
 * Updates the generated SPARQL query.
 */
const getQuery = state => {
  const customPrefixes = view(ModelState.customPrefixes, state);
  const usedPrefixes = view(ModelState.prefixes, state);
  const overriddenPrefixes = Object.assign(omit(values(customPrefixes), usedPrefixes), mapObjIndexed((p, key) => usedPrefixes[key], customPrefixes));
  const selectedProperties = filter(prop('selected'), view(ModelState.properties, state));
  const classes = view(ModelState.classes, state);
  const selectedClasses = ModelState.getSelectedClasses(state);
  const limit = view(SettingsState.limit, state);
  const limitEnabled = view(SettingsState.limitEnabled, state);
  const selectionOrder = view(ModelState.selectionOrder, state);
  const propertyLanguages = view(ModelState.propertyLanguages, state);
  const prefixToIRI = Object.assign({}, usedPrefixes, invertObj(overriddenPrefixes));

  return parseSPARQLQuery({
    selectedProperties,
    selectedClasses,
    classes,
    prefixes: prefixToIRI,
    limit,
    limitEnabled,
    selectionOrder,
    propertyLanguages
  });
}

export const middleware = curry((oldState, newState) => {
  const oldQuery = view(query, oldState);
  const newQuery = getQuery(newState);

  if (oldQuery !== newQuery) {
    const modelBeingLoaded = view(ControlsState.loadingModel, newState);
    const updateModelQuery = modelBeingLoaded ? identity : set(ModelState.query, '');
    return pipe(
      set(query, newQuery),
      updateModelQuery
    )(newState);
  }

  return newState;
});
