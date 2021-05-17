import { groupBy, path, prop, map, partition, pipe, pick, uniq, clone, keys, values, curry } from 'ramda';
import { sanitizeVarName } from '@@utils/sanitizeVarName';

const langStringType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString';

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
      variable: `?${targetVarName}`
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


const isLangString = curry((prefixes, {target}) => {
  const prefix = prop(1, /(\w+):/.exec(target));
  return target.replace(`${prefix}:`, prefixes[prefix]) === langStringType;
});

const getPropertyRow = ({predicate, variable}, i, arr) => `${predicate} ${variable}${i === arr.length - 1 ? '.' : ';'}`;

const getPropertyRows = ({propertiesBySource, getEntityVariable, prefixes, shouldAddFilter, getFilterString}) =>
  Object.entries(propertiesBySource)
  .reduce((acc, [source, {required, optional}]) => {
    if (required.length) {
      acc.required.push(`?${getEntityVariable(source)} ${required.map(getPropertyRow).join('\n')}`);
    }
    if (optional.length) {
      acc.optional.push(`
        ?${getEntityVariable(source)} ${optional.map(getPropertyRow).join('\n')}
        ${shouldAddFilter ? optional.filter(isLangString(prefixes)).map(pipe(prop('variable'), getFilterString)) : ''}
      `);
    }
    return acc;
  }, {required: [], optional: []});

export const parseSPARQLQuery = ({
  selectedProperties,
  selectedClasses,
  classes,
  prefixes,
  selectionOrder,
  limit,
  limitEnabled,
  propertyLanguages
}) => {
  const classesByVarName = groupBy(prop('varName'), values(classes));
  const varNameToTypes = map(map(prop('type')), classesByVarName);

  const getEntityVariable = id => sanitizeVarName(path([id, 'varName'], classes));

  const propertiesBySource = getPropertiesBySource(prefixes, getEntityVariable, selectedProperties);

  const shouldAddFilter = !!propertyLanguages.length;
  const getFilterString = variable => `filter (lang(${variable}) in (${propertyLanguages.map(a => `'${a}'`).join(',')})).`;

  const selectedClassVarNames = values(selectedClasses).reduce((acc, {varName}) => Object.assign(acc, {[varName]: true}), {});

  const usedVariables = values(propertiesBySource)
    .map(prop('properties'))
    .flat()
    .concat(selectedClassVarNames)
    .reduce((acc, p) => Object.assign(acc, {
      [p.sourceVarName]: true,
      [p.targetVarName]: true
    }), clone(selectedClassVarNames));

  const typeRows = keys(usedVariables)
    .filter(name => varNameToTypes[name])
    .map(varName => `?${varName} a ${varNameToTypes[varName].join(',')}.`)
    .join('\n');

  const selected = Object.assign({}, selectedProperties, classes);

  const usedPrefixes = getUsedPrefixes(selectedProperties, selectedClasses);
  const usedPrefixesToIRI = pick(usedPrefixes, prefixes);

  const requiredProperties = Object.values(propertiesBySource)
    .flatMap(prop('required'))
    .filter(isLangString(prefixes))
    .reduce((acc, p) => Object.assign(acc, {[p.variable]: true}), {});

  const {optional, required} = getPropertyRows({propertiesBySource, getEntityVariable, prefixes, shouldAddFilter, getFilterString});
  return `${getPrefixDefinitions(usedPrefixesToIRI)}
    SELECT DISTINCT ${getSelectText(selectionOrder, selected)} WHERE {
    ${typeRows}
    ${required.join('\n')}
    ${optional.length ? 'OPTIONAL {' : ''}
      ${optional.join('\n')}
    ${optional.length ? '}' : ''}
    ${shouldAddFilter ? keys(requiredProperties).map(getFilterString).join('\n') : ''}
    }
    ${limitEnabled && limit ? `LIMIT ${limit}` : ''} 
  `;
};
