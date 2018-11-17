import React, { Component } from 'react'

import { qrCode } from '../../../image/index'

import './index.less'

class LeftBuy extends Component {

    render() {
        return (
            <div className="leftBuy">
                <div className="leftBuy-tip">购买1ETH或更多，有3.1%的机会立即获得0.39ETH空头彩票!</div>
                <img className="leftBuy-img" src={ qrCode } alt="二维码钱包二维码"/>
                <div className="leftBuy-address">地址: 0xf7a56d419bc2b4679e5e50694b44e7842410303a</div>
            </div>
        )
    }
}

export default LeftBuy