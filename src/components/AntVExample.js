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
    if (prevProps.data !== this.props.data) {
      this.loadData();
    }
  }

  loadData() {
    // FIXME: Add graph handling to reducers and sagas --> graph instance should be available in the state
    console.time('loadData');
    const {data, width, height} = this.props;

    if (this.graph) {
      this.graph.destroy();
    }

    console.time('getNodes')
    const nodes = getNodes(data);
    console.timeEnd('getNodes')
    console.time('getEdges')
    const edges = getEdges(data);
    console.timeEnd('getEdges')
    console.time('graphConstructor')
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
        type: 'force',
        cols: 3,
        preventOverlap: true,
        nodeSpacing: 50,
        minNodeSpacing: 50,
        workerEnabled: true
      },
      // plugins: [minimap]
    });
    console.timeEnd('graphConstructor')

    console.time('graphConstructor2')
    this.graph = new Graph(graph);
    console.timeEnd('graphConstructor2')

    console.time('graph.loadData')
    this.graph.loadData({nodes, edges});
    console.timeEnd('graph.loadData')
    console.timeEnd('loadData');
  }

  render() {
    return <div ref={ref => this.mountNode = ref}/>;
  }
}

