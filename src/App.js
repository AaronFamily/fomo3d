import React, { Component } from 'react';
import './reset.less';
import requests from './utils/requests'

@requests()
class App extends Component {
  render() {
    return (
      <div className="App">
        dasdasd
      </div>
    );
  }

  componentDidMount () {
    console.log(this.props)
  }
}

export default App;
