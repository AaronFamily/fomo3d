import React , {Component} from 'react'
import { 
    Modal, ModalHeader, ModalBody, Button,
    InputGroup, Input ,InputGroupAddon
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
        this.toggle = this.toggle.bind(this)
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
        const { tip,username,verifyCode, password,verifyTime,passwordAgain } = this.state
        return (
            <div className="login">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className} login-modal`}>
                    <ModalHeader toggle={this.toggle}><FormattedMessage id="forgotPwd"/></ModalHeader>
                    <ModalBody>
                        <div className="login-tip">{tip}</div>
                        <InputGroup>
                            <Input value={ username } onChange={ e => this.changeState('username', e.target.value) } type="text" placeholder={ this._intl('userName') } />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ verifyCode } onChange={ e => this.changeState('verifyCode', e.target.value) } placeholder={ this._intl('vCode') }/>
                            <InputGroupAddon addonType="prepend" style={{width:'110px'}}>
                                {
                                    verifyTime>0 ?
                                    <div className="verifyTime">{verifyTime}s</div> :
                                    <Button onClick={ e => this.obtainCode(e) }><FormattedMessage id="getCode"/></Button>
                                }
                            </InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <Input value={ password } onChange={ e => this.changeState('password', e.target.value) } type="password" placeholder={ this._intl('newPwd') } />
                        </InputGroup>
                        <InputGroup>
                            <Input value={ passwordAgain } onChange={ e => this.changeState('passwordAgain', e.target.value) } type="password" placeholder={ this._intl('confirmPwd') } />
                        </InputGroup>
                    </ModalBody>
                    <div onClick={ this.validation.bind(this) } className="gradient-bg submit-btn"><FormattedMessage id="ok"/></div>
                </Modal>
            </div>
        )
    }

    async obtainCode () {
        const {usernameRegular,username} = this.state

        try {
            if(!usernameRegular.test(username)){
                throw this._intl('usernameRole')
            }
        } catch (error) {
            this.setState({
                tip : error
            })

            return false
        }
        
        try {
            await this.props.post(`/auth/verify_code?username=${ username }&language=${ this.props.lang === 'zh' ? 'zh_cn' : 'en_us' }`)
            
            let seconds = 60
            
            this.timeOut = setInterval( () => {
                if(seconds <= 0){
                    clearTimeout(this.timeOut)
                }
                seconds--
                this.setState({ verifyTime : seconds })
            }, 1000)

            Toast.success(this._intl('sucSendCode'))
        } catch (error) {
            Toast.error(this._intl(error || 'failSend'))
        }
    }

    changeState (key, value) {
        this.setState({ [key]: value, tip: '' })
    }

    validation () {
        const { usernameRegular,passwordRegular,username,password,passwordAgain } = this.state
        try {
            if(!usernameRegular.test(username)){
                throw this._intl('usernameRole')
            }
            if(!passwordRegular.test(password)){
                throw this._intl('pwdRole')
            }
            if(password !== passwordAgain){
                throw this._intl('inputPwdRole')
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
        const { username,verifyCode, password } = this.state

        try {
            await this.props.post(`/users/password?username=${ username }&password=${ password }&verifyCode=${ verifyCode }&language=${ this.props.lang === 'zh' ? 'zh_cn' : 'en_us' }`)
            
            Toast.success(this._intl('sucChangePwd'))
            this.toggle()
        } catch (error) {
            Toast.error(error || this._intl('failChangePwd'))
        }
        
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            modal: nextProps.modal
        })
    }
}

export default ForgetPwd