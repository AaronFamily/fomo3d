import React, { Component } from 'react'

import { doubt } from '../../image/index'
import './index.less'

export default class extends Component {
    static defaultProps = {
        tabList: [],
        tabTitle: '',
        ThisComponentsName: null,
        alert: {
            title: '',
            children: []
        },
        leftText: ''
    }
    
    constructor(props) {
        super(props)

        this.state = {
            checkNum: 0,
            tabList: props.list,
            tabTitle: props.list[0].tabTitle,
            ThisComponentsName: props.list[0].componentsName,
            isMask: false,
            alert: props.list[0].alert,
            leftText: props.list[0].leftText,
            
        }

        this.tabBgColor = this.props.tabBgColor || '#2C4182'
        this.cBgColor = this.props.cBgColor || '#5C81F5'
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            leftText: nextProps.list[0].leftText
        })
    }

    async componentDidMount () {
        this._eachTabList()
    }

    _eachTabList () {
        return this.state.tabList.map((item,index)=>{
            return (
                <li key={item.name} 
                    onClick={() => this.clickTab(index, item.componentsName, item.tabTitle, item.alert, item.leftText)} 
                    className={ this.state.checkNum === index ? 'Accordion_left_li_active' : '' }
                >
                    { item.name }
                </li>
            )
        })
    }
    
    clickTab (index, componentsName, tabTitle, alert, leftText) {
        this.setState({
            checkNum: index,
            ThisComponentsName: componentsName,
            tabTitle,
            alert,
            leftText
        })
    }

    closeMask () {
        this.setState({ isMask: false })
    }

    showMask () {
        this.setState({ isMask: true })
    }

    render() {
        const { ThisComponentsName, tabTitle, alert, checkNum, leftText } = this.state

        return (
            <div className="Accordion">
                <ul className="Accordion_left" style={ { backgroundColor: this.tabBgColor } }>
                    { this._eachTabList() }
                </ul>
                <div className="Accordion_right" style={ { backgroundColor: this.cBgColor } }>
                    <img className="accordion-common-yiwen" src={ doubt } onClick={ this.showMask.bind(this) } alt="doubt"/>
                    <div className="accordion-common-left-text">{ checkNum === 0 && leftText }</div>
                    <div className="accordion-common-title">{ tabTitle }</div>
                    <ThisComponentsName user={ this.props.user }></ThisComponentsName>
                </div>
                {
                    !!alert && this.state.isMask && <div className="accordion-mask">
                    <div className="accordion-mask-content d-none d-md-block">
                        <div className="accordion-mask-close" onClick={ this.closeMask.bind(this) }>X</div>
                        <div className="accordion-mask-main">
                            { alert.title && <h3>{ alert.title }</h3> }
                            { alert.children.map(item => <p key={item}>{ item }</p>) }
                        </div>
                    </div>
                    <div className="d-md-none accordion-md-mask-content">
                        <div className="accordion-mask-close" onClick={ this.closeMask.bind(this) }>X</div>
                            <div className="accordion-mask-main">
                                { alert.title && <h3>{ alert.title }</h3> }
                                { alert.children.map(item => <p key={item}>{ item }</p>) }
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}