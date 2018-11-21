import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Countdown, Accordion } from '../../components/index'
import { title } from '../../image/index'

import LeftBuy from './LeftBuy/index'
import LeftInvite from './LeftInvite/index'
import RightBuy from './RightBuy/index'
import RightRound from './RightRound/index'
import RightStatistical from './RightStatistical/index'

import { FormattedMessage, injectIntl } from 'react-intl'

import Trophy from './Trophy'
import { setUserInfo, setTime, resetLoginStatus } from '../../store/action'

import requests from '../../utils/requests'

import './index.less'

@injectIntl
@connect(state => ({
	isBox: state.language !== 'zh'
}), dispatch => ({
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
					name: <FormattedMessage id="buy"/>,
					tabTitle: <FormattedMessage id="buyingCoins"/>,
					componentsName: LeftBuy,
					alert: {
						title: <FormattedMessage id="buy"/>,
						children: [
							<FormattedMessage id="buyContent"/>
						]
					}
				},
				{
					name: <FormattedMessage id="invite"/>,
					tabTitle: <FormattedMessage id="invite"/>,
					componentsName: LeftInvite,
					alert: {
						title: <FormattedMessage id="invite"/>,
						children: [
							<FormattedMessage id="inviteContent"/>
						]
					}
				},
			],
			tabListRight : [
				{
					name: <FormattedMessage id="round"/>,
					tabTitle: this._intl(['first', 0, 'round']),
					componentsName: RightRound,
					alert: {
						title: <FormattedMessage id="round"/>,
						children: [
							<FormattedMessage id="roundContent"/>
						]
					}
				},
				{
					name: <FormattedMessage id="recent"/>,
					tabTitle: <FormattedMessage id="recent"/>,
					componentsName: RightBuy,
					alert: {
						title: <FormattedMessage id="recent"/>,
						children: [
							<FormattedMessage id="RecentlyBuyContent"/>
						]
					}
				},
				{ 
					name: <FormattedMessage id="stats"/>,
					tabTitle: <FormattedMessage id="stats"/>,
					componentsName: RightStatistical,
					alert: {
						title: <FormattedMessage id="stats"/>,
						children: [
							<FormattedMessage id="statisticalContent"/>
						]
					}
				}
			],
			time: 0,
			rank: ['', '', '']
		}
	}

	_intl (ids) {
		return ids.map(id => {
			if (typeof id === 'number') {
				return id
			}

			return this.props.intl.formatMessage({ id })
		})
    }

	render() {
		const { tabListLeft, tabListRight } = this.state

		return (
			<div className="home">
				<div className="main">
					<div className="title">
						<img className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" src={ this.props.intl.formatMessage({ id: 'banner' }) } alt="title"/>
					</div>
					<Countdown endTime={ this.state.time } fontSize='22px'/>
					<Trophy rank={ this.state.rank }/>
					<div className="accordion-box">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 inline-block">
							<Accordion isBox={ this.props.isBox } list={ tabListLeft } />
						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 inline-block">
							<Accordion isBox={ this.props.isBox } list={ tabListRight } tabBgColor="#41338B" cBgColor="#614DD0"/>
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

			newTabListRight[0].tabTitle = this._intl(['first', parseInt(round.lunshu || 0), 'round'])

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
