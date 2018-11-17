import React, { Component } from 'react'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'

import store from './store/index'
import './reset.less'
import './common.less'

import { Head } from './screen/Common/index'
import { Home } from './screen/index'

window._store = store

export default class extends Component {
  render () {
    return (
      <Provider store={store}>
        <div className="app">
          	<Head />
          	<div className="g-container">
            	<Home />
          	</div>
			<div className="g-footer">
				<p>©2018 JUST团队</p>
				<p>版权所有</p>
			</div>
        </div>
      </Provider>
    )
  }
}
