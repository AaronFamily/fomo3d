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
                    <NavItem>
                        <div className="head-liItem">
                            <img className="g-header-icon" src={ funnel } alt="funnel"/>
                            <Countdown endTime={ 1541692470968+10000000*60*1000 } fontSize='16px' />
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className="middle">
                            <img className="g-header-icon" src={ goldCoinsDeep } alt="key"/>
                            <span>0</span>
                        </div>
                    </NavItem>
                    <NavItem className="head-user">
                        <img className="g-header-icon" src={ user } alt="user"/>
                        <div className="head-user-text login-register">
                            <div onClick={()=>this.showModel('Login')} className={loginOrRegister=='Login' ? 'gradient-bg' : ''}>登录</div>
                            <div onClick={()=>this.showModel('ModalRegister')} className={loginOrRegister=='ModalRegister' ? 'gradient-bg' : ''}>注册</div>
                        </div>
                    </NavItem>
                </Header>
                <Modals>弹框</Modals>
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