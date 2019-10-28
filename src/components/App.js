import React, { Component } from 'react';
import UMLExample from './UMLExample';
import Yasgui from './Yasgui';
import PropertyList from './PropertyList';
import './UMLExample.css';
import ControlPanel from './ControlPanel';


// TODO: Split css (use sass/modules?)
class App extends Component {
  componentWillMount() {
    const params = new URLSearchParams(window.location.search);

    this.schemaURL = params.get('schemaURL');
    this.endpointURL = params.get('endpointURL') || 'http://dbpedia.org/sparql';
  }


  render() {
    return (
      <div className="App">
        <div className="application-container">
          <UMLExample
            schemaURL={this.schemaURL}
          />
          <PropertyList/>
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

export default App;
