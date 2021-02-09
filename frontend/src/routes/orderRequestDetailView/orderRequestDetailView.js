import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import {Button, ButtonGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sharedStyles.css';


class orderRequestView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {}
        }
    }

    componentDidMount(){
        this.getResults()
    }
    getResults(){

        fetch('http://localhost:3001/order-request/detail/2',{
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(resp =>{
                return resp.json()
            })
            .then( resp =>{
                this.setState({
                    order:resp.order
                })
            })
            .catch(err =>{
                console.log(err)
            })
    }
    handleSubmit(event) {

        fetch('http://localhost:3001/download/',{
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => {
                window.location.replace(res.url);
            })
            .catch(err => {
                console.log(err)
            })

        event.preventDefault();
    }


    render() {
        return(
            <div id = "container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Subject: </Form.Label>
                        <Form.Control type="text" placeholder={ this.state.order.subject } readOnly />
                        <Form.Label>Body: </Form.Label>
                        <Form.Control type="text" placeholder={ this.state.order.body } readOnly />
                    </Form.Group>
                    <Button type="submit" value="Submit" >Download</Button>
                </Form>
                <ButtonGroup>
                    <Button variant="danger">Mark as Rejected</Button>
                    <Button variant="success">Mark as Ready</Button>
                </ButtonGroup>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
/*
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
 */
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(orderRequestView));