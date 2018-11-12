import React, { Component } from 'react'
import { 
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    InputGroup, InputGroupAddon, InputGroupText, Input  
} from 'reactstrap';

import { doubt } from '../../../image/index'
import './index.less'

class LeftInvite extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
    }

    componentDidMount () {
    }

    render() {
        return (
            <div className="leftInvite">
                <img className="accordion-common-yiwen" src={doubt} alt="doubt"/>
                <div className="accordion-common-title">邀请</div>
                <div className="leftInvite-main">
                    <div>我的地址</div>
                    <InputGroup className="leftInvite-main-inp">
                        <Input />
                        <InputGroupAddon addonType="prepend" style={{margin:'0 0 0 10px'}}>
                            <Button>绑定</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <ul className="leftInvite-main-list">
                        <li>
                            <div className="leftInvite-main-list-li-left">一级好友</div>
                            <div className="leftInvite-main-list-li-right gradient-color">36人</div>
                        </li>
                        <li>
                            <div className="leftInvite-main-list-li-left">二级好友</div>
                            <div className="leftInvite-main-list-li-right gradient-color">24人</div>
                        </li>
                    </ul>
                    <div className="leftInvite-main-code">
                        <p>邀请码</p>
                        <div className="gradient-color">D852</div>
                    </div>
                    <div className="gradient-bg leftBuy-btn">复制</div>
                </div>
            </div>
        );
    }
}

export default LeftInvite