import React, {Component} from 'react';
import {GraphContainer} from './GraphContainer';
import { Radio, Button, Space, Layout } from 'antd';
import { getContainerStyle, getGraphContainerStyle, getMenuStyle } from './App.styled';
import { EntityList } from './entityList/EntityList';
import styled from '@emotion/styled';
import { Tabs } from 'antd';
import {ColumnList} from './ColumnList';
import {onAppStart} from '@@actions/lifecycle';

import 'antd/dist/antd.compact.css';
import { Menu } from '@@components/menu/menu';
import { loadGraphFromURL } from '@@actions/model/load-graph';

const {TabPane} = Tabs;
const {Content, Footer} = Layout;

const EntityListContainer = styled.div`
  border: solid 1px black;
  overflow: auto;
  width: 100%;
  height: 512px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class App extends Component {
  state = {
    horizontalLayout: true
  };

  constructor(props) {
    super(props);
    const url = new URL(window.location);
    this.schemaURL = url.searchParams.get('schemaURL');
    this.endpointURL = url.searchParams.get('endpointURL') || 'http://dbpedia.org/sparql';
    this.modelURL = url.searchParams.get('modelURL');

    this.courtExampleURL = 'https://sparql-proxy-api.jaresantonin.now.sh/spo-court.ttl';
    this.applicantsURL = 'https://sparql-proxy-api.jaresantonin.now.sh/spo-job-applicants.ttl';
    this.govURL = "https://sparql-proxy-api.jaresantonin.now.sh/data.gov.cz.ttl";
    this.beefURL = '/samples/http---linked.opendata.cz-sparql.ttl'
    this.beefEndpointURL = 'http://linked.opendata.cz/sparql'
    this.ukURL = '/samples/http---data.open.ac.uk-query.ttl';
    this.ukEndpointURL = 'http://data.open.ac.uk/query';
    // this.beefURL = '/samples/http---nl.dbpedia.org-sparql.ttl';
    // this.endpointURL = 'http://nl.dbpedia.org/sparql';
    if (process.env.NODE_ENV === 'development') {
      // this.schemaURL = this.courtExampleURL;
      this.schemaURL = this.schemaURL || this.applicantsURL;
      // this.schemaURL = this.govURL;
      // this.schemaURL = this.beefURL;
      this.endpointURL = "https://data.gov.cz/sparql";
    }
  }

  componentDidMount() {
    onAppStart()
      .then(() => loadGraphFromURL({dataSchemaURL: this.schemaURL, endpointURL: this.endpointURL, modelURL: this.modelURL}));
  }

  toggleLayout = ({target: {value: horizontalLayout}}) => this.setState({horizontalLayout})

  render() {
    const {horizontalLayout} = this.state;

    return (
      <Layout>
        <Menu/>
        <Content style={{padding: '0 50px', background: 'white'}}>
          <Space>
            <Button onClick={() => loadGraphFromURL({dataSchemaURL: this.applicantsURL, endpointURL: this.endpointURL})}>Single</Button>
            <Button onClick={() => loadGraphFromURL({dataSchemaURL: this.courtExampleURL, endpointURL: this.endpointURL})}>Court example</Button>
            <Button onClick={() => loadGraphFromURL({dataSchemaURL: this.govURL, endpointURL: this.endpointURL})}>Gov example</Button>
          </Space>
          <br/>
          <Radio.Group onChange={this.toggleLayout} value={this.state.horizontalLayout}>
            View:
            <Radio.Button value={true}>Horizontal</Radio.Button>
            <Radio.Button value={false}>Vertical</Radio.Button>
          </Radio.Group>
          <br/>
          <div style={getContainerStyle(horizontalLayout)}>
            <div style={getGraphContainerStyle(horizontalLayout)}>
              <GraphContainer />
            </div>
            <div style={getMenuStyle(horizontalLayout)}>
              <Tabs style={{width: '100%'}}>
                <TabPane tab="Available" key="1">
                  <EntityListContainer>
                    <EntityList />
                  </EntityListContainer>
                </TabPane>
                <TabPane tab="Selected" key="2">
                  <Space direction="vertical">
                    <ColumnList />
                    <EntityListContainer>
                      <EntityList onlySelected />
                    </EntityListContainer>
                  </Space>
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

export default App;
