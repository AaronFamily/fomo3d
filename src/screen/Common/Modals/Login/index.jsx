import React , {Component} from 'react'
import { 
    Modal,
    ModalHeader,
    ModalBody,
    InputGroup,
    Input 
} from 'reactstrap'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'

import { Toast } from '../../../../components/index'
import requests from '../../../../utils/requests'
import { setUserInfo, resetLoginStatus } from '../../../../store/action'

import '../index.less'
import './index.less'

@injectIntl
@connect(state => ({
    lang: state.language
}), dispatch => ({
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
            modal: false
        }, () => {
            this.props.close && this.props.close()
        })
    }

    _intl (id) {
        return this.props.intl.formatMessage({ id })
    }

    render (){
        const { tip,username, password } = this.state
        return (
            <div className="login">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className} login-modal`}>
                    <ModalHeader toggle={this.toggle}><FormattedMessage id="login"/></ModalHeader>
                    <ModalBody>
                        <div className="login-tip">{tip}</div>
                        <InputGroup>
                            <Input value={ username } onChange={ e => this.changeState('username', e.target.value) } placeholder={ this._intl('username') } />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ password } onChange={ e => this.changeState('password', e.target.value) } type="password" placeholder={ this._intl('pwd') } />
                        </InputGroup>
                        <div className="login-opt">
                            <span onClick={()=> this.loginOptClick('forget')} className="login-opt-forget"><FormattedMessage id="forgotPwd"/></span>
                            <span className="login-opt-symbol">|</span>
                            <span onClick={()=> this.loginOptClick('register')} className="login-opt-register"><FormattedMessage id="register"/></span>
                        </div>
                    </ModalBody>
                    <div onClick={ this.validation.bind(this) } className="gradient-bg submit-btn"><FormattedMessage id="loginNow"/></div>
                </Modal>
            </div>
        )
    }

    changeState (key, value) {
        this.setState({ [key]: value, tip: '' })
    }

    validation () {
        if (this.isOnClick) return

        const { usernameRegular, passwordRegular, username, password } = this.state

        try {
            if(!usernameRegular.test(username)){
                throw this._intl('errorName')
            }
            if(!passwordRegular.test(password)){
                throw this._intl('errorPwd')
            }
        } catch (error) {
            this.setState({
                tip : error
            })
            return false
        }
        
        this.registered()
    }

    async registered () {
        const { username, password } = this.state

        this.isOnClick = true

        try {
            await this.props.post(`/auth/form?username=${ username }&password=${ password }&language=`)
            Toast.success(this._intl('sucLogin'))
            const round = await this.props.get('/sessions/round')
            const result = await this.props.get('/users')
            sessionStorage.setItem('username', result.username)
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
            Toast.error(error || this._intl('failLogin'))
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