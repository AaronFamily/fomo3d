import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Countdown, Accordion } from '../../components/index'
import { title } from '../../image/index'

import LeftBuy from './LeftBuy/index'
import LeftInvite from './LeftInvite/index'
import RightBuy from './RightBuy/index'
import RightRound from './RightRound/index'
import RightStatistical from './RightStatistical/index'

import Trophy from './Trophy'
import { setUserInfo, setTime, resetLoginStatus } from '../../store/action'

import requests from '../../utils/requests'

import './index.less'

@connect(null, dispatch => ({
	setUserInfo: data => dispatch(setUserInfo(data)),
	setTime: time => dispatch(setTime(time)),
	resetLoginStatus: bool => dispatch(resetLoginStatus(bool))
}))
@requests()
class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tabListLeft : [
				{
					name: '购买',
					tabTitle: '购买欢乐币',
					componentsName: LeftBuy,
					alert: {
						title: '展示性弹框',
						children: [
							'简单的介绍内容'
						]
					}
				},
				{
					name: '邀请',
					tabTitle: '邀请',
					componentsName: LeftInvite,
					alert: {
						title: '展示性弹框',
						children: [
							'简单的介绍内容'
						]
					}
				},
			],
			tabListRight : [
				{
					name: '回合',
					tabTitle: '购买截止',
					componentsName: RightRound,
					alert: {
						title: '展示性弹框',
						children: [
							'简单的介绍内容'
						]
					},
					leftText: ''
				},
				{
					name: '最近购买',
					tabTitle: '最近购买',
					componentsName: RightBuy,
					alert: {
						title: '展示性弹框',
						children: [
							'简单的介绍内容'
						]
					}
				},
				{ 
					name: '统计',
					tabTitle: '统计',
					componentsName :RightStatistical,
					alert: {
						title: '展示性弹框',
						children: [
							'简单的介绍内容'
						]
					}
				}
			],
			time: 0,
			rank: ["???", "???", "???"]
		}
	}

	render() {
		const { tabListLeft, tabListRight } = this.state

		return (
			<div className="home">
				<div className="main">
					<div className="title">
						<img className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" src={ title } alt=""/>
					</div>
					<Countdown endTime={ this.state.time } fontSize='22px'/>
					<Trophy rank={ this.state.rank }/>
					<div className="accordion-box">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 inline-block">
							<Accordion list={ tabListLeft } />
						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 inline-block">
							<Accordion list={ tabListRight } tabBgColor="#41338B" cBgColor="#614DD0"/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	componentDidMount () {
		this.getTime()
		this.getPlatformData()
		this.getUserInfoData()
	}

	async getPlatformData () {
		const rank = await this.props.get('/sessions/rank')
		const statistics = await this.props.get('/sessions/statistics')
		const recency = await this.props.get('/sessions/recency')

		this.setState({ rank })

		this.props.setUserInfo({
			rank,
			recency,
			...statistics
		})
	}

	async getTime () {
		const time = await this.props.get('/sessions/time')

		this.setState({ time: Date.now() + time })

		this.props.setUserInfo({
			time: Date.now() + time
		})
	}

	async getUserInfoData () {
		try {
			const result = await this.props.get('/users')	
			this.props.setUserInfo({
				...result,
				isLogin: true
			})

			this.getRound()
		} catch (error) {
			this.props.resetLoginStatus(false)
		}
	}

	async getRound () {
		try {
			const round = await this.props.get('/sessions/round')

			const newTabListRight = [...this.state.tabListRight]

			newTabListRight[0].leftText = `第 ${round.lunshu} 轮`

			this.setState({
				tabListRight: newTabListRight
			})

			this.props.setUserInfo({
				...round
			})
		} catch (error) {}
	}
}

export default Home
