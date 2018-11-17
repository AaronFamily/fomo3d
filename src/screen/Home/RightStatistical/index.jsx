import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.less'

@connect(state => ({
    zongtouzi: state.zongtouzi,
    diyiming: state.diyiming,
    dierming: state.dierming
}))
class RightStatistical extends Component {
    render() {
        return (
            <div className="rightStatistical">
                <ul className="rightStatistical-list">
                    <li>
                        <div className="rightStatistical-list-li-left">总投资</div>
                        <div className="rightStatistical-list-li-right gradient-color">{ this.props.zongtouzi }</div>
                    </li>
                    <li>
                        <div className="rightStatistical-list-li-left">第一名奖励</div>
                        <div className="rightStatistical-list-li-right gradient-color">{ this.props.diyiming }</div>
                    </li>
                    <li>
                        <div className="rightStatistical-list-li-left">第二名奖励</div>
                        <div className="rightStatistical-list-li-right gradient-color">{ this.props.dierming }</div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default RightStatistical