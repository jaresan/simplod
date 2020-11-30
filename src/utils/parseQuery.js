import { groupBy, invertObj, path, prop, map, partition } from 'ramda';
import possiblePrefixes from 'src/constants/possiblePrefixes';

const snakeToCamel = (str) => str.replace(
  /([-]\w)/g,
  group => group.toUpperCase().replace('-', '')
).replace(/-/g, '');

const getDefaultEntityVarNames = types => {
  if (!types.length) return '';

  const nameCount = {};

  return types.reduce((acc, t) => {
    const stripped = t.replace('<', '').replace('>', '');
    const suffix = stripped.match(/([^/#:]+)$/)
    let varName;
    if (suffix && suffix[1]) {
      varName = snakeToCamel(suffix[1]);
    }
    if (varName && !nameCount[varName]) {
      nameCount[varName] = 1;
    } else {
      varName = snakeToCamel(`${varName}${nameCount[varName]}`);
      nameCount[varName]++;
    }
    return Object.assign(acc, {[t]: varName});
  }, {});
};

const getProperties = (prefixToIRI, typeToVarName, propertiesBySource) => {
  const usedPrefixes = {};
  const getProperty = ({asVariable, name, predicate, source, optional, target, position}) => {
    const targetVarName = snakeToCamel(typeToVarName[target] || name); // Use existing queried entity if available to prevent cartesian products
    const varName = asVariable ? `?${targetVarName}` : '[]';

    const {prefixed, usedPrefixes: newPrefixes} = getPrefixed(prefixToIRI, predicate);
    Object.assign(usedPrefixes, newPrefixes);
    predicate = prefixed;
    return {predicate, varName, asVariable, position, optional, source};
  };

  const properties = Object.entries(propertiesBySource).reduce((acc, [source, properties]) => {
    const [optional, required] = partition(prop('optional'), properties.map(getProperty));
    return Object.assign(acc, {
      [source]: {optional, required}
    });
  }, {});

  return {properties, usedPrefixes};
};

const getPrefixed = (prefixToIRI, iri) => {
  const prefixMatch = iri.match(/(^\w+):/);
  const prefix = prefixMatch && prefixMatch[1];

  const usedPrefixes = {};
  let prefixed = '';
  if (prefixToIRI[prefix]) {
    usedPrefixes[prefix] = prefixToIRI[prefix];
    prefixed = iri;
  } else {
    prefixed = `<${iri}>`;
  }

  return {usedPrefixes, prefixed};
};

export const parseSPARQLQuery = ({selectedProperties, selectedEntities, prefixes, selectionOrder}) => {
  const propertyValues = Object.values(selectedProperties);
  const entitiesToProperties = map(() => [], selectedEntities);
  const groupedBySource = Object.assign(entitiesToProperties, groupBy(prop('source'), propertyValues));
  const prefixToIRI = Object.assign(prefixes, invertObj(possiblePrefixes));
  const usedPrefixes = {};
  const types = Object.keys(groupedBySource).map(t => {
    const {prefixed, usedPrefixes: newPrefixes} = getPrefixed(prefixToIRI, t)
    Object.assign(usedPrefixes, newPrefixes);
    return prefixed;
  });

  const entityVarNames = getDefaultEntityVarNames(types);

  const {usedPrefixes: propertyPrefixes, properties} = getProperties(prefixToIRI, entityVarNames, groupedBySource);
  Object.assign(usedPrefixes, propertyPrefixes);
  const getPropertyRow = ({predicate, varName}, i, arr) => `${predicate} ${varName}${i === arr.length - 1 ? '.' : ';'}`

  const rows = Object.entries(properties).map(([source, {required, optional}]) => {
    const entityVar = path([source, 'name'], selectedEntities) || entityVarNames[source];
    let res = `?${entityVar} a ${source}.`;
    if (required.length) {
      res = `?${entityVar} a ${source};${required.map(getPropertyRow).join('\n')}`;
    }
    if (optional.length) {
      res += `\n\tOPTIONAL { ?${entityVarNames[source]} ${optional.map(getPropertyRow).join('\n')} }`;
    }
    return res;
  });

  const prefixRows = Object.entries(usedPrefixes).map(([name, iri]) => `PREFIX ${name}: <${iri}>`).join('\n');

  const selected = Object.assign({}, selectedProperties, selectedEntities);
  const selectVariables = Object.entries(selected)
    .filter(([id, {asVariable}]) => asVariable)
    .sort(([id], [id2]) => selectionOrder.indexOf(id) < selectionOrder.indexOf(id2) ? -1 : 1)
    .map(([id, {name}]) => `?${name}`)
    .join(' ') || '*';

  return `${prefixRows}
    SELECT DISTINCT ${selectVariables} WHERE {
    ${rows.join('\n')}
    }
    LIMIT 100
  `;
};
