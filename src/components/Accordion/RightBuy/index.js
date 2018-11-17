import React, { Component } from 'react'

import { doubt } from '../../../image/index'
import './index.less'

class RightBuy extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
    }

    componentDidMount () {
    }

    render() {
        return (
            <div className="rightBuy">
                {/* <img className="accordion-common-yiwen" src={doubt} alt="doubt"/>
                <div className="accordion-common-title">最近购买</div> */}
                <ul className="rightBuy-list rightBuy-list-big">
                    <li>
                        <div className="leftInvite-list-li-left">用户名</div>
                        <div className="leftInvite-list-li-right">花费</div>
                    </li>
                </ul>
                <ul className="rightBuy-list">
                    <li>
                        <div className="leftInvite-list-li-left">投影墨水</div>
                        <div className="leftInvite-list-li-right">0.007ETH</div>
                    </li>
                    <li>
                        <div className="leftInvite-list-li-left">防霉模具</div>
                        <div className="leftInvite-list-li-right">0.007ETH</div>
                    </li>
                    <li>
                        <div className="leftInvite-list-li-left">哈吉激光</div>
                        <div className="leftInvite-list-li-right">0.007ETH</div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default RightBuy