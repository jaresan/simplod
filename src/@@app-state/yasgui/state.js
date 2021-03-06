import { complement, compose, filter, invertObj, lensProp, set, view, curry } from 'ramda';
import E from '@@model/entity';
import { compare } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import possiblePrefixes from '@@constants/possible-prefixes';
import { parseSPARQLQuery } from '@@utils/parseQuery';

export const initial = {
  prefixes: {},
  query: '',
  instance: null
};

export const root = lensProp('yasgui');

const forKey = k => compose(root, lensProp(k));

export const prefixes = forKey('prefixes');
export const query = forKey('query');
export const instance = forKey('instance');

/**
 * Updates the generated SPARQL query.
 */
export const updateQuery = state => {
  const usedPrefixes = view(prefixes, state);
  const selectedProperties = filter(E.selected, view(ModelState.properties, state));
  const classes = view(ModelState.classes, state);
  const selectedClasses = filter(E.selected, view(ModelState.classes, state));
  const limit = view(SettingsState.limit, state);
  const limitEnabled = view(SettingsState.limitEnabled, state);
  const selectionOrder = view(ModelState.selectionOrder, state);
  const prefixToIRI = Object.assign(usedPrefixes, invertObj(possiblePrefixes));

  return set(query, parseSPARQLQuery({selectedProperties, selectedClasses, classes, prefixes: prefixToIRI, limit, limitEnabled, selectionOrder}), state);
}

export const middleware = curry((oldState, newState) => {
  const changesMade = [
    ModelState.properties,
    ModelState.classes,
    ModelState.selectionOrder,
    SettingsState.limitEnabled,
    SettingsState.limit
  ].some(complement(compare(oldState, newState)))

  if (changesMade) {
    return updateQuery(newState);
  }

  return newState;
});
