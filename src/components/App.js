import React, { Component } from 'react';
import UMLExample from './UMLExample';
import Yasgui from './Yasgui';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="application-container">
          <UMLExample/>
          <Yasgui/>
        </div>
      </div>
    );
  }
}

export default App;
