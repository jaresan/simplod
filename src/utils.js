import joint from 'jointjs';
import _ from 'lodash';

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

// FIXME: Instead of prop.predicate in the variable name use name from the user set parameter
const getProperties = classData => {
	const properties = classData.methods.concat(classData.properties);
	return properties.map((prop, index) => `<${prop.predicate}> ?${prop.predicate.replace(/.*(\/|#)/, '')}`);
};

export const parseSPARQLQuery = ({
 prefixes,
 classes
}) => {
	let queryParts = {
		optional: '',
		values: ''
	};
	if (Object.keys(classes).length) {
		queryParts = _.reduce(classes, (acc, classData, classType) => {

			// FIXME: Proper indentation, fix duplicate predicate searches
			acc.optional = acc.optional.concat(
				getProperties(classData).map(propString => `\nOPTIONAL {
					?s ${propString}.
				}`)
			);
			acc.values.push(`(<${classType}>)`);
			return acc;
		}, {
			optional: [],
			values: []
		});

		queryParts.optional = queryParts.optional.join('\n');

		queryParts.values = `\nVALUES (?type) {
			${queryParts.values.join('\n')}
		}`;
	}


	return `${_.map(prefixes, (iri, name) => `PREFIX ${name}: <${iri}>`).join('\n')}

SELECT * WHERE {
  ?s a ?type.${queryParts.optional}${queryParts.values}
}
LIMIT 100`;
};
