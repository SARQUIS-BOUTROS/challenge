import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {search, setList} from "../../../actionsCreators";
import { Navbar, Form } from 'react-bootstrap';
import {stringify} from "qs";

class LookUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            nextURL:'/list-view/'
        };
        this.handleChange = this.handleChange.bind(this);
    }


   async handleChange(evt) {

        let ongoingValue;
        let rejectedValue;
        let readyValue;
        let searchValue = evt.target.name == "SEARCH"? evt.target.value: this.props.index;

        if (evt.target.name == "ONGOING"){
            ongoingValue = this.props.ongoing_value == false? true: false;
        }
        if (evt.target.name == "REJECTED" ){
            rejectedValue =  this.props.rejected_value == false? true: false;
        }
        if (evt.target.name == "READY" ){
            readyValue = this.props.ready_value == false? true: false;
        }
        await this.props.search(searchValue, ongoingValue, rejectedValue,readyValue)
    }



    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form inline>
                            <Form.Control type="text" placeholder="Search" className="mr-sm-2" name = "SEARCH" value={this.props.index} onChange={this.handleChange}/>
                        </Form>
                    </Navbar.Collapse>
                    <Form>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline label="READY" type={type} id={`inline-${type}-1`} name ="READY" onChange={this.handleChange}/>
                                <Form.Check inline label="REJECTED" type={type} id={`inline-${type}-2`} name ="REJECTED" onChange={this.handleChange}/>
                                <Form.Check inline label="ONGOING" type={type} id={`inline-${type}-3`} name = "ONGOING" onChange={this.handleChange}/>
                            </div>
                        ))}
                    </Form>
                </Navbar>

            </div>


        );
    }
}

function mapStateToProps(state) {
    return {
        index: state.index,
        ongoing_value:state.ongoing_value,
        rejected_value: state.reject_value,
        ready_value: state.ready_value,
        filter_resume: state.filter_resume
    }
}

function mapDispatchToProps(dispatch) {

    return {
        search: (searchValue, ongoingValue, rejectedValue,readyValue) => dispatch(search(searchValue, ongoingValue, rejectedValue,readyValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookUp);