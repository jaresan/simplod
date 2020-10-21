import React from 'react';
import G6 from '@antv/g6';
import {Graph, getNodes, getEdges} from './graph';

// const minimap = new G6.Minimap({
//   size: [300, 300],
//   className: 'minimap',
//   type: 'delegate',
// });

export class AntVExample extends React.Component {
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadData();
  }

  loadData() {
    // FIXME: Add graph handling to reducers and sagas --> graph instance should be available in the state
    const {data, width, height} = this.props;

    if (this.graph) {
      this.graph.destroy();
    }

    const nodes = getNodes(data);
    const edges = getEdges(data);
    const graph = new G6.Graph({
      container: this.mountNode,
      width, height,
      // renderer: 'svg',
      fitView: true,
      modes: {
        default: [
          // {
          //   type: 'activate-relations',
          //   trigger: 'click',
          //   activeState: 'inRelation',
          //   inactiveState: 'notInRelation',
          // },
          'drag-canvas', 'drag-node', 'zoom-canvas'
        ]
      },
      layout: {
        type: 'grid',
        cols: 3,
        preventOverlap: true,
        workerEnabled: true
      },
      // plugins: [minimap]
    });

    this.graph = new Graph(graph);

    this.graph.loadData({nodes, edges});
  }

  render() {
    return <div ref={ref => this.mountNode = ref}/>;
  }
}

