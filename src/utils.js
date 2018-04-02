import joint from 'jointjs';

export const createUMLInstance = ({ size = { width: 250, height: 150 }, name, attributes, methods, ...props }) =>
	new joint.shapes.uml.Class({
		size, name, attributes, methods,
		ports: {
			groups: {
				'top': {
					position: {
						name: 'top',
						args: {
							dy: -30
						},
					},
					label: {
						position: {
							name: 'top',
							args: {
								offset: 10,
								attrs: {}
							}
						}
					}
				}
			},
			items: []
		},
		attrs: {
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

