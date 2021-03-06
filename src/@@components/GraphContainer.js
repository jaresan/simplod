import React from 'react';
import G6 from '@antv/g6';
import {Graph} from '@@graph';
import styled from '@emotion/styled';
import { Space, Tooltip } from 'antd';
import { dispatch } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import {
  PlayCircleFilled,
  FullscreenExitOutlined,
  StopOutlined,
  EyeInvisibleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { openYasguiModal } from '@@components/Yasgui';
import { translated } from '@@localization';
import { getSelectedEdgePropertyIds, getProperties, getClasses } from '@@selectors';
import {connect} from 'react-redux';
import { PropertyList } from '@@components/entityList/property-list';
import { isEmpty, pick, values } from 'ramda';

// const minimap = new G6.Minimap({
//   size: [300, 300],
//   className: 'minimap',
//   type: 'delegate',
// });

const Container = styled.div`
  width: 100%;
  height: 90vh;
`;

const GraphMountContainer = styled.div`
  border: solid 1px black;
  width: 100%;
  height: 100%;
  position: relative;
`;

const GraphControlsContainer = styled.div`
  position: absolute;
  right: 16px;
  top: 8px;
  font-size: 32px;
  padding: 4px 12px;
  border: solid 1px black;
  border-radius: 3%;
  background: white;
`;

const PropertyListContainer = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 16px);
  border: solid 1px black;
`;

class GraphContainerComponent extends React.Component {
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

  onContainerResize = () => {
    if (this.mountNode) {
      this.graph.changeSize(this.mountNode.clientWidth - 12, this.mountNode.clientHeight - 12);
    }
  };

  componentWillUnmount() {
    this.resizeObserver.unobserve(this.mountNode);
  }

  fitView = () => this.graph.fitView();
  clearSelection = () => dispatch(ModelState.deselectAll);

  showAll = () => dispatch(ModelState.showAll);
  hideUnselected = () => dispatch(ModelState.hideUnselected);

  render() {
    const {properties, entities} = this.props;
    return <Container ref={ref => this.containerNode = ref}>
      <GraphMountContainer ref={ref => this.mountNode = ref}>
        <GraphControlsContainer>
          <Space>
            <Tooltip title={translated('Show all entities')}>
              <EyeOutlined onClick={this.showAll}/>
            </Tooltip>
            <Tooltip title={translated('Hide not selected entities')}>
              <EyeInvisibleOutlined onClick={this.hideUnselected}/>
            </Tooltip>
            <Tooltip title={translated('Fit to view')}>
              <FullscreenExitOutlined onClick={this.fitView}/>
            </Tooltip>
            <Tooltip title={translated('Clear selection')}>
              <StopOutlined onClick={this.clearSelection}/>
            </Tooltip>
            <Tooltip title={translated('Execute SPARQL Query')}>
              <PlayCircleFilled onClick={() => openYasguiModal({runQuery: true})} />
            </Tooltip>
          </Space>
          {
            !!properties && <PropertyListContainer>
              <PropertyList properties={properties} entities={entities} />
            </PropertyListContainer>
          }
        </GraphControlsContainer>
      </GraphMountContainer>
    </Container>;
  }
}

const mapStateToProps = appState => {
  const selectedEdgePropertyIds = getSelectedEdgePropertyIds(appState);
  if (selectedEdgePropertyIds.length) {
    const properties = pick(selectedEdgePropertyIds, getProperties(appState));

    if (isEmpty(properties)) {
      return {
        properties: null
      };
    }

    const {source, target} = values(properties)[0];
    const entities = pick([source, target], getClasses(appState));
    return {
      properties,
      entities
    }
  }

  return {
    selectedEdgePropertyIds
  }
};

export const GraphContainer = connect(mapStateToProps, null)(GraphContainerComponent);

