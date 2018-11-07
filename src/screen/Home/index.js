import React, { Component } from 'react'
import requests from '../../utils/requests'
import { 
  Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,
  NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,
  Container,Row,Col
  } from 'reactstrap';
import Tabs from './Tabs'

import Countdown from '../../components/Countdown/index';

import './index.less'
import { format } from 'path';

@requests()
class Home extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
    this.setState({
        isOpen: !this.state.isOpen
    });
    }

    render() {
        return (
            <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/components/">Components</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Options
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          Option 1
                        </DropdownItem>
                        <DropdownItem>
                          Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          Reset
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Collapse>
              </Navbar>
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