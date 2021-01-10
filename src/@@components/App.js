import React, {Component} from 'react';
import YasguiContainer from './YasguiContainer';
import ControlPanel from '@@components/controls/control-panel';
import {connect} from 'react-redux';
import {parseTTL} from '@@data/parseTTL';
import {AntVExample} from './AntVExample';
import {invertObj, keys} from 'ramda';
import {Handler} from '@@graph/handlers/Handler';
import { Progress, Radio, Button, InputNumber, Space, Select, Switch, Layout, Avatar } from 'antd';
import {UserOutlined} from '@ant-design/icons';
import { getContainerStyle, getGraphContainerStyle, getMenuStyle } from './App.styled';
import { EntityList } from './entityList/EntityList';
import styled from '@emotion/styled';
import { Edge, Node, Property } from '@@graph/handlers';
import { Tabs } from 'antd';
import {ColumnList} from './ColumnList';
import {
  getLanguage,
  getLoadingHumanReadable,
  getLimit,
  getLimitEnabled,
  getAvatar,
  getLastSave,
  getShowHumanReadable
} from '@@selectors';
import { languages } from '@@constants/languages';
import * as ModelState from '@@app-state/model/state';
import * as YasguiState from '@@app-state/yasgui/state';
import * as SettingsState from '@@app-state/settings/state';
import {dispatchSet, dispatch} from '@@app-state';
import {loadLocalData, saveDataLocally} from '@@actions/save-load';
import {dataChanged} from '@@actions/lifecycle';
import {changeLanguage} from '@@actions/interactions/change-language';
import {onAppStart, onDataLoaded} from '@@actions/lifecycle';

import 'antd/dist/antd.compact.css';
import { Menu } from '@@components/menu/menu';
import { loadOwnView } from '@@actions/solid';


const {Option} = Select;
const {TabPane} = Tabs;
const {Header, Content, Sider, Footer} = Layout;

const EntityListContainer = styled.div`
  border: solid 1px black;
  overflow: auto;
  width: 100%;
  height: 512px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const languageOptions = languages.sort().map(code => <Option key={code} value={code}>{code}</Option>);

class App extends Component {
  state = {
    loaded: false,
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
    this.fetchData(this.schemaURL)
      .then(() => {
        if (this.modelURL) {
          loadOwnView(this.modelURL);
        }
      });
    dispatchSet(YasguiState.dataSchemaURL, this.schemaURL);
    dispatchSet(YasguiState.endpoint, this.endpointURL);
    onAppStart();
  }

  // FIXME: Move fetch to sagas
  fetchData = url => {
    // FIXME: Move Handler clearing somewhere else (ideally to saga which pings @@graph which pings handler)
    Handler.clear();
    Property.clear();
    Node.clear();
    Edge.clear();
    dispatchProps.clearData();
    return fetch(url)
      .then(res => res.text())
      .then(async ttl => {
        const json = await parseTTL(ttl);
        this.schemaData = keys(json.data).reduce((acc, key) =>
          Object.assign(acc, {
            [key]: json.data[key]
          }), {});

        this.setState({loaded: true});
        dispatchSet(YasguiState.prefixes, invertObj(json.__prefixes__));
        onDataLoaded();
      });
  };

  toggleLayout = ({target: {value: horizontalLayout}}) => this.setState({horizontalLayout})

  updateLimit = limit => {
    dispatchProps.updateLimit(limit);
    dataChanged();
  };

  toggleLimit = checked => {
    dispatchProps.toggleLimit(checked);
    dataChanged();
  };


  render() {
    const {language, loadingHumanReadable, limitEnabled, limit, avatar, lastSave, showHumanReadable} = this.props;
    const {horizontalLayout} = this.state;

    return (
      <Layout>
        <Header style={{background: '#EEE', border: 'solid 1px black'}}>
          <Menu/>
        </Header>
        <Content style={{padding: '0 50px', background: 'white'}}>
          <Space>
            <input type="text" ref={e => this.dataSchemaInput = e} placeholder="Data schema URL"/>
            <Button onClick={() => this.fetchData(this.dataSchemaInput.value)}>Reload schema URL</Button>
            <Button onClick={() => this.fetchData(this.applicantsURL)}>Single</Button>
            <Button onClick={() => this.fetchData(this.courtExampleURL)}>Court example</Button>
            <Button onClick={() => this.fetchData(this.govURL)}>Gov example</Button>
            <Button onClick={saveDataLocally}>Save local</Button>
            <Button onClick={loadLocalData}>Load local {new Date(lastSave).toLocaleString()}</Button>
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
              {
                this.state.loaded && <AntVExample
                  data={this.schemaData}
                />
              }
            </div>
            <div style={getMenuStyle(horizontalLayout)}>
              <ControlPanel/>
              Downloading human readable labels:
              <Progress style={{width: 256}} percent={loadingHumanReadable} status={loadingHumanReadable < 100 && "active"} />
              <span>Show labels: <Switch style={{width: 32}} onChange={dispatchProps.toggleHumanReadable} checked={showHumanReadable} /></span>
              <span>Select language: <Select onChange={changeLanguage} value={language}>{languageOptions}</Select></span>
              <Tabs style={{width: '100%'}}>
                <TabPane tab="Available" key="1">
                  <EntityListContainer>
                    <EntityList />
                  </EntityListContainer>
                </TabPane>
                <TabPane tab="Selected" key="2">
                  <Space direction="vertical">
                    <ColumnList />
                    <span>Maximum number of results (limit): <InputNumber value={limit} onChange={this.updateLimit} />Use limit: <Switch checked={limitEnabled} onChange={this.toggleLimit}/></span>
                    <EntityListContainer>
                      <EntityList onlySelected />
                    </EntityListContainer>
                  </Space>
                </TabPane>
              </Tabs>
              <YasguiContainer/>
            </div>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Simplified view for linked data ©2020 Created by Antonin Jares</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = appState => ({
  language: getLanguage(appState),
  loadingHumanReadable: getLoadingHumanReadable(appState),
  showHumanReadable: getShowHumanReadable(appState),
  limit: getLimit(appState),
  limitEnabled: getLimitEnabled(appState),
  lastSave: getLastSave(appState)
});

// TODO: @dispatch rewrite
const dispatchProps = {
  clearData: () => dispatch(ModelState.clearData),
  updateLimit: dispatchSet(SettingsState.limit),
  toggleLimit: dispatchSet(SettingsState.limitEnabled),
  toggleHumanReadable: dispatchSet(SettingsState.showHumanReadable)
};

export default connect(mapStateToProps, null)(App);
