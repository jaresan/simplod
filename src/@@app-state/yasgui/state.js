import {
  complement,
  compose,
  filter,
  invertObj,
  lensProp,
  set,
  view,
  curry,
  omit,
  values,
  mapObjIndexed
} from 'ramda';
import E from '@@model/entity';
import { compare } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import { parseSPARQLQuery } from '@@utils/parseQuery';

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
export const updateQuery = state => {
  const customPrefixes = view(ModelState.customPrefixes, state);
  const usedPrefixes = view(prefixes, state);
  const overriddenPrefixes = Object.assign(omit(values(customPrefixes), usedPrefixes), mapObjIndexed((p, key) => usedPrefixes[key], customPrefixes));
  const selectedProperties = filter(E.selected, view(ModelState.properties, state));
  const classes = view(ModelState.classes, state);
  const selectedClasses = ModelState.getSelectedClasses(state);
  const limit = view(SettingsState.limit, state);
  const limitEnabled = view(SettingsState.limitEnabled, state);
  const selectionOrder = view(ModelState.selectionOrder, state);
  const prefixToIRI = Object.assign({}, usedPrefixes, invertObj(overriddenPrefixes));

  return set(query, parseSPARQLQuery({selectedProperties, selectedClasses, classes, prefixes: prefixToIRI, limit, limitEnabled, selectionOrder}), state);
}

export const middleware = curry((oldState, newState) => {
  const changesMade = [
    ModelState.properties,
    ModelState.classes,
    ModelState.selectionOrder,
    ModelState.customPrefixes,
    SettingsState.limitEnabled,
    SettingsState.limit
  ].some(complement(compare(oldState, newState)))

  if (changesMade) {
    return updateQuery(newState);
  }

  return newState;
});
