import React , {Component} from 'react'
import { 
    Modal, ModalHeader, ModalBody, Button,
    InputGroup, Input ,InputGroupAddon
} from 'reactstrap';

import { Toast } from '../../../../components/index'

import requests from '../../../../utils/requests'

import '../index.less'
import './index.less'

@requests()
class ForgetPwd extends Component {
    constructor (props) {
        super (props)
        this.state = {
            usernameRegular : /^[a-zA-Z0-9_-]{6,20}$/,
            verifyCodeRegular : /^\d{6}$/,
            passwordRegular:/^.*(?=.{6,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
            tip:'',
            modal: props.modal,
            username:'',
            verifyCode : '',
            password : '',
            passwordAgain : '',
            verifyTime:0
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render (){
        const { tip,username,verifyCode, password,verifyTime,passwordAgain } = this.state
        return (
            <div className="login">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className} login-modal`}>
                    <ModalHeader toggle={this.toggle}>忘记密码</ModalHeader>
                    <ModalBody>
                        <div className="login-tip">{tip}</div>
                        <InputGroup>
                            <Input value={ username } onChange={ e => this.changeState('username', e.target.value) } type="text" placeholder="请输入用户名" />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ verifyCode } onChange={ e => this.changeState('verifyCode', e.target.value) } placeholder="请输入验证码"/>
                            <InputGroupAddon addonType="prepend" style={{width:'110px'}}>
                                {
                                    verifyTime>0 ?
                                    <div className="verifyTime">{verifyTime}s</div> :
                                    <Button onClick={ e => this.obtainCode(e) }>获取验证码</Button>
                                }
                            </InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <Input value={ password } onChange={ e => this.changeState('password', e.target.value) } type="password" placeholder="请输入新密码" />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ passwordAgain } onChange={ e => this.changeState('passwordAgain', e.target.value) } type="password" placeholder="请确认新密码" />
                        </InputGroup>
                    </ModalBody>
                    <div onClick={ this.validation.bind(this) } className="gradient-bg submit-btn">确认修改</div>
                </Modal>
            </div>
        )
    }

    async obtainCode () {
        const {usernameRegular,username} = this.state
        try {
            if(!usernameRegular.test(username)){
                throw '用户名格式为：6到20位字符'
            }
        } catch (error) {
            this.setState({
                tip : error
            })
            return false
            this.setState({
                tip : ''
            })
        }
        
        try {
            
            await this.props.post(`/auth/verify_code?username=${ username }`)
            let seconds = 60
            
            this.timeOut = setInterval( () => {
                if(seconds <= 0){
                    clearTimeout(this.timeOut)
                }
                seconds--
                this.setState({ verifyTime : seconds })
            }, 1000)

            Toast.success('验证码已发送请注意查收')
        } catch (error) {
            Toast.error('发送失败，请稍后再试')
            console.log(error)
        }
    }

    changeState (key, value) {
        this.setState({ [key]: value })
    }

    validation () {
        const { usernameRegular,passwordRegular,username,password,passwordAgain } = this.state
        try {
            if(!usernameRegular.test(username)){
                throw '用户名格式为：6到20位字符'
            }
            if(!passwordRegular.test(password)){
                throw '密码格式为：6到20位（至少1个大写字母，1个小写字母，1个数字，1个特殊字符）'
            }
            if(password !== passwordAgain){
                throw '两次输入不一致'
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
        const { username,verifyCode, password } = this.state

        try {
            const result = await this.props.post(`/users/password?username=${ username }&password=${ password }&verifyCode=${ verifyCode }`)
            
            Toast.success('密码修改成功')
            console.log(result)
        } catch (error) {
            Toast.error('密码修改失败')
            console.log(error)
        }
        
    }

    loginOptClick (type) {
        if (type === 'forget') {
            this.props.goForget && this.props.goForget()
        } else {
            this.props.goRegister && this.props.goRegister()
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            modal: nextProps.modal
        })
    }
}

export default ForgetPwd