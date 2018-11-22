import React , { Component } from 'react'
import { 
    Button, Modal, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input ,
} from 'reactstrap'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'

import { Toast } from '../../../../components/index'

import requests from '../../../../utils/requests'

import '../index.less'
import './index.less'

@injectIntl
@connect(state => ({
    lang: state.language
}))
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
            modal: false
        }, () => {
            this.props.close && this.props.close()
        })
    }

    _intl (id) {
        return this.props.intl.formatMessage({ id })
    }

    render (){
        const { tip,address, email, password, username, verifyCode, inviterCode } = this.state

        return (
            <div className="register">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className} register`}>
                    <ModalHeader toggle={this.toggle}><FormattedMessage id="register"/></ModalHeader>
                    <ModalBody>
                        <div className="login-tip">{tip}</div>
                        <InputGroup>
                            <Input value={ address } onChange={ e => this.changeState('address', e.target.value) } placeholder={ this._intl('eth') } />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ username } onChange={ e => this.changeState('username', e.target.value) } placeholder={ this._intl('username') } />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ password } onChange={ e => this.changeState('password', e.target.value) } type="password" placeholder={ this._intl('pwd') } />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ email } onChange={ e => this.changeState('email', e.target.value) } placeholder={ this._intl('email') } />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ verifyCode } onChange={ e => this.changeState('verifyCode', e.target.value) } placeholder={ this._intl('vCode') }/>
                            <InputGroupAddon addonType="prepend" style={{width:'110px'}}>
                                {
                                    this.state.verifyTime>0 ?
                                    <div className="verifyTime">{this.state.verifyTime}s</div> :
                                    <Button onClick={ e => this.obtainCode(e) }><FormattedMessage id="getCode"/></Button>
                                }
                            </InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <Input value={ inviterCode } onChange={ e => this.changeState('inviterCode', e.target.value) } placeholder={ this._intl('iCode') } />
                        </InputGroup>
                        <div onClick={this.validation.bind(this)} className="gradient-bg submit-btn"><FormattedMessage id="registerNow"/></div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    changeState (key, value) {
        this.setState({ [key]: value, tip: '' })
    }

    async obtainCode () {
        if (this.isFireCode) return

        const { emailRegularRegular, usernameRegular, email, username } = this.state

        try {
            if(!usernameRegular.test(username)){
                throw this._intl('usernameRole')
            }
            if(!emailRegularRegular.test(email)){
                throw this._intl('emailRule')
            }
        } catch (error) {
            this.setState({
                tip : error
            })
            return false
        }
        try {
            this.isFireCode = true
            await this.props.post(`/auth/verify_code?email=${ email }&username=${ username }&language=${ this.props.lang === 'zh' ? 'zh_cn' : 'en_us' }`)
            let seconds = 60
            
            this.timeOut = setInterval( () => {
                if(seconds <= 0){
                    clearTimeout(this.timeOut)
                    this.isFireCode = false
                }
                seconds--
                this.setState({ verifyTime : seconds })
            }, 1000)
            Toast.success(this._intl('sucSendCode'))
        } catch (error) {
            Toast.error(error || this._intl('failSend'))
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
                throw this._intl('ethAddressRule')
            }
            if(!usernameRegular.test(username)){
                throw this._intl('usernameRole')
            }
            if(!passwordRegular.test(password)){
                throw this._intl('pwdRole')
            }
            if(!emailRegularRegular.test(email)){
                throw this._intl('emailRule')
            }
            if(!verifyCodeRegular.test(verifyCode)){
                throw this._intl('codeRole')
            }
            if(inviterCode && !inviterCodeRegular.test(inviterCode)){
                throw this._intl('inviteCodeRole')
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
        const { address, email, password, username, verifyCode, inviterCode } = this.state
        this.isRegister = true

        try {
            await this.props.post(`/users?verifyCode=${ verifyCode }&inviterCode=${ inviterCode }&language=${ this.props.lang === 'zh' ? 'zh_cn' : 'en_us' }`, {
                address,
                email,
                password,
                username,
            })
            Toast.success(this._intl('sucRegister'), 2000, () => {
                this.props.goLogin && this.props.goLogin()
            })
            this.toggle()
            this.isRegister = false
        } catch (error) {
            Toast.error(error || this._intl('failRegister'))
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