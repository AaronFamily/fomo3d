import React, { Component } from 'react'

import { doubt } from '../../image/index'
import './index.less'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checkNum: 0,
            tabList: props.list,
            tabTitle: props.list[0].tabTitle,
            ThisComponentsName: props.list[0].componentsName
        }

        this.tabBgColor = this.props.tabBgColor || '#2C4182'
        this.cBgColor = this.props.cBgColor || '#5C81F5'
    }

    async componentDidMount () {
        this._eachTabList()
    }

    _eachTabList () {
        return this.state.tabList.map((item,index)=>{
            return (
                <li key={item.name} 
                    onClick={() => this.clickTab(index,item.componentsName,item.tabTitle)} 
                    className={ this.state.checkNum === index ? 'Accordion_left_li_active' : '' }
                >
                    { item.name }
                </li>
            )
        })
    }
    clickTab (index,componentsName,tabTitle) {
        this.setState({
            checkNum: index,
            ThisComponentsName: componentsName,
            tabTitle: tabTitle
        })
    }

    render() {
        const { ThisComponentsName, tabTitle } = this.state

        return (
            <div className="Accordion">
                <ul className="Accordion_left" style={ { backgroundColor: this.tabBgColor } }>
                    { this._eachTabList() }
                </ul>
                <div className="Accordion_right" style={ { backgroundColor: this.cBgColor } }>
                    <img className="accordion-common-yiwen" src={ doubt } alt="doubt"/>
                    <div className="accordion-common-title">{ tabTitle }</div>
                    <ThisComponentsName user={ this.props.user }></ThisComponentsName>
                </div>
            </div>
        )
    }
}