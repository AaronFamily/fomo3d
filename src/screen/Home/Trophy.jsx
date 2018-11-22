import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

import './index.less'

@injectIntl
@connect(state => ({
    lang: state.language
}))
class Trophy extends Component {
    constructor () {
        super()

        this.state = {
            isLoad: false
        }
    }

    _intl (id) {
        return this.props.intl.formatMessage({ id })
    }

    load () {
        this.setState({
            isLoad: true
        })
    }

    render () {
        const rank = this.props.rank
        const isLoad = this.state.isLoad

        return (
            <div>
                <div className="trophy d-none d-md-block">
                    <ul className="trophy">
                        <li className="trophy-left">
                            <img src={ this._intl('secondRank') } alt="The second prize"/>
                            { isLoad && <span className="trophy-secondPrize">{ `${this._intl('winner')}: ${!!rank[1] ? rank[1] : this._intl('vacancy')}` }</span> }
                        </li>
                        <li>
                            <img onAbort={ this.load.bind(this) } onError={ this.load.bind(this) } onLoad={ this.load.bind(this) } src={ this._intl('firstRank') } alt="The first prize"/>
                            { isLoad && <span>{ `${this._intl('winner')}: ${!!rank[0] ? rank[0] : this._intl('vacancy')}` }</span> }
                        </li>
                        <li className="trophy-right">
                            <img src={ this._intl('secondRank') } alt="The third prize"/>
                            { isLoad && <span className="trophy-thirdPrize">{ `${this._intl('winner')}: ${!!rank[2] ? rank[2] : this._intl('vacancy')}` }</span> }
                        </li>
                    </ul>
                </div>
                <div className="d-md-none">
                    <ul className="md-trophy">
                        <li>
                            <img src={ this._intl('secondRank') } alt="The second prize"/>
                            { isLoad && <span className="trophy-secondPrize">{ `${this._intl('winner')}: ${!!rank[1] ? rank[1]: this._intl('vacancy')}` }</span> }
                        </li>
                        <li>
                            <img onAbort={ this.load.bind(this) } onError={ this.load.bind(this) } onLoad={ this.load.bind(this) } src={ this._intl('firstRank') } alt="The first prize"/>
                            { isLoad && <span>{ `${this._intl('winner')}: ${!!rank[0] ? rank[0] : this._intl('vacancy')}`  }</span> }
                        </li>
                        <li>
                            <img src={ this._intl('secondRank') } alt="The third prize"/>
                            { isLoad && <span className="trophy-thirdPrize">{ `${this._intl('winner')}: ${!!rank[2] ? rank[2] : this._intl('vacancy')}` }</span> }
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Trophy