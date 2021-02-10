import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { search } from "../../../actionsCreators";
import { Navbar, Form } from 'react-bootstrap';

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
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline>
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" value={this.props.index} onChange={this.handleChange}/>
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