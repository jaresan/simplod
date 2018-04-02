import React from 'react';
import joint from 'jointjs';
import * as _ from 'underscore';
import { classes } from './constants/sample';
import { createUMLInstance } from './utils';

import 'jointjs/css/layout.css';
import './Example.css';

const LINK_ATTRS = {
	'.connection': {
		stroke: 'gray',
		strokeWidth: 2,
		pointerEvents: 'none',
		targetMarker: {
			type: 'path',
			fill: 'gray',
			stroke: 'none',
			d: 'M 10 -10 0 0 10 10 z'
		}
	},
	'.marker-arrowheads': {display: 'none'},
	'.link-tools': {display: 'none'}
};

export default class UMLExample extends React.Component {
	constructor() {
		super();
		this.element = null;
		this.paper = null;
		this.graph = null;
	}

	state = {
		layoutTypes: ['network-simplex', 'longest-path']
	};

	componentDidMount() {
		this.createGraph();
		this.registerEventHandlers();
		this.changeLayoutType();
	}

	paperOnClick = event => {
		this.graph.getCells().forEach(cell => {
			cell.findView(this.paper).unhighlight(null, {
				highlighter: {
					name: 'addClass',
					options: {
						className: 'selected'
					}
				}
			})
		});
	};

	cellOnClick = cellView => {
		cellView.highlight(null, {
			highlighter: {
				name: 'addClass',
				options: {
					className: 'selected'
				}
			}
		});
	};

	changeLayoutType = () => {
		const layoutTypes = this.state.layoutTypes;
		const typeToUse = layoutTypes.pop();
		layoutTypes.unshift(typeToUse);
		this.setState({
			layoutTypes
		});
		joint.layout.DirectedGraph.layout(this.graph, {
			nodeSep: 100,
			rankSep: 100,
			edgeSep: 80,
			marginX: 100,
			marginY: 100,
			rankDir: 'TB',
			ranker: typeToUse,
			setVertices: true,
			setLabels: true,
		});
	};

	registerEventHandlers = () => {
		this.paper.on('cell:pointerclick', this.cellOnClick);
		this.paper.on('blank:pointerclick', this.paperOnClick);
	};

	createGraph() {
		this.graph = new joint.dia.Graph();
		this.paper = new joint.dia.Paper({
			el: this.element,
			width: 2000,
			height: 1500,
			model: this.graph,
			gridSize: 1
		});

		const elements = _.reduce(classes, (acc, umlClass, id) => {
			let link = null;
			const links = [];
			const attributes = [];
			for (const attrId in umlClass) {
				if (classes[umlClass[attrId]]) {
					link = new joint.dia.Link({
						source: {id},
						target: {id: umlClass[attrId]},
						router: {
							name: 'metro'
						},
						attrs: LINK_ATTRS,
						labelSize: {
							width: 20,
							height: 20
						},
						labelPosition: 'r',
						labels: [{
							attrs: {
								rect: {
									fill: 'white'
								},
								text: {
									text: attrId
								}
							}
						}]
					});
					links.push(link);
				}
				attributes.push(`${attrId} - ${umlClass[attrId]}`);
			}

			const node = createUMLInstance({
				name: id,
				id: id,
				attributes
			});
			acc.unshift(node);
			return acc.concat(links);
		}, []);

		this.graph.addCells(elements);
	}

	render() {
		return (
			<div className="uml-example-container">
				<button onClick={this.changeLayoutType}>{ this.state.layoutTypes[this.state.layoutTypes.length - 1] }</button>
				<div ref={ node => this.element = node }/>
			</div>
		);
	}
}
