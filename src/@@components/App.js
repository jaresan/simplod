/**
 * @file Root application component displaying two main parts, the graph and list view along with additional controls.
 * Loads the data (graph, model, endpoint) on load based on the URL parameters specified.
 * @module @@components/App
 */
import React, {Component} from 'react';
import {GraphContainer} from './GraphContainer';
import { Alert, Layout } from 'antd';
import { getContainerStyle, getGraphContainerStyle, getMenuStyle } from './App.styled';
import { EntityList } from './entityList/EntityList';
import styled from '@emotion/styled';
import { Tabs } from 'antd';
import {ColumnList} from './ColumnList';
import {onAppStart} from '@@actions/lifecycle';

import 'antd/dist/antd.compact.css';
import { Menu } from '@@components/menu/menu';
import { loadGraphFromURL } from '@@actions/load';
import { getCartesianProduct, getHorizontalLayout, getModelQuery } from '@@selectors';
import { connect } from 'react-redux';
import { translated } from '@@localization';
import {css} from '@emotion/css';

const {Content, Footer} = Layout;

const TabHeight = css`
  .ant-tabs-content {
    height: 100%;
  }
`;

const TabPane = styled(Tabs.TabPane)`
  height: 100%;
`;

const EntityListContainer = styled.div`
  border: solid 1px black;
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class App extends Component {
  state = {
    tabKey: 'available'
  };

  constructor(props) {
    super(props);
    const url = new URL(window.location);
    this.schemaURL = url.searchParams.get('schemaURL');
    this.endpointURL = url.searchParams.get('endpointURL');
    this.modelURL = url.searchParams.get('modelURL');
  }

  componentDidMount() {
    onAppStart()
      .then(() => {
        if (this.schemaURL || this.modelURL) {
          loadGraphFromURL({dataSchemaURL: this.schemaURL, endpointURL: this.endpointURL, modelURL: this.modelURL})
        }
      });
  }

  updateTabKey = tabKey => this.setState({tabKey});

  render() {
    const {horizontalLayout, cartesianProduct, modelQuery} = this.props;

    return (
      <Layout>
        <Menu/>
        <Content style={{padding: '0 50px', background: 'white'}}>
          <div style={getContainerStyle(horizontalLayout)}>
            <div style={getGraphContainerStyle(horizontalLayout)}>
              <GraphContainer />
            </div>
            <div style={getMenuStyle(horizontalLayout)}>
              {modelQuery && <Alert type='error' showIcon={false} message={translated('Current SPARQL Query has been manually edited, making any changes in the application will remove these edits.')} banner />}
              {cartesianProduct && <Alert message={translated('Current selection is not a connected graph and might result in querying a cartesian product.')} banner />}
              <Tabs className={TabHeight} style={{width: '100%', height: '90vh'}} onChange={this.updateTabKey}>
                <TabPane tab={translated('Available')} key="available">
                  <EntityListContainer>
                    <EntityList />
                  </EntityListContainer>
                </TabPane>
                <TabPane tab={translated('Selected')} key="selected">
                  <ColumnList />
                  <EntityListContainer>
                    <EntityList active={this.state.tabKey === 'selected'} onlySelected />
                  </EntityListContainer>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}><a href="https://jaresan.github.io/simplod/">Simplified view for linked data ©2020 Created by Antonin Jares</a></Footer>
      </Layout>
    );
  }
}

const mapStateToProps = appState => ({
  horizontalLayout: getHorizontalLayout(appState),
  cartesianProduct: getCartesianProduct(appState),
  modelQuery: getModelQuery(appState)
});

export default connect(mapStateToProps, null)(App);
