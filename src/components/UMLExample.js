import React from 'react';
import joint from 'jointjs';
import * as _ from 'underscore';
import { connect } from 'react-redux';
import Actions from 'src/actions';
import { createUMLInstance } from 'src/utils';

import 'jointjs/css/layout.css';
import { parseSPO } from '../parseSPO';

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

class UMLExample extends React.Component {
	constructor() {
		super();
		this.element = null;
		this.paper = null;
		this.graph = null;
	}

	componentDidMount() {
    fetch('http://sparql-proxy-api.herokuapp.com/api/ttl/easyExample')
      .then(res => res.text())
      .then(async ttl => {
				const json = await parseSPO(ttl);
        this.setState({
          prefixes: json.__prefixes__
        });
        this.createGraph({
          data: json.data, prefixes: json.__prefixes__
        });
        this.props.setPrefixes(json.__prefixes__);
        this.registerEventHandlers();
        this.setLayout();
			});
  }

	// FIXME: Refactor into OOP, each UML instance with it's own onclick handle, use register to distribute clicks

	setLayout() {
		joint.layout.DirectedGraph.layout(this.graph, {
			nodeSep: 40,
			rankSep: 40,
			edgeSep: 20,
			marginX: 100,
			marginY: 100,
			ranker: 'network-simplex',
			rankDir: 'TB',
			setVertices: true,
			setLabels: true
		});
	}

	registerEventHandlers = () => {
		this.paper.on('cell:pointerclick', this.props.onCellClick);
		this.paper.on('blank:pointerclick', this.props.onPaperClick);
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
			<div className="uml-example-container">
				<div ref={ node => this.element = node }/>
			</div>
		);
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
	onPaperClick: Actions.Creators.s_onPaperClick,
	onCellClick: Actions.Creators.s_onCellClick,
	setPrefixes: Actions.Creators.r_setPrefixes
};

export default connect(mapStateToProps, mapDispatchToProps)(UMLExample);
