import React, {Component} from 'react';
import YasguiContainer from './YasguiContainer';
import ControlPanel from './ControlPanel';
import {connect} from 'react-redux';
import {parseTTL} from '@@data/parseTTL';
import {AntVExample} from './AntVExample';
import {invertObj, keys, set} from 'ramda';
import {Handler} from './graph/handlers/Handler';
import Actions from '@@actions';
import { Progress, Radio, Button, InputNumber, Space, Select, Switch, Layout, Menu, Avatar } from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {getContainerStyle, getMenuStyle} from './App.styled';
import { EntityList } from './entityList/EntityList';
import styled from '@emotion/styled';
import { Edge, Node, Property } from './graph/handlers';
import { Tabs } from 'antd';
import {ColumnList} from './ColumnList';
import { getLanguage, getLoadingHumanReadable, getLimit, getLimitEnabled, getAvatar, getLastSave } from '@@selectors';
import { languages } from '@@constants/languages';
import {limit, limitEnabled, showHumanReadable} from '@@app-state/model/state';
import * as YasguiState from '@@app-state/yasgui/state';
import {dispatchSet} from '@@app-state';
import hotkeys from 'hotkeys-js';
import { changeLanguage, loadData, saveData, dataChanged, onDataLoaded } from '@@sagas/interactions';

import 'antd/dist/antd.compact.css';


const {Option} = Select;
const {TabPane} = Tabs;
const {Header, Content, Footer} = Layout;

const EntityListContainer = styled.div`
  border: solid 1px black;
  overflow: auto;
  width: 512px;
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
    const params = new URLSearchParams(window.location.search);
    this.schemaURL = params.get('schemaURL');
    this.endpointURL = params.get('endpointURL') || 'http://dbpedia.org/sparql';

    this.courtExampleURL = 'https://sparql-proxy-api.jaresantonin.now.sh/spo-court.ttl';
    this.applicantsURL = 'https://sparql-proxy-api.jaresantonin.now.sh/spo-job-applicants.ttl';
    this.govURL = "https://sparql-proxy-api.jaresantonin.now.sh/data.gov.cz.ttl";
    this.beefURL = '/samples/http---linked.opendata.cz-sparql.ttl'
    this.endpointURL = 'http://linked.opendata.cz/sparql'
    this.beefURL = '/samples/http---data.open.ac.uk-query.ttl';
    this.endpointURL = 'http://data.open.ac.uk/query';
    this.beefURL = '/samples/http---nl.dbpedia.org-sparql.ttl';
    this.endpointURL = 'http://nl.dbpedia.org/sparql';
    if (process.env.NODE_ENV === 'development') {
      // this.schemaURL = this.courtExampleURL;
      this.schemaURL = this.applicantsURL;
      // this.schemaURL = this.govURL;
      // this.schemaURL = this.beefURL;
      this.endpointURL = "https://data.gov.cz/sparql";
    }
  }

  setup() {
    // TODO: Move setup logic to saga
    hotkeys('command+s,ctrl+s', e => {
      e.preventDefault()
      saveData();
    });
  }

  componentDidMount() {
    this.fetchData(this.schemaURL);
    dispatchSet(YasguiState.endpoint, this.endpointURL);
    this.setup();
  }

  // FIXME: Move fetch to sagas
  fetchData = url => {
    // FIXME: Move Handler clearing somewhere else (ideally to saga which pings graph which pings handler)
    Handler.clear();
    Property.clear();
    Node.clear();
    Edge.clear();
    this.props.clearData();
    fetch(url)
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
    this.props.updateLimit(limit);
    dataChanged();
  };

  toggleLimit = checked => {
    this.props.toggleLimit(checked);
    dataChanged();
  };


  render() {
    const {language, loadingHumanReadable, limitEnabled, limit, avatar, lastSave} = this.props;
    const {horizontalLayout} = this.state;

    return (
      <Layout>
        <Header style={{background: '#EEE', border: 'solid 1px black'}}>
          <Avatar size="large" src={avatar} icon={<UserOutlined />} />
        </Header>
        <Content style={{padding: '0 50px', background: 'white'}}>
          <Space>
            <input type="text" ref={e => this.dataSchemaInput = e} placeholder="Data schema URL"/>
            <Button onClick={() => this.fetchData(this.dataSchemaInput.value)}>Reload schema URL</Button>
            <Button onClick={() => this.fetchData(this.applicantsURL)}>Single</Button>
            <Button onClick={() => this.fetchData(this.courtExampleURL)}>Court example</Button>
            <Button onClick={() => this.fetchData(this.govURL)}>Gov example</Button>
            <Button onClick={saveData}>Save local</Button>
            <Button onClick={loadData}>Load local {new Date(lastSave).toLocaleString()}</Button>
          </Space>
          <br/>
          <Radio.Group onChange={this.toggleLayout} value={this.state.horizontalLayout}>
            View:
            <Radio.Button value={true}>Horizontal</Radio.Button>
            <Radio.Button value={false}>Vertical</Radio.Button>
          </Radio.Group>
          <br/>
          <div style={getContainerStyle(horizontalLayout)}>
            {
              this.state.loaded && <AntVExample
                width={window.innerWidth * (horizontalLayout ? 0.5 : 1)}
                height={window.innerHeight * (horizontalLayout ? 0.5 : 1)}
                data={this.schemaData}
              />
            }
            <div style={getMenuStyle(horizontalLayout)}>
              <ControlPanel/>
              Downloading human readable data:
              <Progress percent={loadingHumanReadable} status={loadingHumanReadable < 100 && "active"} />
              <span>Show labels: <Switch style={{width: 32}} onChange={this.props.toggleHumanReadable} /></span>
              <span>Select language: <Select onChange={changeLanguage} value={language}>{languageOptions}</Select></span>
              <Tabs>
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
  limit: getLimit(appState),
  limitEnabled: getLimitEnabled(appState),
  avatar: getAvatar(appState),
  lastSave: getLastSave(appState)
});

const mapDispatchToProps = {
  clearData: Actions.Model.Creators.r_clearData,
  updateLimit: dispatchSet(limit),
  toggleLimit: dispatchSet(limitEnabled),
  toggleHumanReadable: dispatchSet(showHumanReadable)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
