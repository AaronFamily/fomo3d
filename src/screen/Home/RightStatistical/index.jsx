import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import './index.less'

@connect(state => ({
    zongtouzi: state.zongtouzi,
    diyiming: state.diyiming,
    dierming: state.dierming,
    isBox: state.language !== 'zh'
}))
class RightStatistical extends Component {
    render() {
        const { zongtouzi, diyiming, dierming, isBox } = this.props
        return (
            <div className="rightStatistical">
                <ul className="rightStatistical-list">
                    <li>
                        <div className="rightStatistical-list-li-left"><FormattedMessage id="totalInvestment"/></div>
                        <div className="rightStatistical-list-li-right gradient-color">{ zongtouzi }</div>
                    </li>
                    <li>
                        <div className="rightStatistical-list-li-left"><FormattedMessage id="firstPrize"/></div>
                        <div className="rightStatistical-list-li-right gradient-color">{ diyiming }</div>
                    </li>
                    <li>
                        <div className="rightStatistical-list-li-left"><FormattedMessage id="secondPrize"/></div>
                        <div className="rightStatistical-list-li-right gradient-color">{ dierming }</div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default RightStatistical