import { curry, omit, over, set, view, pipe, map, assoc } from 'ramda';
import * as YasguiState from '@@app-state/yasgui/state';
import * as ModelState from '@@app-state/model/state';
import { customPrefixes } from '@@app-state/model/state';

export const renamePrefix = curry((oldName, newName, s) => {
  const iri = view(YasguiState.prefixById(oldName), s);

  return pipe(
    over(YasguiState.prefixes, omit([oldName])),
    over(ModelState.properties, map(p => {
      const [predicatePrefix, predicateSuffix] = p.predicate.split(':');
      const [typePrefix, typeSuffix] = p.targetType.split(':');
      if (predicatePrefix.includes(oldName)) {
        p = assoc('predicate', `${newName}:${predicateSuffix}`, p);
      }
      if (typePrefix.includes(oldName)) {
        p = assoc('targetType', `${newName}:${typeSuffix}`, p);
      }
      return p;
    })),
    over(ModelState.classes, map(c => {
      const [typePrefix, typeSuffix] = c.type.split(':');
      return typePrefix.includes(oldName) ?
        Object.assign({}, c, {type: `${newName}:${typeSuffix}`})
        : c;
    })),
    set(YasguiState.prefixById(newName), iri),
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
    over(customPrefixes, omit([name, oldName]))
  )(s);
});

window.deletePrefix = deletePrefix;
