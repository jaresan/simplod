import { curry, omit, over, set, view, pipe, map, assoc, invertObj } from 'ramda';
import * as YasguiState from '@@app-state/yasgui/state';
import * as ModelState from '@@app-state/model/state';

export const renamePrefix = curry((oldName, newName, s) => {
  const existingKey = invertObj(view(ModelState.customPrefixes, s))[oldName];
  const iri = view(YasguiState.prefixById(existingKey), s) || view(YasguiState.prefixById(oldName), s);

  return pipe(
    over(YasguiState.prefixes, omit([oldName, existingKey])),
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
    set(YasguiState.prefixById(newName), iri),
    over(ModelState.customPrefixes, omit([existingKey])),
    set(ModelState.customPrefixById(newName), oldName)
  )(s);
});

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

export const loadCustomPrefixes = curry((customPrefixes, s) => {
  const updated =
    Object.entries(customPrefixes)
    .reduce((acc, [newName, oldName]) => {
      if (!view(YasguiState.prefixById(newName), s)) {
        return set(YasguiState.prefixById(newName), view(YasguiState.prefixById(oldName), s), acc)
      }
       return s;
    }, s);

  return over(YasguiState.prefixes, omit(Object.values(customPrefixes)), updated);
})

export const applyCustomPrefixes = curry((customPrefixes, s) => {
  s = Object.entries(customPrefixes)
    .reduce((acc, [newName, oldName]) => renamePrefix(oldName, newName, acc), s);

  return loadCustomPrefixes(customPrefixes, s);
});
