import React, { Component } from 'react'
import { connect } from 'react-redux'

import { eth, goldCoins } from '../../../image/index'
import './index.less'

@connect(state => ({
    jiangchi: state.jiangchi,
    huanlebi: state.huanlebi
}))
class RightRound extends Component {
    render() {
        return (
            <div className="rightRound">
                <ul className="rightRound-ul">
                    <li className="rightRound-ul-li">
                        <div className="rightRound-ul-li-left">
                            <img src={eth} alt="eth"/>
                            <span>奖池：</span>
                        </div>
                        <div className="rightRound-ul-li-right">
                            <div className="gradient-color">{ this.props.jiangchi }</div>
                        </div>
                    </li>
                    <li className="rightRound-ul-li">
                        <div className="rightRound-ul-li-left">
                            <img src={goldCoins} alt="goldCoins"/>
                            <span>你的欢乐币：</span>
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