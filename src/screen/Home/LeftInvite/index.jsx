import React, { Component } from 'react'
import { InputGroup, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import './index.less'

@connect(state => ({
    address: state.address,
    friend1: state.friend1,
    friend2: state.friend2,
    inviterCode: state.inviterCode
}))
class LeftInvite extends Component {
    render() {
        return (
            <div className="leftInvite">
                <div className="leftInvite-main">
                    <div>我的地址</div>
                    <InputGroup className="leftInvite-main-inp">
                        <Input disabled value={ this.props.address }/>
                    </InputGroup>
                    <ul className="leftInvite-main-list">
                        <li>
                            <div className="leftInvite-main-list-li-left">一级好友</div>
                            <div className="leftInvite-main-list-li-right gradient-color">{ this.props.friend1 }人</div>
                        </li>
                        <li>
                            <div className="leftInvite-main-list-li-left">二级好友</div>
                            <div className="leftInvite-main-list-li-right gradient-color">{ this.props.friend2 }人</div>
                        </li>
                    </ul>
                    <div className="leftInvite-main-code">
                        <p>邀请码</p>
                        <div className="gradient-color">{ this.props.inviterCode }</div>
                    </div>
                    <CopyToClipboard text={ this.props.inviterCode } onCopy={() => alert('复制成功')}>
                        <div className="gradient-bg leftBuy-btn">复制</div>
                    </CopyToClipboard>
                </div>
            </div>
        );
    }
}

export default LeftInvite