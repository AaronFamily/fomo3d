import React from 'react'

import { firstPrize,secondPrize,thirdPrize } from '../../image/index'

import './index.less'

export default (props) => <div>
    <div className="trophy d-none d-md-block">
        <ul className="trophy">
            <li className="trophy-left">
                <img src={ secondPrize } alt="The second prize"/>
                <span className="trophy-secondPrize">{ props.rank[1] }</span>
            </li>
            <li>
                <img src={ firstPrize } alt="The first prize"/>
                <span>{ props.rank[0] }</span>
            </li>
            <li className="trophy-right">
                <img src={ thirdPrize } alt="The third prize"/>
                <span className="trophy-thirdPrize">{ props.rank[2] }</span>
            </li>
        </ul>
    </div>
    <div className="d-md-none">
        <ul className="md-trophy">
            <li>
                <img src={ secondPrize } alt="The second prize"/>
                <span className="trophy-secondPrize">{ props.rank[1] }</span>
            </li>
            <li>
                <img src={ firstPrize } alt="The first prize"/>
                <span>{ props.rank[0] }</span>
            </li>
            <li>
                <img src={ thirdPrize } alt="The third prize"/>
                <span className="trophy-thirdPrize">{ props.rank[2] }</span>
            </li>
        </ul>
    </div>
</div>