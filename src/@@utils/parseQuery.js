import { groupBy, path, prop, map, partition, pipe, pick, uniq, head, identity, keys, values } from 'ramda';
import { sanitizeVarName } from '@@utils/sanitizeVarName';

const getPropertiesBySource = (prefixToIRI, getEntityVariable, properties) => {
  const getProperty = ({asVariable, varName, predicate, source, optional, target}) => {
    const sourceVarName = getEntityVariable(source); // Use existing queried entity if available to prevent cartesian products
    const targetVarName = getEntityVariable(target) || varName; // Use existing queried entity if available to prevent cartesian products

    return {
      predicate,
      asVariable,
      optional,
      source,
      target,
      targetVarName,
      sourceVarName,
      variable: asVariable ? `?${targetVarName}` : '[]'
    };
  };

  const bySource = groupBy(prop('source'), values(properties).map(getProperty));

  return values(bySource).reduce((acc, properties) => {
    const [optional, required] = partition(prop('optional'), properties);
    return Object.assign(acc, {
      [properties[0].source]: {
        optional,
        required,
        properties
      }
    });
  }, {});
};

const getSelectVariables = (selectionOrder, selectedObjects) => selectionOrder
  .filter(id => path([id, 'asVariable'], selectedObjects))
  .map(id => {
    const target = path([id, 'target'], selectedObjects);
    const variable = path([target, 'varName'], selectedObjects) || selectedObjects[id].varName;
    return `?${sanitizeVarName(variable)}`;
  });

const getSelectText = pipe(getSelectVariables, uniq, vars => vars.join(' ') || '*');

const getPrefixDefinitions = usedPrefixes => Object.entries(usedPrefixes).map(([name, iri]) => `PREFIX ${name}: <${iri}>`).join('\n');

const getPrefix = iri => {
  const prefixMatch = iri.match(/(^\w+):/);
  return prefixMatch && prefixMatch[1];
};

const getUsedPrefixes = (selectedProperties, selectedEntities) => {
  const entityIRIs = Object.keys(selectedEntities);

  const entityPrefixes = entityIRIs.reduce((acc, iri) => acc.add(getPrefix(iri)), new Set());
  const propertyPrefixes = Object.values(selectedProperties).reduce((acc, {predicate, source, target}) =>
    acc
    .add(getPrefix(predicate))
    .add(getPrefix(source))
    .add(getPrefix(target)),
  new Set());

  return [...entityPrefixes.values(), ...propertyPrefixes.values()];
}


export const parseSPARQLQuery = ({selectedProperties, selectedClasses, classes, prefixes, selectionOrder, limit, limitEnabled}) => {
  const classesByVarName = groupBy(prop('varName'), values(classes));
  const varNameToTypes = map(map(prop('type')), classesByVarName);

  const getEntityVariable = id => sanitizeVarName(path([id, 'varName'], classes));

  const propertiesBySource = getPropertiesBySource(prefixes, getEntityVariable, selectedProperties);

  const getPropertyRow = ({predicate, variable}, i, arr) => `${predicate} ${variable}${i === arr.length - 1 ? '.' : ';'}`;

  const rows = Object.entries(propertiesBySource)
    .map(([source, {required, optional}]) => {
      let res = '';
      if (required.length) {
        res = `?${getEntityVariable(source)} ${required.map(getPropertyRow).join('\n')}`;
      }
      if (optional.length) {
        res += `\n\tOPTIONAL { ?${getEntityVariable(source)} ${optional.map(getPropertyRow).join('\n')} }`;
      }
      return res;
    })
    .filter(identity);

  const usedVariables = values(propertiesBySource)
    .map(prop('properties'))
    .flat()
    .reduce((acc, p) => Object.assign(acc, {
      [p.sourceVarName]: true,
      [p.targetVarName]: true
    }), {});

  const typeRows = keys(usedVariables)
    .filter(name => varNameToTypes[name])
    .map(varName => `?${varName} a ${varNameToTypes[varName].join(',')}.`)
    .join('\n');

  const selected = Object.assign({}, selectedProperties, classes);

  const usedPrefixes = getUsedPrefixes(selectedProperties, selectedClasses);
  const usedPrefixesToIRI = pick(usedPrefixes, prefixes);

  return `${getPrefixDefinitions(usedPrefixesToIRI)}
    SELECT DISTINCT ${getSelectText(selectionOrder, selected)} WHERE {
    ${typeRows}
    ${rows.join('\n')}
    }
    ${limitEnabled && limit ? `LIMIT ${limit}` : ''} 
  `;
};
