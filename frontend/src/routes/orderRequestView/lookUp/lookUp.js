import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { search } from "../../../actionsCreators";
import {Button, Navbar, NavDropdown, Nav, Form, FormControl} from 'react-bootstrap';

class LookUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            nextURL:'/list-view/'
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(evt) {
        //console.log(evt.target.value)
        let searchValue = evt.target.value
        this.props.search(searchValue)
        //console.log(this.props.history  + this.state.nextURL+''+this.state.search)
        //this.props.history.push(encodeURI(this.state.nextURL+''+this.state.search));
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" value={this.props.index} onChange={this.handleChange}/>
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}

function mapStateToProps(state) {
    return {
        index: state.index
    }
}

function mapDispatchToProps(dispatch) {

    return {
        search: (index) => dispatch(search(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookUp);