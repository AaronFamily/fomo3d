import React , {Component} from 'react'
import { 
    Button, Modal, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input  
} from 'reactstrap'

import requests from '../../../../utils/requests'

import '../index.less'
import './index.less'

@requests()
class Register extends Component {
    constructor (props) {
        super (props)
        this.state = {
            modal: props.modal,
            address: '',
            email: '',
            password: '',
            username: '',
            verifyCode: '',
            inviterCode: ''
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render (){
        const { address, email, password, username, verifyCode, inviterCode } = this.state

        return (
            <div className="register">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className} register`}>
                    <ModalHeader toggle={this.toggle}>注册</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <Input value={ address } onChange={ e => this.changeState('address', e.target.value) } placeholder="请输入钱包地址" />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ username } onChange={ e => this.changeState('username', e.target.value) } placeholder="请输入用户名" />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ password } onChange={ e => this.changeState('password', e.target.value) } type="password" placeholder="请输入密码" />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ email } onChange={ e => this.changeState('email', e.target.value) } placeholder="请输入邮箱" />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ verifyCode } onChange={ e => this.changeState('verifyCode', e.target.value) } placeholder="请输入验证码"/>
                            <InputGroupAddon addonType="prepend">
                                <Button onClick={ e => this.obtainCode(e) }>获取验证码</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <Input value={ inviterCode } onChange={ e => this.changeState('inviterCode', e.target.value) } placeholder="请输入邀请码" />
                        </InputGroup>
                        <div onClick={this.validation.bind(this)} className="gradient-bg submit-btn">立即注册</div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    changeState (key, value) {
        this.setState({ [key]: value })
    }

    async obtainCode () {
        try {
            const result = await this.props.post(`/auth/verify_code?email=${ this.state.email }`)

            alert('验证码已发送请注意查收')
            console.log(result)
        } catch (error) {
            alert('发送失败，请稍后再试')
            console.log(error)
        }
        
    }

    validation () {
        this.registered()
    }

    async registered () {
        const { address, email, password, username, verifyCode, inviterCode } = this.state

        try {
            const result = await this.props.post(`/users?verifyCode=${ verifyCode }&inviterCode=${ inviterCode }`, {
                address,
                email,
                password,
                username,
            })
            alert('注册成功')
            console.log(result)
        } catch (error) {
            alert('注册失败')
            console.log(error)
        }
        
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            modal: nextProps.modal
        })
    }
}

export default Register