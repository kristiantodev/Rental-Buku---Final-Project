import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import {Body} from "./template/admin"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <Router>
        <Body/>
      </Router>
    );
  }
}

export default App;