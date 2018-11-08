import React, { Component } from 'react';
import requests from '../../utils/requests';
import { NavItem, NavLink, Container, Row, Col } from 'reactstrap';

import { Countdown, Header, Accordion } from '../../components/index';

import './index.less';

@requests()
class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="home">
				<Header title="Fomo3D">
					<NavItem>
						<NavLink href="" className="text-white">
							{/* <span className="iconfont icon-zbds_shalou" /> */}
              <img className="icon_img" src="/img/daojishi_sm.png" alt=""/>
							<span>47:32:42</span>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="" className="text-white">
							{/* <span className="iconfont icon-zbds_shalou" /> */}
              <img className="icon_img" src="/img/yuechi_sm.png" alt=""/>
							<span>0</span>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="" className="text-white">
							{/* <span className="iconfont icon-zhexiantu" /> */}
              <img className="icon_img" src="/img/huoyuedu_sm.png" alt=""/>
							<span>3.1%（0.39EHT）</span>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="" className="text-white">
							{/* <span className="iconfont icon-zhexiantu" /> */}
              <img className="icon_img" src="/img/guanlian_sm.png" alt=""/>
							<span>注册名称</span>
						</NavLink>
					</NavItem>
				</Header>
				{/* <Tabs></Tabs> */}
				<Container>
					{/* 标题 */}
					<Row><Col><div className="Home_Title"><img src="/img/title_sm.png" alt=""/></div></Col></Row>
          {/* 倒计时 */}
          <Row><Col><Countdown /></Col></Row>
          {/* 购买欢乐币 */}
          <Row><Col><div className="Home_buy">购买欢乐币</div></Col></Row>
          {/* tab切换 */}
          <Row>
            <Col sm="6"><Accordion /></Col>
            <Col sm="6"><Accordion /></Col>
          </Row>
				</Container>
			</div>
		);
	}
}

export default Home;
