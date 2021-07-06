/**
 * @file Handling of editing custom prefixes
 * @module @@actions/custom-prefix
 */

import { curry, omit, over, set, view, pipe, map, assoc, invertObj } from 'ramda';
import * as ModelState from '@@app-state/model/state';

/**
 * Changes a prefix name, changing the model properties and entities to utilize this new name.
 * @function
 * @type {*}
 */
export const renamePrefix = curry((oldName, newName, s) => {
  const existingKey = invertObj(view(ModelState.customPrefixes, s))[oldName];
  const iri = view(ModelState.prefixById(existingKey), s) || view(ModelState.prefixById(oldName), s);

  return pipe(
    over(ModelState.prefixes, omit([oldName, existingKey])),
    over(ModelState.properties, map(p => {
      const [predicatePrefix, predicateSuffix] = p.predicate.split(':');
      const [typePrefix, typeSuffix] = p.targetType.split(':');
      if (predicatePrefix === existingKey || predicatePrefix === oldName) {
        p = assoc('predicate', `${newName}:${predicateSuffix}`, p);
      }
      if (typePrefix === existingKey || typePrefix === oldName) {
        p = assoc('targetType', `${newName}:${typeSuffix}`, p);
      }
      return p;
    })),
    over(ModelState.classes, map(c => {
      const [typePrefix, typeSuffix] = c.type.split(':');
      return (typePrefix === existingKey || typePrefix === oldName) ?
        assoc('type', `${newName}:${typeSuffix}`, c)
        : c;
    })),
    set(ModelState.prefixById(newName), iri),
    over(ModelState.customPrefixes, omit([existingKey])),
    set(ModelState.customPrefixById(newName), oldName)
  )(s);
});

/**
 * Deletes a custom prefix, changing all the data to use the old name.
 * @function
 * @type {*}
 */
export const deletePrefix = curry((name, s) => {
  const oldName = view(ModelState.customPrefixById(name), s);

  if (!oldName) {
    return s;
  }
  return pipe(
    renamePrefix(name, oldName),
    over(ModelState.customPrefixes, omit([name, oldName]))
  )(s);
});

/**
 * Loads custom prefixes.
 * @function
 * @type {*}
 */
export const loadCustomPrefixes = curry((customPrefixes, s) => {
  const updated =
    Object.entries(customPrefixes)
    .reduce((acc, [newName, oldName]) => {
      if (!view(ModelState.prefixById(newName), s)) {
        return set(ModelState.prefixById(newName), view(ModelState.prefixById(oldName), s), acc)
      }
       return s;
    }, s);

  return over(ModelState.prefixes, omit(Object.values(customPrefixes)), updated);
})

/**
 * Applies custom prefixes by changing all the data to use the new ones.
 * @function
 * @type {*}
 */
export const applyCustomPrefixes = curry((customPrefixes, s) => {
  s = Object.entries(customPrefixes)
    .reduce((acc, [newName, oldName]) => renamePrefix(oldName, newName, acc), s);

  return loadCustomPrefixes(customPrefixes, s);
});
