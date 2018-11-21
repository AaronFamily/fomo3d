import React from 'react'
import { injectIntl } from 'react-intl'

import { firstPrize, secondPrize, thirdPrize } from '../../image/index'

import './index.less'

export default injectIntl((props) => {
    const text = props.intl.formatMessage({ id: 'winner' })
    const vacancy = props.intl.formatMessage({ id: 'vacancy' })
    const firstRank = props.intl.formatMessage({ id: 'firstRank' })
    const secondRank = props.intl.formatMessage({ id: 'secondRank' })

    return (<div>
        <div className="trophy d-none d-md-block">
            <ul className="trophy">
                <li className="trophy-left">
                    <img src={ secondRank } alt="The second prize"/>
                    <span className="trophy-secondPrize">{ `${text}: ${!!props.rank[1] ? props.rank[1] : vacancy}` }</span>
                </li>
                <li>
                    <img src={ firstRank } alt="The first prize"/>
                    <span>{ `${text}: ${!!props.rank[0] ? props.rank[0] : vacancy}` }</span>
                </li>
                <li className="trophy-right">
                    <img src={ secondRank } alt="The third prize"/>
                    <span className="trophy-thirdPrize">{ `${text}: ${!!props.rank[2] ? props.rank[2] : vacancy}` }</span>
                </li>
            </ul>
        </div>
        <div className="d-md-none">
            <ul className="md-trophy">
                <li>
                    <img src={ secondRank } alt="The second prize"/>
                    <span className="trophy-secondPrize">{ `${text}: ${!!props.rank[1] ? props.rank[1]: vacancy}` }</span>
                </li>
                <li>
                    <img src={ firstRank } alt="The first prize"/>
                    <span>{ `${text}: ${!!props.rank[0] ? props.rank[0] : vacancy}`  }</span>
                </li>
                <li>
                    <img src={ secondRank } alt="The third prize"/>
                    <span className="trophy-thirdPrize">{ `${text}: ${!!props.rank[2] ? props.rank[2] : vacancy}` }</span>
                </li>
            </ul>
        </div>
    </div>)
})