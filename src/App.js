import React, { Component } from 'react';
import Extension from "./components/extension/Extension"

class App extends Component {
  render() {
    return (
      <div className="container center">
        <Extension/>
      </div>
    );
  }
}

export default App;