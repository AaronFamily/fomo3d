import React, { Component } from 'react'
import { InputGroup, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FormattedMessage, injectIntl } from 'react-intl'

import { Toast } from '../../../components/index'

import './index.less'

@injectIntl
@connect(state => ({
    address: state.address,
    friend1: state.friend1,
    friend2: state.friend2,
    inviterCode: state.inviterCode,
    isBox: state.language !== 'zh'
}))
class LeftInvite extends Component {
    render() {
        return (
            <div className="leftInvite">
                <div className="leftInvite-main">
                    <div><FormattedMessage id="myAddress"/></div>
                    <InputGroup className="leftInvite-main-inp">
                        <Input disabled value={ this.props.address }/>
                    </InputGroup>
                    <ul className="leftInvite-main-list">
                        <li>
                            <div className="leftInvite-main-list-li-left"><FormattedMessage id="afriend"/></div>
                            <div className="leftInvite-main-list-li-right gradient-color">{ this.props.friend1 } <FormattedMessage id="people"/></div>
                        </li>
                        <li>
                            <div className="leftInvite-main-list-li-left"><FormattedMessage id="bfriend"/></div>
                            <div className="leftInvite-main-list-li-right gradient-color">{ this.props.friend2 } <FormattedMessage id="people"/></div>
                        </li>
                    </ul>
                    <div className="leftInvite-main-code">
                        <p><FormattedMessage id="inviteCode"/></p>
                        <div className="gradient-color">{ this.props.inviterCode }</div>
                    </div>
                    <CopyToClipboard text={ this.props.inviterCode } onCopy={() => Toast.success(this.props.intl.formatMessage({ id: 'copySuccess' }))}>
                        <div className="gradient-bg leftBuy-btn"><FormattedMessage id="copy"/></div>
                    </CopyToClipboard>
                </div>
            </div>
        );
    }
}

export default LeftInvite