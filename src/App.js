import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './reset.less'

import { Home } from './screen/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home></Home>
      </div>
    );
  }
}

export default App;
