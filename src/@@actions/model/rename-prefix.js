import { curry, omit, over, set, view, pipe, map } from 'ramda';
import * as YasguiState from '@@app-state/yasgui/state';
import * as ModelState from '@@app-state/model/state';

export const renamePrefix = curry((oldName, newName, s) => {
  const iri = view(YasguiState.prefixById(oldName), s);

  return pipe(
    over(YasguiState.prefixes, omit([oldName])),
    over(ModelState.customPrefixes, omit([oldName])),
    over(ModelState.properties, map(p => (p.predicate.includes(oldName) || p.targetType.includes(oldName)) ? Object.assign({}, p, {
      predicate: p.predicate.replace(oldName, newName),
      targetType: p.targetType.replace(oldName, newName)
    }) : p)),
    over(ModelState.classes, map(c => !c.type.includes(oldName) ? c : Object.assign({}, c, {type: c.type.replace(oldName, newName)}))),
    set(YasguiState.prefixById(newName), iri),
    set(ModelState.customPrefixById(newName), iri)
  )(s);
});
