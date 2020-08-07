import React from 'react';
import G6 from '@antv/g6';
import {Graph, getNodes, getEdges} from './graph';

const minimap = new G6.Minimap({
  size: [300, 300],
  className: 'minimap',
  type: 'delegate',
});

export class AntVExample extends React.Component {
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadData();
  }

  loadData() {
    const {data, width, height} = this.props;

    const graphData = {nodes: getNodes(data), edges: getEdges(data)};

    if (!this.graph) {
      this.graph = new G6.Graph({
        container: this.mountNode,
        width, height,
        // renderer: 'svg',
        fitViewPadding: [20, 40, 50, 20],
        modes: {
          default: [
            // {
            //   type: 'activate-relations',
            //   trigger: 'click',
            //   activeState: 'inRelation',
            //   inactiveState: 'notInRelation',
            // },
            'drag-canvas', 'zoom-canvas', 'drag-node',
          ]
        },
        layout: {
          type: 'grid',
          preventOverlap: true,
          workerEnabled: true
        },
        plugins: [minimap]
      });
    }


    // FIXME: Don't create new graph, reload old one
    new Graph(this.graph, graphData);
  }

  render() {
    return <div ref={ref => this.mountNode = ref}/>;
  }
}

