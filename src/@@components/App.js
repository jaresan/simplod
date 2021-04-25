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
import { loadGraphFromURL } from '@@actions/model/load-graph';
import { getCartesianProduct, getHorizontalLayout } from '@@selectors';
import { connect } from 'react-redux';
import { translated } from '@@localization';
import {css} from '@emotion/css';
// import { loadLocalData } from '@@actions/save-load';
// import configs from '../dev_examples';

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

    this.courtExampleURL = 'https://sparql-proxy-api.jaresantonin.now.sh/spo-court.ttl';
    this.applicantsURL = 'https://sparql-proxy-api.jaresantonin.now.sh/spo-job-applicants.ttl';
    // this.govURL = "https://sparql-proxy-api.jaresantonin.now.sh/data.gov.cz.ttl";
    // this.beefURL = '/samples/http---linked.opendata.cz-sparql.ttl'
    // this.beefEndpointURL = 'http://linked.opendata.cz/sparql'
    // this.ukURL = '/samples/http---data.open.ac.uk-query.ttl';
    // this.ukEndpointURL = 'http://data.open.ac.uk/query';
    // // this.beefURL = '/samples/http---nl.dbpedia.org-sparql.ttl';
    // // this.endpointURL = 'http://nl.dbpedia.org/sparql';
    // const examples = [
    //   ['/samples/http---www.imagesnippets.com-sparql-images.ttl', 'https://imagesnippets.com/sparql/images']
    // ];
    // this.schemaURL = ;
    // this.endpointURL = ;
    if (process.env.NODE_ENV === 'development') {
      this.schemaURL = this.courtExampleURL;
      // this.schemaURL = this.schemaURL || this.applicantsURL;
      // this.schemaURL = this.govURL;
      // this.schemaURL = this.beefURL;
      this.endpointURL = 'https://data.gov.cz/sparql';
      this.schemaURL = '/samples/http---data.nobelprize.org-sparql.ttl';
      this.endpointURL = 'http://data.nobelprize.org/sparql';
    }
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
    const {horizontalLayout, cartesianProduct} = this.props;

    return (
      <Layout>
        <Menu/>
        <Content style={{padding: '0 50px', background: 'white'}}>
          <div style={getContainerStyle(horizontalLayout)}>
            <div style={getGraphContainerStyle(horizontalLayout)}>
              <GraphContainer />
            </div>
            {/*{*/}
            {/*  configs.map(([file, endpoint]) =>*/}
            {/*    <Button onClick={() => loadGraphFromURL({dataSchemaURL: file, endpointURL: endpoint})}>{file}</Button>*/}
            {/*  )*/}
            {/*}*/}
            <div style={getMenuStyle(horizontalLayout)}>
              {cartesianProduct && <Alert message={translated('Current selection is not a connected graph and might result in querying a cartesian product.')} banner />}
              <Tabs className={TabHeight} style={{width: '100%', height: '90vh'}} onChange={this.updateTabKey}>
                <TabPane tab="Available" key="available">
                  <EntityListContainer>
                    <EntityList />
                  </EntityListContainer>
                </TabPane>
                <TabPane tab="Selected" key="selected">
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
  cartesianProduct: getCartesianProduct(appState)
});

export default connect(mapStateToProps, null)(App);
