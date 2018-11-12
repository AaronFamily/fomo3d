import React , {Component} from 'react'
import { 
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    InputGroup, InputGroupAddon, InputGroupText, Input  
} from 'reactstrap';

import '../index.less'
import './index.less'

class Register extends Component {
    constructor (props) {
        super (props)
        this.state = {
            modal: props.modal
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render (){
        return (
            <div className="register">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>注册</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <Input placeholder="请输入用户名" />
                        </InputGroup>
                        <InputGroup>
                            <Input type="password" placeholder="请输入密码" />
                        </InputGroup>
                        <InputGroup>
                            <Input type="password" placeholder="请输入邮箱" />
                        </InputGroup>
                        <InputGroup>
                            <Input />
                            <InputGroupAddon addonType="prepend">
                                <Button>获取验证码</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <Input type="password" placeholder="请输入邀请码" />
                        </InputGroup>
                        <div onClick={this.toggle} className="gradient-bg submit-btn">立即注册</div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            modal: nextProps.modal
        })
    }
}

export default Register