import { groupBy, invertObj, map, prop } from 'ramda';
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

export const parseSPARQLQuery = selectedProperties => {
  let queryParts = {
    properties: '',
    values: '',
    typeDefinitions: ''
  };
  let types = Object.keys(groupBy(prop('source'), Object.values(selectedProperties)));
  const usedPrefixes = {};
  const invertedPrefixes = invertObj(possiblePrefixes);

  if (types.length) {
    types = types.map(type => {
      // const { alias, suffix, prefixIri } = parsePrefix(type);
      const prefixed = type.match(/(^\w+):/);
      const prefix = prefixed && prefixed[1];
      if (invertedPrefixes[prefix]) {
        usedPrefixes[prefix] = invertedPrefixes[prefix];
        return type;
      } else {
        return `<${type}>`;
      }
    });

    let usedNames = {};

    // Class type to variable name, in query as `?varName a type.`
    const typeToVarName = types.reduce((acc, t, i) => {
      const suffix = t.match(/:(.*)$/);
      let varName;
      if (suffix && suffix[1]) {
        varName = suffix[1].replace('<', '').replace('>', '');
      }
      if (varName && !usedNames[varName]) {
        usedNames[varName] = 1;
      } else {
        varName = `${varName}${usedNames[varName]}`;
        usedNames[varName]++;
      }
      return Object.assign(acc, {[t]: varName});
    }, {});
    queryParts.typeDefinitions = Object.entries(typeToVarName).map(([type, varName]) => `?${varName} a ${type}.`).join('\n');

    queryParts.properties = Object.values(selectedProperties).map(({asVariable, name, predicate, optional, source, target}) => {
      const varName = typeToVarName[target] || name; // Use existing queried entity if available to prevent cartesian products
      name = asVariable ? `?${varName}` : '[]';

      const prefixed = predicate.match(/(^\w+):/);
      const prefix = prefixed && prefixed[1];
      if (invertedPrefixes[prefix]) {
        usedPrefixes[prefix] = invertedPrefixes[prefix];
      } else {
        predicate = `<${predicate}>`;
      }

      let result = `?${typeToVarName[source]} ${predicate} ${name}.`;
      if (optional) {
        result = `\n  OPTIONAL{\n\t${result}\n  }`;
      } else {
        result = '\n  ' + result;
      }
      return result;
    }).join('');
  }

  return `${map(([name, iri]) => `PREFIX ${name}: <${iri}>`, Object.entries(usedPrefixes)).join('\n')}

SELECT * WHERE {
  ${queryParts.typeDefinitions}
  ${queryParts.properties}
}
LIMIT 100`;
};
