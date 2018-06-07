import joint from 'jointjs';
import _ from 'lodash';

export const createUMLInstance = ({ size = { width: 250, height: 150 }, name, attributes, methods, ...props }) =>
	new joint.shapes.uml.Class({
		size, name, attributes, methods,
		attrs: {
			rect: {
				onclick: "javascript:console.log('a')"
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
	return properties.map((prop, index) => `<${prop.predicate}> ?${prop.predicate.replace(/.*(\/|#)/, '')}`).join(';\n');
};

export const parseSPARQLQuery = ({
	prefixes,
	classes
}) => {
	const empty = !Object.keys(classes).length;
	const optionalPart = empty ? '' : `\nOPTIONAL {
			?s ${_.map(classes, classData => getProperties(classData)).join(';\n') }
	}`;
	const valuesPart = empty ? '' : `\nVALUES (?type) {
		${Object.keys(classes).map(type => `(<${type}>)`).join('\n')}
	}`;

	return `${_.map(prefixes, (iri, name) => `PREFIX ${name}: <${iri}>`).join('\n')}

SELECT * WHERE {
  ?s a ?type.${optionalPart}${valuesPart}
}
LIMIT 100`;
};

//
// const getProperties = classData => {
// 	const properties = classData.methods.concat(classData.properties);
// 	return properties.map((prop, index) => `<${prop.predicate}> ?${prop.predicate}`).join(';\n');
// };
//
// const parseSPARQLQuery = ({
// 	                          prefixes,
// 	                          classes
//                           }) => {
// 	return `
// ${_.map(prefixes, (iri, name) => `PREFIX ${name}: <${iri}>`).join('\n')}
// SELECT * WHERE {
//   ?s a ?type.
//   OPTIONAL {
//     ?s ${_.map(classes, classData => getProperties(classData)).join('\n') }
//   }
//   VALUES (?type) {
//   	${Object.keys(classes).map(type => `(${type})`).join('\n')}
// 	}
// }
// LIMIT 100`;
// };
// a = temp1; yasgui.current().setQuery(parseSPARQLQuery({classes: a.data, prefixes: a.__prefixes__}))