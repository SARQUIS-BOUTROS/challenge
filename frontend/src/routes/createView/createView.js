import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import {Form, Button, FormFile} from 'react-bootstrap';
import toBase64file from './convertToBase64'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sharedStyles.css';
import { addToList } from "../../actionsCreators";

class CreateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            body: '',
            file: '',
            spin: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       // this.toBase64file = this.toBase64file.bind(this);
        document.title = "Create | Orders ";
    }

    handleChange(event) {
        let name = event.target.name;
        const value = event.target.value;
        this.setState(
            {
                [name]: value,
            });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await this.setState({
            spin: true
        })
        console.log(this.state.spin)
        const file = event.target["exampleFormControlFile1"].files[0]

        const fileToBase64 = await toBase64file(file);
        console.log(fileToBase64)
        const subject = this.state.subject;
        const body = this.state.body;
        await fetch('http://localhost:3001/order-request/', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                subject: subject,
                body: body,
                file: fileToBase64
            })
        }).then((res) => {
            console.log("data received");
            return res.json()
        })
            .then(res => {
                this.props.addToList(res.orderRequest)

                return res.orderRequest
            })
            .catch(err => {
                console.log(err)
            })
        //window.location.replace("/");

    }
    render() {
        return (
            <div id="container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Subject :</Form.Label>
                        <Form.Control name="subject" type="text" value={this.state.subject}
                                      onChange={this.handleChange}/>
                        <Form.Label>Body: </Form.Label>
                        <Form.Control name="body" type="text" value={this.state.body} onChange={this.handleChange}/>
                        <Form.File id="exampleFormControlFile1" label="File input"/>
                    </Form.Group>
                    <Button type="submit" value="Submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        addToList: (order) => dispatch(addToList(order)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);