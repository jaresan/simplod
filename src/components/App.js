import React, { Component } from 'react';
import Yasgui from './Yasgui';
import PropertyList from './PropertyList';
import ControlPanel from './ControlPanel';
import {connect} from 'react-redux';
import { parseSPO } from '../parseSPO';
import { AntVExample } from './AntVExample';
import possiblePrefixes from '../constants/possiblePrefixes';
import { invertObj, keys, map } from 'ramda';
import Actions from '../actions';

// TODO: Split css (use sass/modules?)
class App extends Component {
  state = {
    schemaData: null
  };
  componentWillMount() {
    const params = new URLSearchParams(window.location.search);

    this.schemaURL = params.get('schemaURL');
    this.endpointURL = params.get('endpointURL') || 'http://dbpedia.org/sparql';

    if (process.env.NODE_ENV === 'development') {
      this.endpointURL = "https://linked.opendata.cz/sparql";
      this.schemaURL = "https://sparql-proxy-api.jaresantonin.now.sh/hardExample";
    }
  }

  componentDidMount() {
    fetch(this.schemaURL)
      .then(res => res.text())
      .then(async ttl => {
        const json = await parseSPO(ttl);
        json.__prefixes__ = invertObj(json.__prefixes__);
        Object.assign(json.__prefixes__, possiblePrefixes);
        const {__prefixes__: prefixes} = json;
        const getPrefixed = id => {
          for (let key of keys(prefixes)) {
            if (id.includes(key)) {
              return `${prefixes[key]}:${id.replace(key, '')}`;
            }
          }
          return id;
        };

        const schemaData = keys(json.data).reduce((acc, key) => {
          const {methods, properties} = json.data[key];

          return Object.assign(acc, {
            [getPrefixed(key)]: {
              properties: map(map(getPrefixed), properties),
              methods: map(map(getPrefixed), methods)
            }
          })
        }, {});

        this.setState({
          schemaData
        });

        this.props.setPrefixes(json.__prefixes__);
      });
  }


  render() {
    return (
      <div className="App">
        <div className="application-container">
          {
            this.state.schemaData && <AntVExample
              width={window.innerWidth / 2}
              height={window.innerHeight / 2}
              data={this.state.schemaData}
            />
          }
          {/*<PropertyList/>*/}
          <div className="right-menu">
            <ControlPanel/>
            <Yasgui
              endpointURL={this.endpointURL}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setPrefixes: Actions.Yasgui.Creators.r_setPrefixes
};

export default connect(null, mapDispatchToProps)(App);
