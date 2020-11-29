import { groupBy, invertObj, flatten, prop } from 'ramda';
import possiblePrefixes from 'src/constants/possiblePrefixes';

// const parsePrefix = (iri) => {
//   const suffix = iri.replace(/.*(\/|#)/, '');
//   const prefixIri = iri.replace(/(\/|#)[^/#]*$/, '$1');
//   const alias = possiblePrefixes[prefixIri];
//
//   return {
//     alias,
//     suffix,
//     prefixIri
//   }
// };

const snakeToCamel = (str) => str.replace(
  /([-]\w)/g,
  group => group.toUpperCase().replace('-', '')
).replace(/-/g, '');

const getTypeVarNames = types => {
  if (!types.length) return '';

  const nameCount = {};

  return types.reduce((acc, t, i) => {
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

const getProperties = (prefixToIRI, typeToVarName, selectedProperties) => {
  const usedPrefixes = {};
  const properties = selectedProperties.reduce((acc, {asVariable, name, predicate, optional, source, target, position}) => {
    acc[source] = acc[source] || {properties: {optional: [], required: []}};

    const targetVarName = snakeToCamel(typeToVarName[target] || name); // Use existing queried entity if available to prevent cartesian products
    const varName = asVariable ? `?${targetVarName}` : '[]';

    const {prefixed, usedPrefixes: newPrefixes} = getPrefixed(prefixToIRI, predicate);
    Object.assign(usedPrefixes, newPrefixes);
    predicate = prefixed;

    if (optional) {
      acc[source].properties.optional.push({predicate, varName, asVariable, position, source});
    } else {
      acc[source].properties.required.push({predicate, varName, asVariable, position, source});
    }

    return acc;
  }, {})

  return {properties, usedPrefixes};
};

const getPropertyRows = ({usedPrefixes, properties, typeToVarName}) => {
  const getPropertyRow = sourceVarName => ({predicate, varName}, i, arr) => {
    if (i === 0) {
      return `?${sourceVarName} ${predicate} ${varName}${arr.length > 1 ? ';' : '.'}`;
    } else {
      return `${predicate} ${varName}${i === arr.length - 1 ? '.' : ';'}`;
    }
  };

  const {requiredRows, optionalRows} = Object.entries(properties)
    .reduce((acc, [source, {properties: {required, optional}}]) => {
    const sourceVarName = typeToVarName[source] || typeToVarName[`<${source}>`];
    const requiredRows = required.map(getPropertyRow(sourceVarName));
    const optionalRows = optional.map(getPropertyRow(sourceVarName));

    return Object.assign(acc, {requiredRows: acc.requiredRows.concat(requiredRows), optionalRows: acc.optionalRows.concat(optionalRows)});
  }, {requiredRows: [], optionalRows: []});

  const optionalString = optionalRows.length ? `OPTIONAL {
      ${optionalRows.join('\n')}
    }` : '';
  return {usedPrefixes, text: `
    ${requiredRows.join('\n')}
    ${optionalString}
  `};
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

export const parseSPARQLQuery = (selectedProperties, prefixes) => {
  const propertyValues = Object.values(selectedProperties);
  const groupedBySource = groupBy(prop('source'), propertyValues);
  const prefixToIRI = Object.assign(prefixes, invertObj(possiblePrefixes));
  const usedPrefixes = {};
  const types = Object.keys(groupedBySource).map(t => {
    const {prefixed, usedPrefixes: newPrefixes} = getPrefixed(prefixToIRI, t)
    Object.assign(usedPrefixes, newPrefixes);
    return prefixed;
  });

  const typeToVarName = getTypeVarNames(types);

  const typeRows = Object.entries(typeToVarName).map(([type, varName]) => `?${varName} a ${type}.`).join('\n')
  const {usedPrefixes: propertyPrefixes, properties} = getProperties(prefixToIRI, typeToVarName, propertyValues);
  Object.assign(usedPrefixes, propertyPrefixes);
  const {usedPrefixes: propertyPrefixes2, text: propertyRows} = getPropertyRows({usedPrefixes, properties, typeToVarName});
  Object.assign(usedPrefixes, propertyPrefixes2);
  const prefixRows = Object.entries(usedPrefixes).map(([name, iri]) => `PREFIX ${name}: <${iri}>`).join('\n');

  const sortedProperties = flatten(Object.values(properties)
    .map(({properties: {optional, required}}) => optional.concat(required)))
    .sort((p1, p2) => p1.position < p2.position ? -1 : 1);
  const varNames = sortedProperties.map(prop('varName')).join(' ') || '*';

  return `${prefixRows}
    SELECT DISTINCT ${varNames} WHERE {
    ${typeRows}

    ${propertyRows}
    }
    LIMIT 100
  `;
};
