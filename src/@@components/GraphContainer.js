import React from 'react';
import G6 from '@antv/g6';
import {Graph} from '@@graph';
import styled from '@emotion/styled';
import { Button } from 'antd';
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

const GraphMountContainer = styled.div`
  border: solid 1px black;
  width: 100%;
  height: 100%;
`;

export class GraphContainer extends React.Component {
  componentDidMount() {
    this.instantiateGraph();
    this.resizeObserver = new ResizeObserver(this.onContainerResize);

    this.resizeObserver.observe(this.containerNode);
  }

  instantiateGraph() {
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

    this.graph = graph;
    Graph.setInstance(graph);
  }

  onContainerResize = e => {
    if (this.mountNode) {
      this.graph.changeSize(this.mountNode.clientWidth - 12, this.mountNode.clientHeight - 12);
    }
  };

  componentWillUnmount() {
    this.resizeObserver.unobserve(this.mountNode);
  }

  fitView = () => this.graph.fitView();
  clearSelection = () => dispatch(ModelState.deselectAll);

  render() {
    return <Container ref={ref => this.containerNode = ref}>
      <Button title="Fit to view" onClick={this.fitView}>Fit to view</Button>
      <Button title="Clear selection" onClick={this.clearSelection}>Clear selection</Button>
      <GraphMountContainer ref={ref => this.mountNode = ref}/>
    </Container>;
  }
}

