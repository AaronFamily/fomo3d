import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { Countdown, Accordion } from '../../components/index'
import { title,firstPrize,secondPrize,thirdPrize } from '../../image/index'

import LeftBuy from '../../components/Accordion/LeftBuy/index'
import LeftInvite from '../../components/Accordion/LeftInvite/index'
import RightBuy from '../../components/Accordion/RightBuy/index'
import RightRound from '../../components/Accordion/RightRound/index'
import RightStatistical from '../../components/Accordion/RightStatistical/index'

import requests from '../../utils/requests'

import './index.less'

@requests()
class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabListLeft : [
				{name : '购买',componentsName : LeftBuy},
				{name : '邀请',componentsName : LeftInvite},
			],
			tabListRight : [
				{name : '回合',componentsName : RightRound},
				{name : '最近购买',componentsName : RightBuy},
				{name : '统计',componentsName : RightStatistical},
			],
		};
	}

	render() {
		const { tabListLeft,tabListRight } = this.state
		return (
			<div className="home">
				<div className="main">
					{/* 标题 */}
					<div className="title">
						<img className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6" src={ title } alt="换了夺宝记"/>
					</div>
          			{/* 倒计时 */}
					<Countdown endTime={ 1541692470968+10000000*60*1000 } fontSize='22px' />
					<div className="trophy">
						<Row>
							<Col xs="12" sm="12" md="4" lg="4" xl="4"><img src={secondPrize}/><span className="trophy-secondPrize">点击查看</span></Col>
							<Col xs="12" sm="12" md="4" lg="4" xl="4"><img src={firstPrize}/><span>点击查看</span></Col>
							<Col xs="12" sm="12" md="4" lg="4" xl="4"><img src={thirdPrize}/><span className="trophy-thirdPrize">点击查看</span></Col>
						</Row>
					</div>
          {/* 购买欢乐币 */}
          <div className="gradient-bg buy">购买欢乐币</div>
          {/* tab切换 */}
          <Row>
            <Col xs="12" sm="12" md="6" lg="6" xl="6"><Accordion list={tabListLeft} /></Col>
            <Col xs="12" sm="12" md="6" lg="6" xl="6"><Accordion list={tabListRight} /></Col>
          </Row>
				</div>
			</div>
		);
	}
}

export default Home
