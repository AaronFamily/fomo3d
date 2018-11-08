import React, { Component } from 'react'
import { NavItem, NavLink } from 'reactstrap'

import { Header } from './components/index'
import {
	funnel,
	key,
	active,
	associated,
} from './image/index'

import 'bootstrap/dist/css/bootstrap.css'
import './reset.less'

import { Home } from './screen/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="g-container">
          <Header title="Fomo3D">
            <NavItem>
              <NavLink href="" className="text-white">
                {/* <span className="iconfont icon-zbds_shalou" /> */}
                <img className="g-header-icon" src={ funnel } alt="funnel"/>
                <span>47:32:42</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="" className="text-white">
                {/* <span className="iconfont icon-zbds_shalou" /> */}
                <img className="g-header-icon" src={ key } alt="key"/>
                <span>0</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="" className="text-white">
                {/* <span className="iconfont icon-zhexiantu" /> */}
                <img className="g-header-icon" src={ active } alt="active"/>
                <span>3.1%（0.39EHT）</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="" className="text-white">
                {/* <span className="iconfont icon-zhexiantu" /> */}
                <img className="g-header-icon" src={ associated } alt="associated"/>
                <span>注册名称</span>
              </NavLink>
            </NavItem>
          </Header>
          <Home></Home>
        </div>
        <div className="g-footer">footer</div>
      </div>
    )
  }
}

export default App
