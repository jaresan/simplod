import React, {Component} from 'react';
import YasguiContainer from './YasguiContainer';
import PropertyList from './entityList/PropertyList';
import ControlPanel from './ControlPanel';
import {connect} from 'react-redux';
import {parseTTL} from '../data/parseTTL';
import {AntVExample} from './AntVExample';
import {invertObj, keys} from 'ramda';
import {Handler} from './graph/handlers/Handler';
import Actions from '../actions';
import {Radio, Button} from 'antd';
import {getContainerStyle, getMenuStyle} from './App.styled';
import './App.styles';
import { EntityList } from './entityList/EntityList';
import styled from '@emotion/styled';
import { Edge, Node, Property } from './graph/handlers';

const EntityListContainer = styled.div`
  border: solid 1px black;
  overflow: auto;
  width: 512px;
  height: 512px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
      this.schemaURL = this.courtExampleURL;
      this.schemaURL = this.applicantsURL;
      this.schemaURL = this.govURL;
      // this.schemaURL = this.beefURL;
      this.endpointURL = "https://data.gov.cz/sparql";
    }
  }

  componentDidMount() {
    this.fetchData(this.schemaURL);
    this.props.setEndpoint(this.endpointURL);
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
        this.schemaData = keys(json.data).reduce((acc, key) => {
          const {properties, methods} = json.data[key];
          return Object.assign(acc, {
            [key]: {
              properties,
              methods
            }
          })
        }, {});

        this.setState({loaded: true});
        this.props.setPrefixes(invertObj(json.__prefixes__));
        this.props.onDataLoaded();
      });
  };

  toggleLayout = ({target: {value: horizontalLayout}}) => this.setState({horizontalLayout})


  render() {
    const {horizontalLayout} = this.state;

    return (
      <div className="App">
        <input type="text" ref={e => this.dataSchemaInput = e} placeholder="Data schema URL"/>
        <Button onClick={() => this.fetchData(this.dataSchemaInput.value)}>Reload schema URL</Button>
        <Button onClick={() => this.fetchData(this.applicantsURL)}>Single</Button>
        <Button onClick={() => this.fetchData(this.courtExampleURL)}>Court example</Button>
        <Button onClick={() => this.fetchData(this.govURL)}>Gov example</Button>
        <br/>
        <Radio.Group onChange={this.toggleLayout} value={this.state.horizontalLayout}>
          View:
          <Radio.Button value={true}>Horizontal</Radio.Button>
          <Radio.Button value={false}>Vertical</Radio.Button>
        </Radio.Group>
        <div style={getContainerStyle(horizontalLayout)}>
          {
            this.state.loaded && <AntVExample
              width={window.innerWidth * (horizontalLayout ? 0.5 : 1)}
              height={window.innerHeight * (horizontalLayout ? 0.5 : 1)}
              data={this.schemaData}
            />
          }
          {/*<PropertyList/>*/}
          <div style={getMenuStyle(horizontalLayout)}>
            <EntityListContainer>
              <EntityList />
            </EntityListContainer>
            <ControlPanel/>
            <YasguiContainer/>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setPrefixes: Actions.Yasgui.Creators.r_setPrefixes,
  clearData: Actions.Model.Creators.r_clearData,
  setEndpoint: Actions.Yasgui.Creators.r_setEndpoint,
  onDataLoaded: Actions.Model.Creators.r_dataLoaded
};

export default connect(null, mapDispatchToProps)(App);
