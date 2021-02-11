import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Button, Alert, Modal} from 'react-bootstrap';
import toBase64file from './convertToBase64'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sharedStyles.css';
import {addToList} from "../../actionsCreators";
import {Link} from "react-router-dom";
import {URL_ROOT} from '../../constants.js';

class CreateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spin: false,
            alert: false,
            success: false,
            subject: '',
            body: '',
            code: '',
            invalidfile: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        if ((this.state.subject == '') || (this.state.body == '')) {
            this.setState({
                alert: true
            })
        } else {
            let file;
            let fileName;
            let fileToBase64;
            file = event.target["exampleFormControlFile1"].files[0]

            if (file != undefined && file.name.indexOf(".pdf") != -1) {

                console.info(file);
                fileToBase64 = await toBase64file(file);
                fileName = file.name;

            } else {
                file = null;
                fileName = null;

            }
            const subject = this.state.subject;
            const body = this.state.body;
            await fetch(`${URL_ROOT}/order-request/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    subject: subject,
                    body: body,
                    file: fileToBase64,
                    filename: fileName
                })
            }).then((res) => {

                if (res.status == 200) {
                    return Promise.resolve(res.json())
                } else {
                    return Promise.reject(res.json())
                }

            })
                .then(res => {
                    this.setState({
                        success: true,
                        code: res.orderRequest.code
                    });
                    this.props.addToList(res.orderRequest)

                    return res.orderRequest
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    setShowError() {
        this.setState({
            alert: false
        })
    }

    render() {
        return (
            <div id="container">
                <Form onSubmit={this.handleSubmit}>
                    {[this.state.alert].map((alert) => {
                        if (alert) {
                            return (
                                <Alert variant={"danger"} onClose={() => this.setShowError()} dismissible>Subject and
                                    Body can't be blank</Alert>)
                        }
                    })}
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Subject :</Form.Label>
                        <Form.Control name="subject" type="text" value={this.state.subject}
                                      onChange={this.handleChange}/>
                        <Form.Label>Body: </Form.Label>
                        <Form.Control name="body" type="text" value={this.state.body} as="textarea" rows={3}
                                      onChange={this.handleChange}/>
                        <Form.File id="exampleFormControlFile1" label="Select PDF File" type="file"
                                   accept="application/pdf"/>
                    </Form.Group>
                    <Button type="submit" value="Submit">Submit Order Request</Button>
                </Form>
                <Modal
                    show={this.state.success}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Order Request Sent</Modal.Title>
                    </Modal.Header>
                    {[this.state.code].map(code => {
                        return (
                            <Modal.Body> Your code confirm is {code}
                            </Modal.Body>
                        )
                    })}

                    <Modal.Footer>
                        <Link to="/"><Button variant="primary">Home</Button></Link>
                    </Modal.Footer>
                </Modal>
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