import React , {Component} from 'react'
import { 
    Button, Modal, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input ,
} from 'reactstrap'

import { Toast } from '../../../../components/index'

import requests from '../../../../utils/requests'

import '../index.less'
import './index.less'

@requests()
class Register extends Component {
    constructor (props) {
        super (props)
        this.state = {
            addressRegular : '',
            usernameRegular : /^[a-zA-Z0-9_-]{6,20}$/,
            passwordRegular : /^[a-zA-Z]\w{6,20}$/,
            emailRegularRegular : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            verifyCodeRegular : /^\d{6}$/,
            inviterCodeRegular : /^D[0-9]{6}/,
            tip:'',
            modal: props.modal,
            address: '',
            email: '',
            password: '',
            username: '',
            verifyCode: '',
            inviterCode: '',
            verifyTime : 0,
        }

        this.toggle = this.toggle.bind(this)
        this.isFireCode = false
        this.isRegister = false
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render (){
        const { tip,address, email, password, username, verifyCode, inviterCode } = this.state

        return (
            <div className="register">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className} register`}>
                    <ModalHeader toggle={this.toggle}>注册</ModalHeader>
                    <ModalBody>
                        <div className="login-tip">{tip}</div>
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
                            <InputGroupAddon addonType="prepend" style={{width:'110px'}}>
                                {
                                    this.state.verifyTime>0 ?
                                    <div className="verifyTime">{this.state.verifyTime}s</div> :
                                    <Button onClick={ e => this.obtainCode(e) }>获取验证码</Button>
                                }
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
        if (this.isFireCode) return

        const { emailRegularRegular, email } = this.state

        try {
            if(!emailRegularRegular.test(email)){
                throw '请输入正确格式的邮箱'
            }
        } catch (error) {
            this.setState({
                tip : error
            })
            return false
        }
        try {
            
            this.isFireCode = true

            await this.props.post(`/auth/verify_code?email=${ email }`)
            let seconds = 60
            
            this.timeOut = setInterval( () => {
                if(seconds <= 0){
                    clearTimeout(this.timeOut)
                    this.isFireCode = false
                }
                seconds--
                this.setState({ verifyTime : seconds })
            }, 1000)
            Toast.success('验证码已发送请注意查收')
        } catch (error) {
            Toast.error(error || '发送失败，请稍后再试')
            this.isFireCode = false
        }
    }

    validation () {
        if (this.isRegister) return

        const { 
            usernameRegular,
            passwordRegular,
            emailRegularRegular,
            verifyCodeRegular,
            inviterCodeRegular,
            address,
            email,
            password,
            username,
            verifyCode,
            inviterCode
        } = this.state

        try {
            if(!/^(0x)?[0-9a-f]{40}$/i.test(address)){
                throw '请输入正确有效的钱包地址'
            }
            if(!usernameRegular.test(username)){
                throw '用户名格式为：6到20位字符'
            }
            if(!passwordRegular.test(password)){
                throw '密码格式为：以字母开头，长度在6~20 之间，只能包含字符、数字和下划线'
            }
            if(!emailRegularRegular.test(email)){
                throw '请输入正确格式的邮箱'
            }
            if(!verifyCodeRegular.test(verifyCode)){
                throw '请输入正确格式验证码'
            }
            if(inviterCode && !inviterCodeRegular.test(inviterCode)){
                throw '请输入正确有效的邀请码'
            }
        } catch (error) {
            this.setState({
                tip : error
            })
            return false
        }
        this.setState({
            tip : ''
        },()=>this.registered())
    }

    async registered () {
        const { address, email, password, username, verifyCode, inviterCode } = this.state
        this.isRegister = true

        try {
            await this.props.post(`/users?verifyCode=${ verifyCode }&inviterCode=${ inviterCode }`, {
                address,
                email,
                password,
                username,
            })
            Toast.success('注册成功', 2000, () => {
                this.props.goLogin && this.props.goLogin()
            })
            this.isRegister = false
        } catch (error) {
            Toast.error(error || '注册失败')
            this.isRegister = false
        }
        
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            modal: nextProps.modal
        })
    }
}

export default Register