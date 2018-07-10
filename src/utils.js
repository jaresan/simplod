import joint from 'jointjs';
import _ from 'underscore';
import possiblePrefixes from 'src/constants/possiblePrefixes';

export const createUMLInstance = ({size = {width: 250, height: 150}, name, attributes, methods, ...props}) =>
	new joint.shapes.uml.Class({
		size, name, attributes, methods,
		attrs: {
			rect: {
				onclick: 'javascript:console.log(\'a\')'
			},
			'.uml-class-name-rect': {
				fill: '#ff8450',
				stroke: '#fff',
				'stroke-width': 0.5,
			},
			'.uml-class-attrs-rect, .uml-class-methods-rect': {
				fill: '#fe976a',
				stroke: '#fff',
				'stroke-width': 0.5
			},
			'.uml-class-attrs-text': {
				ref: '.uml-class-attrs-rect',
				'ref-y': 0.5,
				'y-alignment': 'middle'
			},
			'.uml-class-methods-text': {
				ref: '.uml-class-methods-rect',
				'ref-y': 0.5,
				'y-alignment': 'middle'
			}
		},
		...props
	});

const parsePrefix = (iri) => {
	const suffix = iri.replace(/.*(\/|#)/, '');
	const prefixIri = iri.replace(/(\/|#)[^\/#]*$/, '$1');
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
		queryParts.properties = _.map(selectedProperties, (value, predicate) => {
			const name = value.show ? `?${value.name}` : '[]';

			const { alias, suffix, prefixIri } = parsePrefix(predicate);
			if (alias) {
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
		}).join('');
	}

	return `${_.map(usedPrefixes, (iri, name) => `PREFIX ${name}: <${iri}>`).join('\n')}

SELECT * WHERE {
  ?s a ?type.${queryParts.properties}${queryParts.values}
}
LIMIT 100`;
};
