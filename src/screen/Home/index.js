import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { Countdown, Accordion } from '../../components/index'
import { title } from '../../image/index'

import LeftBuy from '../../components/Accordion/LeftBuy/index'
import LeftInvite from '../../components/Accordion/LeftInvite/index'
import RightBuy from '../../components/Accordion/RightBuy/index'
import RightRound from '../../components/Accordion/RightRound/index'
import RightStatistical from '../../components/Accordion/RightStatistical/index'

import Trophy from './Trophy'

import requests from '../../utils/requests'

import './index.less'

@requests()
class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tabListLeft : [
				{name : '购买',tabTitle:'购买欢乐币',componentsName : LeftBuy},
				{name : '邀请',tabTitle:'邀请',componentsName : LeftInvite},
			],
			tabListRight : [
				{name : '回合',tabTitle:'购买截止',componentsName : RightRound},
				{name : '最近购买',tabTitle:'最近购买',componentsName : RightBuy},
				{name : '统计',tabTitle:'统计',componentsName : RightStatistical},
			],
			user: {
				address: '',
				email: '',
				friend1: 0,
				friend2: 0,
				inviterCode: '',
				username: 'shenweikang001'
			}
		}
	}

	render() {
		const { tabListLeft,tabListRight } = this.state
		return (
			<div className="home">
				<div className="main">
					{/* 标题 */}
					<div className="title">
						<img className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" src={ title } alt=""/>
					</div>
          			{/* 倒计时 */}
					<Countdown endTime={ 1541692470968+10000000*60*1000 } fontSize='22px' />
					{/* 奖杯部分 */}
					<Trophy />
					{/* 购买欢乐币 */}
					<button className="gradient-bg buy">购买欢乐币</button>
					{/* tab切换 */}
					<div className="accordion-box">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 inline-block">
							<Accordion user={ this.state.user } list={ tabListLeft } />
						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 inline-block">
							<Accordion user={ this.state.user } list={ tabListRight } tabBgColor="#41338B" cBgColor="#614DD0"/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	async componentDidMount () {
		try {
			// 获取用户数据
			const result = await this.props.get('/users')
			const recency = await this.props.get('/sessions/recency')
			const round = await this.props.get('/sessions/round')
			const statistics = await this.props.get('/sessions/statistics')
			const rank = await this.props.get('/sessions/rank')
			
			
			console.log('用户数据', result)
			console.log('最近购买', recency)
			console.log('第几轮', round)
			console.log('统计数据', statistics)
			console.log('获奖名单', rank)
		} catch (error) {
			console.log(error)
		}
		
	}
}

export default Home
