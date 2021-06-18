import { groupBy, path, prop, map, indexBy, pipe, uniq, keys, values, reduce, mergeRight, omit } from 'ramda';
import { sanitizeVarName } from '@@utils/sanitizeVarName';
import { expandRoot } from '@@data/graph';
import { getPrefix } from '@@data/parsePrefix';

const typeWithLangs = 'langString';

const getPropertiesBySource = (getEntityVariable, properties) => {
  const getProperty = ([id, data]) => {
    const sourceVarName = getEntityVariable(data.source); // Use existing queried entity if available to prevent cartesian products
    const targetVarName = getEntityVariable(data.target) || data.varName; // Use existing queried entity if available to prevent cartesian products

    return {
      ...data,
      id,
      sourceVarName,
      targetVarName,
      variable: `?${targetVarName}`
    };
  };


  const bySource = groupBy(prop('source'), Object.entries(properties).map(getProperty));
  return map(indexBy(prop('id')), bySource);
};

const getFilterString = (variable, languages) => `filter (lang(${variable}) in (${languages.map(a => `'${a}'`).join(',')})).`;

const wrapOptional = (optional, s) => {
  if (optional) {
    return `OPTIONAL {
      ${s}
    }`
  }
  return s;
}

const getPropertyRow = ({predicate, sourceVarName, variable, targetType, optional}, propertyLanguages) => {
  const filterRow = (propertyLanguages.length && targetType.replace(/.*:/, '') === typeWithLangs) ? `\n${getFilterString(variable, propertyLanguages)}` : '';
  return wrapOptional(optional, `?${sourceVarName} ${predicate} ${variable}.${filterRow}`);
}

const getObjectPropertyEntry = ({predicate, sourceVarName, target, targetVarName, shouldExpand, optional}, nodes, languages) => {
  let definition = `?${sourceVarName} ${predicate} ?${targetVarName}.`;
  if (shouldExpand) {
    definition += `\n${getNodeEntry(nodes[target], nodes, languages)}`;
  }

  return wrapOptional(optional, definition);
};

const getDataPropertyRows = (dataProperties, propertyLanguages) => values(dataProperties)
  .sort(a => a.optional ? 1 : -1)
  .map(p => getPropertyRow(p, propertyLanguages));

const getObjectPropertyRows = (edges, nodes, languages) => values(edges)
  .sort(a => a.optional ? 1 : -1)
  .map(e => getObjectPropertyEntry(e, nodes, languages));

const getNodeEntry = (n, nodes, languages) => {
  const {type, varName, dataProperties, edges} = n;
  const typeRow = `?${varName} a ${type}.`;

  const dataPropertyRows = getDataPropertyRows(dataProperties, languages);
  const objectPropertyRows = getObjectPropertyRows(edges, nodes, languages);

  let res = typeRow;
  if (dataPropertyRows.length) {
    res += '\n' + dataPropertyRows.join('\n');
  }
  if (objectPropertyRows.length) {
    res += '\n' + objectPropertyRows.join('\n');
  }
  return res;
};

const getSelectVariables = (selectionOrder, selectedObjects) => selectionOrder
  .filter(id => path([id, 'asVariable'], selectedObjects))
  .map(id => {
    const target = path([id, 'target'], selectedObjects);
    const variable = path([target, 'varName'], selectedObjects) || selectedObjects[id].varName;
    return `?${sanitizeVarName(variable)}`;
  });

const getUsedPrefixes = (properties, classes) => values(properties)
  .reduce((acc, {target, source, predicate}) =>
      acc.add(getPrefix(target)).add(getPrefix(source)).add(getPrefix(predicate)),
    new Set(keys(classes).map(getPrefix))
  );

const getPrefixDefinition = (properties, classes, prefixes) =>
  Array.from(getUsedPrefixes(properties, classes)).map(s => `PREFIX ${s}: <${prefixes[s]}>`).join('\n');

export const parseSPARQLQuery = ({
 selectedProperties,
 selectedClasses,
 classes,
 prefixes,
 selectionOrder,
 limit,
 limitEnabled,
 propertyLanguages = []
}) => {
  const getEntityVariable = id => sanitizeVarName(path([id, 'varName'], classes));

  const propertiesBySource = getPropertiesBySource(getEntityVariable, selectedProperties);
  const queriedIds = keys(Object.assign({}, propertiesBySource, selectedClasses));

  const nodes = queriedIds.reduce(
    (acc, id) => acc[id] ? acc : Object.assign(acc, expandRoot({n: Object.assign(classes[id], {id}), propertiesBySource, classes, expandedNodes: acc}).nodes),
    {});

  const edges = pipe(values, map(prop('edges')), reduce(mergeRight, {}))(nodes);
  const withIncomingEdges = values(edges).reduce((acc, {target, shouldExpand}) => shouldExpand ? Object.assign(acc, {[target]: true}) : acc, {});
  const withoutIncomingEdges = omit(keys(withIncomingEdges), nodes);

  const query = keys(withoutIncomingEdges).map(id => getNodeEntry(nodes[id], nodes, propertyLanguages)).join('\n');

  const selectText = uniq(getSelectVariables(selectionOrder, mergeRight(selectedProperties, selectedClasses))).join(' ') || '*';

  return `${getPrefixDefinition(selectedProperties, selectedClasses, prefixes)}
    SELECT DISTINCT ${selectText} WHERE {
     ${query}
    }
    ${limitEnabled ? `LIMIT ${limit}` : ''} 
  `;
};
