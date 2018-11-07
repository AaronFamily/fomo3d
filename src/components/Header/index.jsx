import React, { Component } from 'react'
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav
} from 'reactstrap'

export default class extends Component {
    static defaultProps = {
        title: ''
    }

    constructor(props) {
        super(props)
        
        this.state = {
            isOpen: false
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        }, () => {
            this.props.toggle && this.props.toggle(this.state.isOpen)
        })
    }

    render() {
        return <Navbar className="navbar navbar-fixed-top navbar-transparent navbar-dark header-navbar" expand="md">
            <NavbarBrand className="text-white" href="/">{ this.props.title }</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="col-lg-10 col-md-10 justify-content-around text-white " navbar>
                { this.props.children }
            </Nav>
            </Collapse>
        </Navbar>
    }
}