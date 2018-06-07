import React from 'react';
import joint from 'jointjs';
import * as _ from 'underscore';
import { createUMLInstance, parseSPARQLQuery } from './utils';

import 'jointjs/css/layout.css';
import './UMLExample.css';

const DEFAULT_LINK_ATTRS = {
	labelSize: {
		width: 20,
		height: 20
	},
	labelPosition: 'r',
	attrs: {
		'.connection': {
			stroke: 'gray',
			strokeWidth: 2,
			targetMarker: {
				type: 'path',
				fill: 'gray',
				stroke: 'none',
				d: 'M 10 -10 0 0 10 10 z'
			}
		},
		'.marker-arrowheads': {display: 'none'},
		'.link-tools': {display: 'none'}
	}
};

export default class UMLExample extends React.Component {
	constructor() {
		super();
		this.element = null;
		this.paper = null;
		this.graph = null;
	}

	state = {
		layoutTypes: ['network-simplex', 'longest-path'],
		prefixes: {},
		selectedClasses: {}
	};

	componentDidMount() {
		fetch('http://localhost:5000/api/hardExample', {method: 'GET', mode: 'cors'})
			.then(data => data.json())
			.then(json => {
				console.log(json);
				window.temp1 = json;
				this.setState({
					prefixes: json.__prefixes__
				});
				this.createGraph({
					data: json.data, prefixes: json.__prefixes__
				});
				this.registerEventHandlers();
				this.changeLayoutType();
			});


		const yasgui = window.YASGUI(document.getElementById("yasgui"), {
			api: {
				corsProxy: 'http://sparql.org/sparql'
			},
			catalogueEndpoints: {},
			endpoint: 'http://linked.opendata.cz/sparql'
		});
		window.yasgui = yasgui;
	}

	toggleSelected = (cellView, select) => {
		if (select) {
			cellView.highlight(null, {
				highlighter: {
					name: 'addClass',
					options: {
						className: 'selected'
					}
				}
			});
			this.setState({
				selectedClasses: {
					...this.state.selectedClasses,
					[cellView.model.attributes.id]: cellView.model.attributes.classData
				}
			});
			window.yasgui.current()
				.setQuery(parseSPARQLQuery({classes: this.state.selectedClasses, prefixes: this.state.prefixes}))
		} else {
			cellView.unhighlight(null, {
				highlighter: {
					name: 'addClass',
					options: {
						className: 'selected'
					}
				}
			});
			this.setState({
				selectedClasses: {}
			});
			window.yasgui.current()
				.setQuery(parseSPARQLQuery({classes: this.state.selectedClasses, prefixes: this.state.prefixes}))
		}
	};

	paperOnClick = event => {
		this.graph.getCells().forEach(cell => {
			this.toggleSelected(cell.findView(this.paper), false);
		});
	};


	// FIXME: Refactor into OOP, each UML instance with it's own onclick handle, use register to distribute clicks
	cellOnClick = cellView => {
		this.toggleSelected(cellView, true);
		console.log(cellView);
	};

	changeLayoutType = () => {
		const layoutTypes = this.state.layoutTypes;
		const typeToUse = layoutTypes.pop();
		layoutTypes.unshift(typeToUse);
		this.setState({
			layoutTypes
		});
		joint.layout.DirectedGraph.layout(this.graph, {
			nodeSep: 40,
			rankSep: 40,
			edgeSep: 20,
			marginX: 100,
			marginY: 100,
			rankDir: 'TB',
			setVertices: true,
			setLabels: true
		});
	};

	registerEventHandlers = () => {
		this.paper.on('cell:pointerclick', this.cellOnClick);
		this.paper.on('blank:pointerclick', this.paperOnClick);
	};

	// FIXME: Replace all IRIs with prefixes where appropriate
	createGraph({data, prefixes}) {
		this.graph = new joint.dia.Graph();
		this.paper = new joint.dia.Paper({
			el: this.element,
			width: 20000,
			height: 15000,
			model: this.graph,
			gridSize: 1
		});

		const elements = _.reduce(data, (acc, classData, classId) => {
			const links = [];
			const attributes = [];
			for (const property of classData.properties) {
				attributes.push(`${property.predicate} - ${property.type}`);
			}

			for (const linkData of classData.methods) {
				const link = new joint.dia.Link({
					source: {id: classId},
					target: {id: linkData.object},
					...DEFAULT_LINK_ATTRS,
					labels: [{
						attrs: {
							rect: {
								fill: 'white'
							},
							text: {
								text: linkData.predicate
							}
						}
					}]
				});
				links.push(link);
			}

			// FIXME: Replace prefixes properly
			const node = createUMLInstance({
				name: classId,
				id: classId,
				attributes,
				classData
			});

			acc.unshift(node);
			return acc.concat(links);
		}, []);

		this.graph.addCells(elements);
	}

	render() {
		return (
			<div className="application-container">
				<div className="uml-example-container">
					<button onClick={this.changeLayoutType}>{ this.state.layoutTypes[this.state.layoutTypes.length - 1] }</button>
					<div ref={ node => this.element = node }/>
				</div>
				<div id="yasgui"/>
			</div>
		);
	}
}
