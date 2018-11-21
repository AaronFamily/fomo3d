import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import { qrCode } from '../../../image/index'

import './index.less'

@connect(state => ({
    isBox: state.language !== 'zh'
}))
class LeftBuy extends Component {

    render() {
        return (
            <div className="leftBuy">
                <div className="leftBuy-tip"><FormattedMessage id="specification"/></div>
                <img className="leftBuy-img" src={ qrCode } alt="code"/>
                <div className="leftBuy-address">ETH<FormattedMessage id="address" />: 0x6a51264BaF56a411558f2A8F4f40bE5f533AC5cA</div>
            </div>
        )
    }
}

export default LeftBuy