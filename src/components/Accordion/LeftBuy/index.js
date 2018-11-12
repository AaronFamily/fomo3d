import React, { Component } from 'react'
import { 
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    InputGroup, InputGroupAddon, InputGroupText, Input  
} from 'reactstrap';

import { doubt } from '../../../image/index'
import './index.less'

class LeftBuy extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
    }

    componentDidMount () {
    }

    render() {
        return (
            <div className="leftBuy">
                <img className="accordion-common-yiwen" src={doubt} alt="doubt"/>
                <div className="accordion-common-title">购买欢乐币</div>
                <div className="leftBuy-tip">购买1ETH或更多，有3.1%的机会立即获得0.39ETH空头彩票!</div>
                <div className="leftBuy-main">
                    {/* <InputGroup className="leftInvite-main-inp">
                        <Input />
                        <InputGroupAddon addonType="prepend" style={{margin:'0 0 0 10px'}}>
                            <Button>绑定</Button>
                        </InputGroupAddon>
                    </InputGroup> */}
                </div>
                <div className="gradient-bg leftBuy-btn">发送ETH</div>
            </div>
        );
    }
}

export default LeftBuy