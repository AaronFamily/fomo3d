import React, { Component } from 'react'
import { 
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    InputGroup, InputGroupAddon, InputGroupText, Input  
} from 'reactstrap';

import { doubt,goldCoins } from '../../../image/index'
import './index.less'

class LeftBuy extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            num : '',
            dealNum : ''
        };
    }

    componentDidMount () {
    }

    render() {
        const {num,dealNum} = this.state
        return (
            <div className="leftBuy">
                {/* <img className="accordion-common-yiwen" src={doubt} alt="doubt"/>
                <div className="accordion-common-title">购买欢乐币</div> */}
                <div className="leftBuy-tip">购买1ETH或更多，有3.1%的机会立即获得0.39ETH空头彩票!</div>
                <InputGroup className="leftBuy-main-top">
                    <InputGroupAddon addonType="prepend">
                        <img src={goldCoins} />
                    </InputGroupAddon>
                    <Input value={num} onChange={ e => this.setState({ num: e.target.value })  } />
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>{num*10}</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
                <InputGroup className="leftBuy-main-bot">
                    <Input />
                </InputGroup>
                <div className="gradient-bg leftBuy-btn">发送ETH</div>
            </div>
        );
    }
}

export default LeftBuy