import React , {Component} from 'react'
import { Header, Countdown } from '../../../components/index'
import { NavItem, NavLink } from 'reactstrap'

import Modals from '../Modals/index'
import Login from '../Modals/Login/index'
import Register from '../Modals/Register/index'

import {
    funnel,
    goldCoinsDeep,
    user
} from '../../../image/index'
import './index.less'

export default class extends Component {
    constructor (props) {
        super (props)
        this.state = {
            loginOrRegister : 'Login',
            ModalsIsShow : false,
        }

    }

    render (){
        const { loginOrRegister, ModalsIsShow } = this.state

        return (
            <div className="head">
                <Header title="Fomo3D">
                    <NavItem className="col-md-3 col-lg-3 head-vertical-center head-icon-left">
                        <div className="head-liItem">
                            <img className="g-header-icon head-hourglass" src={ funnel } alt="funnel"/>
                            <Countdown endTime={ 1541692470968+10000000*60*1000 } special={ false } fontSize='14px' />
                        </div>
                    </NavItem>
                    <NavItem className="col-md-3 col-lg-3 head-vertical-center head-icon-left">
                        <div className="middle head-vertical-center">
                            <img className="g-header-icon" src={ goldCoinsDeep } alt="goldCoinsDeep"/>
                            <span>0</span>
                        </div>
                    </NavItem>
                    <NavItem className="col-md-2 col-lg-2"></NavItem>
                    <NavItem className="col-md-3 col-lg-3 head-vertical-center">
                        <div className="head-flex-row pull-right">
                            <img className="g-header-icon head-user-icon" src={ user } alt="user"/>
                            <div className="head-user-text login-register">
                                <div onClick={()=>this.showModel('Login')} className={ loginOrRegister === 'Login' ? 'header-active-login' : ''}>登录</div>
                                <div onClick={()=>this.showModel('ModalRegister')} className={ loginOrRegister === 'ModalRegister' ? 'header-active-login' : ''}>注册</div>
                            </div>
                        </div>
                    </NavItem>
                    <NavItem className="col-md-1 col-lg-1 pull-right head-vertical-center">
                        EN V
                    </NavItem>
                </Header>
                {
                  loginOrRegister == 'Login' ? 
                  <Login modal={ ModalsIsShow }></Login> :
                  <Register modal={ ModalsIsShow }></Register>
                }
            </div>
        )
    }

    showModel (type) {
        this.setState({
            loginOrRegister : type,
            ModalsIsShow : true
        })
    }
}