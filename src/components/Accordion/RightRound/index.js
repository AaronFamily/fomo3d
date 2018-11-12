import React, { Component } from 'react'

import { Countdown } from '../../index'

import { doubt,eth,goldCoins,purse } from '../../../image/index'
import './index.less'

class RightRound extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
    }

    componentDidMount () {
    }

    render() {
        return (
            <div className="rightRound">
                {/* <img className="accordion-common-yiwen" src={doubt} alt="doubt"/>
                <div className="accordion-common-title">购买截止</div> */}
                <Countdown endTime={ 1541692470968+10000000*60*1000 } fontSize='16px' />
                <ul className="rightRound-ul">
                    <li className="rightRound-ul-li">
                        <div className="rightRound-ul-li-left">
                            <img src={eth} alt="eth"/>
                            <span>奖池：</span>
                        </div>
                        <div className="rightRound-ul-li-right">
                            <div className="gradient-color">13.98</div>
                            <span>向上箭头-2,925.89906美元</span>
                        </div>
                    </li>
                    <li className="rightRound-ul-li">
                        <div className="rightRound-ul-li-left">
                            <img src={goldCoins} alt="goldCoins"/>
                            <span>你的欢乐币：</span>
                        </div>
                        <div className="rightRound-ul-li-right">
                            <div className="gradient-color">0.0000</div>
                            <span>共196.841把钥匙</span>
                        </div>
                    </li>
                    <li className="rightRound-ul-li">
                        <div className="rightRound-ul-li-left">
                            <img src={purse} alt="purse"/>
                            <span>你的收入：</span>
                        </div>
                        <div className="rightRound-ul-li-right">
                            <div className="gradient-color">0.0000</div>
                            <span>向上箭头-USD</span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default RightRound