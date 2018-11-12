import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import './reset.less'
import './common.less'

import { Head } from './screen/Common/index'
import { Home } from './screen/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="g-container">
          <Head></Head>
          <Home></Home>
        </div>
        <div className="g-footer">
          <p>©2018 JUST团队</p>
          <p>版权所有</p>
        </div>
      </div>
    )
  }
}

export default App
