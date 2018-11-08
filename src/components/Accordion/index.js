import React, { Component } from 'react'
import requests from '../../utils/requests'

import './index.less'

class Accordion extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            checkNum : 0,
            tabList : [
                {name:'采购'},
                {name:'拱顶'},
                {name:'注册和邀请'},
            ]
        };
    }

    componentDidMount () {
        this._eachTabList()
    }

    _eachTabList () {
        var that = this
        return this.state.tabList.map((item,index)=>{
            // console.log(that.state.checkNum)
            console.log(index)
            return (
                // that.state.checkNum == index ? 
                // <li key={item.name} onClick={index=>that.clickTab(index)} className="Accordion_left_li_active">{item.name}</li> : 
                // <li key={item.name} onClick={index=>that.clickTab(index)}>{item.name}</li>

                <li key={item.name} onClick={e =>that.clickTab(e, index)} className={ that.state.checkNum == index ? 'Accordion_left_li_active' : '' }>{item.name}</li>
            )
        })
    }
    clickTab (index) {
        console.log(index)
        this.setState({
            checkNum : index
        })
    }

    render() {
        return (
            <div className="Accordion">
                <ul className="Accordion_left">
                    {this._eachTabList()}
                    {/* <li className="Accordion_left_li_active">采购</li>
                    <li>拱顶</li>
                    <li>注册和邀请</li> */}
                </ul>
                <div className="Accordion_right"></div>
            </div>
        );
    }
}

export default Accordion