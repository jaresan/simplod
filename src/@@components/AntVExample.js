import React from 'react';
import G6 from '@antv/g6';
import {Graph, getNodes, getEdges} from '@@graph';
import styled from '@emotion/styled';
import { Button, Tooltip } from 'antd';
import {CompressOutlined} from '@ant-design/icons';
import { dispatch } from '@@app-state';
import * as ModelState from '@@app-state/model/state';

// const minimap = new G6.Minimap({
//   size: [300, 300],
//   className: 'minimap',
//   type: 'delegate',
// });

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const GraphContainer = styled.div`
  border: solid 1px black;
  width: 100%;
  height: 100%;
`;

export class AntVExample extends React.Component {
  componentDidMount() {
    this.loadData();
    this.resizeObserver = new ResizeObserver(this.onContainerResize);

    this.resizeObserver.observe(this.containerNode);
    window.graph = this.graph;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      this.loadData();
    }
  }

  onContainerResize = e => {
    this.graph.graph.changeSize(this.mountNode.clientWidth - 12, this.mountNode.clientHeight - 12);
  };

  componentWillUnmount() {
    this.resizeObserver.unobserve(this.mountNode);
  }

  loadData() {
    // FIXME: Add @@graph handling to reducers and sagas --> @@graph instance should be available in the state
    console.time('loadData');
    const {data} = this.props;

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
      width: this.mountNode.clientWidth,
      height: this.mountNode.clientHeight,
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
          'drag-canvas', 'drag-node',
          {
            type: 'zoom-canvas',
            sensitivity: 1
          }
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

    console.time('@@graph.loadData')
    this.graph.loadData({nodes, edges});
    console.timeEnd('@@graph.loadData')
    console.timeEnd('loadData');
  }

  fitView = () => this.graph.graph.fitView();
  clearSelection = () => dispatch(ModelState.deselectAll);

  render() {
    return <Container ref={ref => this.containerNode = ref}>
      <Button title="Fit to view" onClick={this.fitView}>Fit to view</Button>
      <Button title="Clear selection" onClick={this.clearSelection}>Clear selection</Button>
      <GraphContainer ref={ref => this.mountNode = ref}/>
    </Container>;
  }
}

