import React from 'react';
import * as _ from 'underscore';
import joint from 'jointjs';
import 'jointjs/css/layout.css';
import './Example.css';

export default class Example extends React.Component {
  constructor() {
    super();
    this.element = null;
    this.paper = null;
    this.graph = null;
    this.g = null;
  }

  componentDidMount() {
    this.renderGraph();
  }

  paperOnClick = event => {
    this.graph.getCells().forEach(cell => {
      cell.findView(this.paper).unhighlight(null/* defaults to cellView.el */, {
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
    cellView.highlight(null/* defaults to cellView.el */, {
      highlighter: {
        name: 'addClass',
        options: {
          className: 'selected'
        }
      }
    });
  };

  renderGraph() {
    const nodes = {
      kspacey: {label: "Kevin Spacey", width: 144, height: 100},
      swilliams: {label: "Saul Williams", width: 160, height: 100},
      bpitt: {label: "Brad Pitt", width: 108, height: 100},
      hford: {label: "Harrison Ford", width: 168, height: 100},
      lwilson: {label: "Luke Wilson", width: 144, height: 100},
      kbacon: {label: "Kevin Bacon", width: 121, height: 100}
    };

    const edges = {
			kspacey: "swilliams",
			swilliams: "kbacon",
			bpitt: "kbacon",
			hford: "lwilson",
			lwilson: "kbacon"
		};

    this.graph = new joint.dia.Graph();
    const paper = new joint.dia.Paper({
      el: this.element,
      width: 2000,
      height: 1500,
      model: this.graph,
      gridSize: 1
    });

    paper.on('cell:pointerclick', this.cellOnClick);
    paper.on('blank:pointerclick', this.paperOnClick);
    this.paper = paper;

    let elems = [];
    elems = _.reduce(nodes, (acc, node, id) => {
      const rect = new joint.shapes.basic.Rect({
        id,
        size: {width: node.width, height: node.height},
        attrs: {rect: {fill: 'blue'}, text: {text: node.label, fill: 'white'}}
      });
      return acc.concat(rect);
    }, elems);

    // const mammal = new joint.shapes.uml.Interface({
    //   position: { x:300  , y: 50 },
    //   size: { width: 240, height: 100 },
    //   name: 'Mammal',
    //   attributes: ['dob: Date'],
    //   methods: ['+ setDateOfBirth(dob: Date): Void','+ getAgeAsDays(): Numeric'],
    //   attrs: {
    //     '.uml-class-name-rect': {
    //       fill: '#feb662',
    //       stroke: '#ffffff',
    //       'stroke-width': 0.5
    //     },
    //     '.uml-class-attrs-rect, .uml-class-methods-rect': {
    //       fill: '#fdc886',
    //       stroke: '#fff',
    //       'stroke-width': 0.5
    //     },
    //     '.uml-class-attrs-text': {
    //       ref: '.uml-class-attrs-rect',
    //       'ref-y': 0.5,
    //       'y-alignment': 'middle'
    //     },
    //     '.uml-class-methods-text': {
    //       ref: '.uml-class-methods-rect',
    //       'ref-y': 0.5,
    //       'y-alignment': 'middle'
    //     }
    //
    //   }
    // });
    //
    // this.graph.addCell(mammal);

    elems = _.reduce(edges, (acc, target, id) => {
      const link = new joint.dia.Link({
        source: {id},
        target: {id: target},
        router: { name: 'metro'  }
      });
      link.attr({
        '.marker-arrowheads': { display: 'none' },
				'.link-tools': { display: 'none' }
      });
      link.label(0, {
        attrs: {
          rect: { fill: 'white' },
          text: { fill: 'black', text: 'my label' }
        }
      });
      return acc.concat(link);
    }, elems);

    this.graph.addCells(elems);

    joint.layout.DirectedGraph.layout(this.graph, {
      nodeSep: 100,
      rankSep: 100,
      edgeSep: 80,
      rankDir: "TB"
    });
  }

  render() {
		return (
			<div className="paper-container">
				<div ref={ node => this.element = node }/>
			</div>
		);
  }
}
