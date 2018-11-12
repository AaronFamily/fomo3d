import React , {Component} from 'react'
import { 
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    InputGroup, InputGroupAddon, InputGroupText, Input 
} from 'reactstrap';

import '../index.less'
import './index.less'

class Login extends Component {
    constructor (props) {
        super (props)
        this.state = {
            modal: props.modal,
            submitData : {
                nickname : '',
                pwd : ''
            }
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render (){
        const { nickname, pwd } = this.state
        return (
            <div className="login">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className} login-modal`}>
                    <ModalHeader toggle={this.toggle}>登录</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <Input value={nickname} placeholder="请输入用户名" />
                        </InputGroup>
                        <InputGroup>
                            <Input value={nickname} type="password" placeholder="请输入密码" />
                        </InputGroup>
                        <div className="login-opt">
                            <span onClick={()=>this.loginOptClick('忘记密码')} className="login-opt-forget">忘记密码</span>
                            <span className="login-opt-symbol">|</span>
                            <span onClick={()=>this.loginOptClick('注册新账号')} className="login-opt-register">注册新账号</span>
                        </div>
                    </ModalBody>
                    <div onClick={this.toggle} className="gradient-bg submit-btn">立即登陆</div>
                </Modal>
            </div>
        )
    }

    loginOptClick (type) {
        console.log(type)
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            modal: nextProps.modal
        })
    }
}

export default Login