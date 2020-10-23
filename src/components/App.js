import React, {Component} from 'react';
import YasguiContainer from './YasguiContainer';
import PropertyList from './PropertyList';
import ControlPanel from './ControlPanel';
import {connect} from 'react-redux';
import {parseTTL} from '../data/parseTTL';
import {AntVExample} from './AntVExample';
import {invertObj, keys, map, uniq} from 'ramda';
import {Handler} from './graph/handlers/Handler';
import Actions from '../actions';
import {Radio} from 'antd';
import {getContainerStyle, getMenuStyle} from './App.styled';
import './App.styles';

class App extends Component {
  state = {
    schemaData: null,
    horizontalLayout: false
  };

  constructor() {
    super();
    const params = new URLSearchParams(window.location.search);
    this.schemaURL = params.get('schemaURL');
    this.endpointURL = params.get('endpointURL') || 'http://dbpedia.org/sparql';

    this.courtExampleURL = 'https://sparql-proxy-api.jaresantonin.now.sh/spo-court.ttl';
    this.applicantsURL = 'https://sparql-proxy-api.jaresantonin.now.sh/spo-job-applicants.ttl';
    this.govURL = "https://sparql-proxy-api.jaresantonin.now.sh/data.gov.cz.ttl";
    if (process.env.NODE_ENV === 'development') {
      this.schemaURL = this.courtExampleURL;
      // this.schemaURL = this.applicantsURL;
      // this.schemaURL = this.govURL;
      // this.endpointURL = "https://data.gov.cz/sparql";
    }
  }

  componentDidMount() {
    this.fetchData(this.schemaURL);
  }

  // FIXME: Move fetch to sagas
  fetchData = url => {
    // FIXME: Move Handler clearing somewhere else (ideally to saga which pings graph which pings handler)
    Handler.clear();
    this.props.clearData();
    fetch(url)
      .then(res => res.text())
      .then(async ttl => {
        const json = await parseTTL(ttl);
        const schemaData = keys(json.data).reduce((acc, key) => {
          const {properties, methods} = map(uniq, json.data[key]);
          return Object.assign(acc, {
            [key]: {
              properties,
              methods
            }
          })
        }, {});

        this.setState({
          schemaData
        });

        this.props.setPrefixes(invertObj(json.__prefixes__));
      });
  };

  toggleLayout = ({target: {value: horizontalLayout}}) => this.setState({horizontalLayout})


  render() {
    const {horizontalLayout} = this.state;

    return (
      <div className="App">
        <input type="text" ref={e => this.dataSchemaInput = e} placeholder="Data schema URL"/>
        <button onClick={() => this.fetchData(this.dataSchemaInput.value)}>Reload schema URL</button>
        <button onClick={() => this.fetchData(this.courtExampleURL)}>Court example</button>
        <button onClick={() => this.fetchData(this.govURL)}>Gov example</button>
        <Radio.Group onChange={this.toggleLayout} value={this.state.horizontalLayout}>
          View:
          <Radio.Button value={true}>Horizontal</Radio.Button>
          <Radio.Button value={false}>Vertical</Radio.Button>
        </Radio.Group>
        <div style={getContainerStyle(horizontalLayout)}>
          {
            this.state.schemaData && <AntVExample
              width={window.innerWidth * (horizontalLayout ? 0.5 : 1)}
              height={window.innerHeight * (horizontalLayout ? 0.5 : 1)}
              data={this.state.schemaData}
            />
          }
          <PropertyList/>
          <div style={getMenuStyle(horizontalLayout)}>
            <ControlPanel/>
            <YasguiContainer
              endpointURL={this.endpointURL}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setPrefixes: Actions.Yasgui.Creators.r_setPrefixes,
  clearData: Actions.Model.Creators.r_clearData
};

export default connect(null, mapDispatchToProps)(App);
