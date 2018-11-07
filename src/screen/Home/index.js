import React, { Component } from 'react'
import requests from '../../utils/requests'
import {
	NavItem,
	NavLink,
	Container,
	Row,
	Col
} from 'reactstrap'

import { Countdown, Header } from '../../components/index'

import './index.less'

@requests()
class Home extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="home">
              <Header title='Fomo3D'>
                  	<NavItem>
                      	<NavLink href="" className="text-white">
						  	<span className="iconfont icon-zbds_shalou"></span>
						  	<span>47:32:42</span>
						</NavLink>
                    </NavItem>
					<NavItem>
                      	<NavLink href="" className="text-white">
						  	<span className="iconfont icon-zbds_shalou"></span>
						  	<span>0</span>
						</NavLink>
                    </NavItem>
					<NavItem>
                      	<NavLink href="" className="text-white">
						  	<span className="iconfont icon-zhexiantu"></span>
							<span>3.1%（0.39EHT）</span>
						</NavLink>
                    </NavItem>
					<NavItem>
                      	<NavLink href="" className="text-white">
						  	<span className="iconfont icon-zhexiantu"></span>
						  	<span>注册名称</span>
						</NavLink>
                    </NavItem>
              </Header>
              {/* <Tabs></Tabs> */}
              <Container>
                <Row>
                    <Col>
                      <Countdown></Countdown>
                    </Col>
                </Row>
              </Container>
            </div>
        );
    }
}

export default Home