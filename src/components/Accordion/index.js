import React, { Component } from 'react'
import requests from '../../utils/requests'

// import LeftBuy from './LeftBuy/index'
// import LeftInvite from './LeftInvite/index'
// import RightBuy from './RightBuy/index'
// import RightRound from './RightRound/index'
// import RightStatistical from './RightStatistical/index'

import { doubt,goldCoins } from '../../image/index'
import './index.less'

class Accordion extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = { 
            checkNum : 0,
            tabList : props.list,
            tabTitle : props.list[0].tabTitle,
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
                    onClick={() =>that.clickTab(index,item.componentsName,item.tabTitle)} 
                    className={ that.state.checkNum == index ? 'Accordion_left_li_active' : '' }>{item.name}
                </li>
            )
        })
    }
    clickTab (index,componentsName,tabTitle) {
        this.setState({
            checkNum : index,
            ThisComponentsName : componentsName,
            tabTitle : tabTitle
        })
    }

    render() {
        const { ThisComponentsName,tabTitle } = this.state
        return (
            <div className="Accordion">
                <ul className="Accordion_left">
                    {this._eachTabList()}
                </ul>
                <div className="Accordion_right">
                    <img className="accordion-common-yiwen" src={doubt} alt="doubt"/>
                    <div className="accordion-common-title">{tabTitle}</div>
                    <ThisComponentsName></ThisComponentsName>
                </div>
            </div>
        );
    }
}

export default Accordion