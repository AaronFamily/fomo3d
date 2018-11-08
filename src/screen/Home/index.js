import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { Countdown, Accordion } from '../../components/index'
import { title } from '../../image/index'

import requests from '../../utils/requests'

import './index.less'

@requests()
class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="home">
				<div className="main">
					{/* 标题 */}
					<div className="title">
						<img className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6" src={ title } alt="换了夺宝记"/>
					</div>
          {/* 倒计时 */}
					<Countdown
						endTime={ 1541692470968+10*60*1000 }
					/>
					<div className="trophy"></div>
          {/* 购买欢乐币 */}
          <div className="buy">购买欢乐币</div>
          {/* tab切换 */}
          <Row>
            <Col xs="12" sm="12" md="6" lg="6" xl="6"><Accordion /></Col>
            <Col xs="12" sm="12" md="6" lg="6" xl="6"><Accordion /></Col>
          </Row>
				</div>
			</div>
		);
	}
}

export default Home
