import React, { Component } from 'react';
import UMLExample from './UMLExample';
import Yasgui from './Yasgui';
import PropertyList from './PropertyList';
import './UMLExample.css';


// FIXME: Split css (use sass/modules?)
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="application-container">
          <UMLExample
            ttlURL={window.ttlURL}
          />
          <PropertyList/>
          <Yasgui
            endpointURL={window.endpointURL}
          />
        </div>
      </div>
    );
  }
}

export default App;
