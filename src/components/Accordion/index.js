import React, { Component } from 'react'
import requests from '../../utils/requests'

// import LeftBuy from './LeftBuy/index'
// import LeftInvite from './LeftInvite/index'
// import RightBuy from './RightBuy/index'
// import RightRound from './RightRound/index'
// import RightStatistical from './RightStatistical/index'

import './index.less'

class Accordion extends Component {
    constructor(props) {
        super(props);
    
        this.state = { 
            checkNum : 0,
            tabList : props.list,
            ThisComponentsName : props.list[0].componentsName
        };
    }

    componentDidMount () {
        this._eachTabList()
    }

    _eachTabList () {
        var that = this
        return this.state.tabList.map((item,index)=>{
            return (
                <li key={item.name} 
                    onClick={() =>that.clickTab(index,item.componentsName)} 
                    className={ that.state.checkNum == index ? 'Accordion_left_li_active' : '' }>{item.name}
                </li>
            )
        })
    }
    clickTab (index,componentsName) {
        this.setState({
            checkNum : index,
            ThisComponentsName : componentsName
        })
    }

    render() {
        const { ThisComponentsName } = this.state
        return (
            <div className="Accordion">
                <ul className="Accordion_left">
                    {this._eachTabList()}
                </ul>
                <div className="Accordion_right">
                    <ThisComponentsName></ThisComponentsName>
                </div>
            </div>
        );
    }
}

export default Accordion