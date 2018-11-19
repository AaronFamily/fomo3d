import React , {Component} from 'react'
import { 
    Modal,
    ModalHeader,
    ModalBody,
    InputGroup,
    Input 
} from 'reactstrap'
import { connect } from 'react-redux'

import { Toast } from '../../../../components/index'
import requests from '../../../../utils/requests'
import { setUserInfo, resetLoginStatus } from '../../../../store/action'

import '../index.less'
import './index.less'


@connect(null, dispatch => ({
    setUserInfo: data => dispatch(setUserInfo(data)),
    resetLoginStatus: bool => dispatch(resetLoginStatus(bool))
}))
@requests()
class Login extends Component {
    constructor (props) {
        super (props)
        this.state = {
            usernameRegular: /^[a-zA-Z0-9_-]{6,20}$/,
            passwordRegular: /^[a-zA-Z]\w{6,20}$/,
            tip:'',
            modal: props.modal,
            username : '',
            password : ''
        }
        this.toggle = this.toggle.bind(this)
        this.isOnClick = false
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render (){
        const { tip,username, password } = this.state
        return (
            <div className="login">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className} login-modal`}>
                    <ModalHeader toggle={this.toggle}>登录</ModalHeader>
                    <ModalBody>
                        <div className="login-tip">{tip}</div>
                        <InputGroup>
                            <Input value={ username } onChange={ e => this.changeState('username', e.target.value) } placeholder="请输入用户名" />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ password } onChange={ e => this.changeState('password', e.target.value) } type="password" placeholder="请输入密码" />
                        </InputGroup>
                        <div className="login-opt">
                            <span onClick={()=> this.loginOptClick('forget')} className="login-opt-forget">忘记密码</span>
                            <span className="login-opt-symbol">|</span>
                            <span onClick={()=> this.loginOptClick('register')} className="login-opt-register">注册新账号</span>
                        </div>
                    </ModalBody>
                    <div onClick={ this.validation.bind(this) } className="gradient-bg submit-btn">立即登陆</div>
                </Modal>
            </div>
        )
    }

    changeState (key, value) {
        this.setState({ [key]: value })
    }

    validation () {
        if (this.isOnClick) return

        const { usernameRegular, passwordRegular, username, password } = this.state

        try {
            if(!usernameRegular.test(username)){
                throw '用户名错误'
            }
            if(!passwordRegular.test(password)){
                throw '密码错误'
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
        const { username, password } = this.state

        this.isOnClick = true

        try {
            await this.props.post(`/auth/form?username=${ username }&password=${ password }`)
            Toast.success('登陆成功')
            const round = await this.props.get('/sessions/round')
            const result = await this.props.get('/users')
			this.props.setUserInfo({
				...result,
				...round,
				isLogin: true
            })
            this.setState({
                modal: false
            })
        } catch (error) {
            this.props.resetLoginStatus(false)
            Toast.error(error || '登陆失败')
        }

        this.isOnClick = false
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

export default Login