import React , {Component} from 'react'
import { connect } from 'react-redux'
import {
    NavItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    DropdownItem
} from 'reactstrap'

import { Header, Countdown } from '../../../components/index'

import Modals from '../Modals/index'
import Login from '../Modals/Login/index'
import Register from '../Modals/Register/index'
import ForgetPwd from '../Modals/ForgetPwd/index'

import {
    funnel,
    goldCoinsDeep,
    user
} from '../../../image/index'
import './index.less'

@connect(state => ({
    time: state.time,
    huanlebi: state.huanlebi,
    isLogin: state.isLogin,
    username: state.username
}))
class Head extends Component {
    constructor (props) {
        super (props)
        this.state = {
            loginOrRegister : 'Login',
            ModalsIsShow : false
        }

    }

    render (){
        const { time, huanlebi, isLogin, username } = this.props

        return (
            <div className="head">
                <Header title="Fomo3D">
                    <NavItem className="col-md-3 col-lg-3 head-vertical-center head-icon-left">
                        <div className="head-liItem">
                            <img className="g-header-icon head-hourglass" src={ funnel } alt="funnel"/>
                            <Countdown endTime={ time } special={ false } fontSize='14px' />
                        </div>
                    </NavItem>
                    <NavItem className="col-md-3 col-lg-3 head-vertical-center head-icon-left">
                        <div className="middle head-vertical-center">
                            <img className="g-header-icon" src={ goldCoinsDeep } alt="goldCoinsDeep"/>
                            <span>{ huanlebi }</span>
                        </div>
                    </NavItem>
                    <NavItem className="col-md-2 col-lg-2"></NavItem>
                    {
                        isLogin ?
                        <UncontrolledDropdown nav inNavbar className="col-md-3 col-lg-3 head-vertical-center">
                            <div>
                                <DropdownToggle nav>
                                    <img className="g-header-icon head-user-icon user-portrait" src={ user } alt=""/>
                                    <span>{ username }</span>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        退出
                                    </DropdownItem>
                                </DropdownMenu>
                            </div>
                        </UncontrolledDropdown>
                        :
                        <NavItem className="col-md-3 col-lg-3 head-vertical-center">
                            <div className="head-flex-row pull-right">
                                <img className="g-header-icon head-user-icon" src={ user } alt="user"/>
                                <div className="head-user-text login-register">
                                    <div onClick={()=>this.showModel('Login')} className="header-active-login">登录</div>
                                    <div onClick={()=>this.showModel('ModalRegister')}>注册</div>
                                </div>
                            </div>
                        </NavItem>
                    }
                    <UncontrolledDropdown nav inNavbar className="col-md-1 col-lg-1 pull-right head-vertical-center">
                        <div>
                            <DropdownToggle nav>
                                ZH V
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    ZH
                                </DropdownItem>
                            </DropdownMenu>
                        </div>
                    </UncontrolledDropdown>
                </Header>
                {
                  this._toogleModal()
                }
            </div>
        )
    }

    _toogleModal () {
        const { ModalsIsShow } = this.state
        switch (this.state.loginOrRegister) {
            case 'Login':
                return <Login modal={ ModalsIsShow } goForget={ this.goForget.bind(this) } goRegister={ this.goRegister.bind(this) }></Login>
            case 'ModalRegister':
                return <Register modal={ ModalsIsShow }></Register>
            case 'Forget':
                return <ForgetPwd modal={ ModalsIsShow }></ForgetPwd>
            default:
                return <Login modal={ ModalsIsShow } goForget={ this.goForget.bind(this) } goRegister={ this.goRegister.bind(this) }></Login>
        }
    }

    goRegister () {
        this.setState({
            loginOrRegister : 'ModalRegister',
            ModalsIsShow : true
        })
    }

    goForget () {
        this.setState({
            loginOrRegister : 'Forget',
            ModalsIsShow : true
        })
    }

    showModel (type) {
        this.setState({
            loginOrRegister : type,
            ModalsIsShow : true
        })
    }
}

export default Head