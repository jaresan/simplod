import {map} from 'ramda';
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

export const parseSPARQLQuery = ({
	selectedClasses,
	selectedProperties
}) => {
	let queryParts = {
		properties: '',
		values: ''
	};
	let types = Object.keys(selectedClasses);
	const usedPrefixes = {};

	if (types.length) {
		types = types.map(type => {
			const { alias, suffix, prefixIri } = parsePrefix(type);
			if (alias) {
				usedPrefixes[alias] = prefixIri;
				return `(${alias}:${suffix})`;
			} else {
				return `(<${type}>)`;
			}
		});
		queryParts.values = `\n  VALUES (?type) {\n\t${types.join('\n\t')}\n  }`;
		queryParts.properties = map(([predicate, value]) => {
			if (value.disabled) {
				return;
			}
			const name = value.show ? `?${value.name}` : '[]';

			const { alias, suffix, prefixIri } = parsePrefix(predicate);
			if (alias) {
				// FIXME: Separate getPrefixes logic
				usedPrefixes[alias] = prefixIri;
				predicate = `${alias}:${suffix}`
			} else {
				predicate = `<${predicate}>`;
			}

			let result = `?s ${predicate} ${name}.`;
			if (value.optional) {
				result = `\n  OPTIONAL{\n\t${result}\n  }`;
			} else {
				result = '\n  ' + result;
			}
			return result;
		}, Object.entries(selectedProperties)).join('');
	}

	return `${map((name, iri) => `PREFIX ${name}: <${iri}>`, Object.entries(usedPrefixes)).join('\n')}

SELECT * WHERE {
  ?s a ?type.${queryParts.properties}${queryParts.values}
}
LIMIT 100`;
};
