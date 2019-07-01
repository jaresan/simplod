import React, { Component } from 'react';
import UMLExample from './UMLExample';
import Yasgui from './Yasgui';
import PropertyList from './PropertyList';
import './UMLExample.css';
import ControlPanel from './ControlPanel';

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
          <div className="right-menu">
            <ControlPanel/>
            <Yasgui
              endpointURL={window.endpointURL}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
