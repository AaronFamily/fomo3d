import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { FormattedMessage } from 'react-intl'

import './index.less'

@connect(state => ({
    username: state.username,
    recency: state.recency,
    isBox: state.language !== 'zh'
}))
class RightBuy extends Component {
    render() {
        return (
            <div className="rightBuy">
                <ul className="rightBuy-list rightBuy-list-big">
                    <li>
                        <div className="leftInvite-list-li-left"><FormattedMessage id="username"/></div>
                        <div className="leftInvite-list-li-right">{ this.props.username }</div>
                    </li>
                </ul>
                <ul className="rightBuy-list">
                    {
                        this.props.recency.map((item, index) =>  <li key={ item + index }>
                            <div className="leftInvite-list-li-left">{ item }</div>
                            <div className="leftInvite-list-li-right">0.007ETH</div>
                        </li>)
                    }
                </ul>
            </div>
        )
    }
}

export default RightBuy