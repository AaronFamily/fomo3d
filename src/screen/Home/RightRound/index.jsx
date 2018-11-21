import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import { eth, goldCoins } from '../../../image/index'
import './index.less'

@connect(state => ({
    jiangchi: state.jiangchi,
    huanlebi: state.huanlebi,
    isBox: state.language !== 'zh'
}))
class RightRound extends Component {
    render() {
        return (
            <div className="rightRound">
                <ul className="rightRound-ul">
                    <li className="rightRound-ul-li">
                        <div className="rightRound-ul-li-left">
                            <img src={eth} alt="eth"/>
                            <span><FormattedMessage id="jackpot"/>：</span>
                        </div>
                        <div className="rightRound-ul-li-right">
                            <div className="gradient-color">{ this.props.jiangchi }</div>
                        </div>
                    </li>
                    <li className="rightRound-ul-li">
                        <div className="rightRound-ul-li-left">
                            <img src={goldCoins} alt="goldCoins"/>
                            <span><FormattedMessage id="yourCoin"/>：</span>
                        </div>
                        <div className="rightRound-ul-li-right">
                            <div className="gradient-color">{ this.props.huanlebi }</div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default RightRound