import React, { Component } from 'react'

import { doubt } from '../../../image/index'
import './index.less'

class RightStatistical extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
    }

    componentDidMount () {
    }

    render() {
        return (
            <div className="rightStatistical">
                {/* <img className="accordion-common-yiwen" src={doubt} alt="doubt"/>
                <div className="accordion-common-title">统计</div> */}
                <ul className="rightStatistical-list">
                    <li>
                        <div className="rightStatistical-list-li-left">总投资</div>
                        <div className="rightStatistical-list-li-right gradient-color">4.331</div>
                    </li>
                    <li>
                        <div className="rightStatistical-list-li-left">第一名奖励</div>
                        <div className="rightStatistical-list-li-right gradient-color">4.331</div>
                    </li>
                    <li>
                        <div className="rightStatistical-list-li-left">第二名奖励</div>
                        <div className="rightStatistical-list-li-right gradient-color">4.331</div>
                    </li>
                    <li>
                        <div className="rightStatistical-list-li-left">剩余时间</div>
                        <div className="rightStatistical-list-li-right gradient-color">0.05秒</div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default RightStatistical