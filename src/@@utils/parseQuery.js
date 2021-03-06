import { groupBy, path, prop, map, partition, pipe, pick, uniq, flatten, head } from 'ramda';
import { sanitizeVarName } from '@@utils/sanitizeVarName';

const getDefaultEntityVarNames = types => {
  if (!types.length) return '';

  const nameCount = {};

  return types.reduce((acc, t) => {
    const stripped = t.replace('<', '').replace('>', '');
    const suffix = stripped.match(/([^/#:]+)$/)
    let varName;
    if (suffix && suffix[1]) {
      varName = sanitizeVarName(suffix[1]);
    }
    if (varName && !nameCount[varName]) {
      nameCount[varName] = 1;
    } else {
      varName = sanitizeVarName(`${varName}${nameCount[varName]}`);
      nameCount[varName]++;
    }
    return Object.assign(acc, {[t]: varName});
  }, {});
};

const getProperties = (prefixToIRI, getEntityVariable, propertiesBySource, classes) => {
  const getProperty = ({asVariable, varName, predicate, source, optional, target, position}) => {
    const targetVarName = sanitizeVarName(getEntityVariable(target) || varName); // Use existing queried entity if available to prevent cartesian products

    return {
      predicate, asVariable, position, optional, source,
      varName: asVariable ? `?${targetVarName}` : '[]'
    };
  };

  return Object.entries(propertiesBySource).reduce((acc, [source, properties]) => {
    const [optional, required] = partition(prop('optional'), properties.map(getProperty));
    return Object.assign(acc, {
      [source]: {optional, required, type: path([source, 'type'], classes) || source}
    });
  }, {});
};

const getSelectVariables = (selectionOrder, selectedObjects) => selectionOrder
  .filter(id => path([id, 'asVariable'], selectedObjects) && !path([id, 'bound'], selectedObjects))
  .map(id => `?${sanitizeVarName(selectedObjects[id].varName)}`);

const getSelectText = pipe(getSelectVariables, uniq, vars => vars.join(' ') || '*');

const getPrefixDefinitions = usedPrefixes => Object.entries(usedPrefixes).map(([name, iri]) => `PREFIX ${name}: <${iri}>`).join('\n');

const getPrefix = iri => {
  const prefixMatch = iri.match(/(^\w+):/);
  return prefixMatch && prefixMatch[1];
};

const getPropertiesBySource = (selectedProperties, selectedEntities) => {
  const entityToPropertiesInitial = map(() => [], selectedEntities);
  const propertyArr = Object.values(selectedProperties);
  return Object.assign(entityToPropertiesInitial, groupBy(prop('source'), propertyArr));
}

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
  const propertiesBySource = getPropertiesBySource(selectedProperties, selectedClasses);

  const entityVarNames = getDefaultEntityVarNames(Object.keys(propertiesBySource));

  const getEntityVariable = id => path([id, 'varName'], selectedClasses) || entityVarNames[id];

  const properties = getProperties(prefixes, getEntityVariable, propertiesBySource, classes);

  const getPropertyRow = ({predicate, varName}, i, arr) => `${predicate} ${varName}${i === arr.length - 1 ? '.' : ';'}`
  const propertiesByVar = groupBy(pipe(head, getEntityVariable, sanitizeVarName), Object.entries(properties));
  const rows = Object.entries(propertiesByVar).map(([entityVar, data]) => {
    const required = flatten(data.map(d => d[1].required));
    const optional = flatten(data.map(d => d[1].optional));
    const types = uniq(flatten(data.map(d => d[1].type)));
    const type = types.join('; a ');

    let res = `?${entityVar} a ${type}.`;
    if (required.length) {
      res = `?${entityVar} a ${type};${required.map(getPropertyRow).join('\n')}`;
    }
    if (optional.length) {
      res += `\n\tOPTIONAL { ?${entityVar} ${optional.map(getPropertyRow).join('\n')} }`;
    }
    return res;
  });

  const selected = Object.assign({}, selectedProperties, selectedClasses);

  const usedPrefixes = getUsedPrefixes(selectedProperties, selectedClasses);
  const usedPrefixesToIRI = pick(usedPrefixes, prefixes);
  return `${getPrefixDefinitions(usedPrefixesToIRI)}
    SELECT DISTINCT ${getSelectText(selectionOrder, selected)} WHERE {
    ${rows.join('\n')}
    }
    ${limitEnabled && limit ? `LIMIT ${limit}` : ''} 
  `;
};
