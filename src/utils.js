import {map, groupBy, prop, invertObj} from 'ramda';
import possiblePrefixes from 'src/constants/possiblePrefixes';

const parsePrefix = (iri) => {
	const suffix = iri.replace(/.*(\/|#)/, '');
	const prefixIri = iri.replace(/(\/|#)[^/#]*$/, '$1');
	const alias = possiblePrefixes[prefixIri];

	return {
		alias,
		suffix,
		prefixIri
	}
};

export const parseSPARQLQuery = selectedProperties => {
	let queryParts = {
		properties: '',
		values: ''
	};
	let types = Object.keys(groupBy(prop('source'), Object.values(selectedProperties)));
	const usedPrefixes = {};
	const invertedPrefixes = invertObj(possiblePrefixes);

	if (types.length) {
		types = types.map(type => {
			const { alias, suffix, prefixIri } = parsePrefix(type);
			const prefixed = type.match(/(^\w+):/);
			const prefix = prefixed && prefixed[1];
			if (invertedPrefixes[prefix]) {
				usedPrefixes[prefix] = invertedPrefixes[prefix];
				return `(${type})`;
			} else {
				return `(<${type}>)`;
			}
		});
		queryParts.values = `\n  VALUES (?type) {\n\t${types.join('\n\t')}\n  }`;
		queryParts.properties = map(({show, name, predicate, optional}) => {
			name = show ? `?${name}` : '[]';

			const prefixed = predicate.match(/(^\w+):/);
			const prefix = prefixed && prefixed[1];
			if (invertedPrefixes[prefix]) {
				usedPrefixes[prefix] = invertedPrefixes[prefix];
			} else {
				predicate = `<${predicate}>`;
			}

			let result = `?s ${predicate} ${name}.`;
			if (optional) {
				result = `\n  OPTIONAL{\n\t${result}\n  }`;
			} else {
				result = '\n  ' + result;
			}
			return result;
		}, Object.values(selectedProperties)).join('');
	}

	return `${map(([name, iri]) => `PREFIX ${name}: <${iri}>`, Object.entries(usedPrefixes)).join('\n')}

SELECT * WHERE {
  ?s a ?type.${queryParts.properties}${queryParts.values}
}
LIMIT 100`;
};
