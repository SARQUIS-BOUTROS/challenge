import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import {Button, ButtonGroup, Form , Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sharedStyles.css';
import { URL_ROOT, STATUS_ORDER_REQUEST } from '../../constants.js';

class orderRequestView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {},
            notFile: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setStatus = this.setStatus.bind(this)
    }

    componentDidMount(){
        this.getResults()
    }
    getResults(){

        fetch(`${URL_ROOT}/order-request/detail/${this.props.match.params.id}`,{
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
        if (this.state.order.filename != null) {
            fetch(`${URL_ROOT}/file/${this.state.order.code}_${this.state.order.filename}`,{
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })
                .then(res => {
                    // Redirect to download link
                    window.location.replace(res.url);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        event.preventDefault();
    }
    setStatus(evt) {
        let change = evt.target.name;
        let body = JSON.stringify({
            status: change,
            code: this.state.order.code
        })

        fetch(`${URL_ROOT}/order-request/`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: body
        })
            .then(resp =>{
                return resp.json()
            })
            .then( resp =>{
                this.setState({
                    order:resp.order
                })
            })
    }

    render() {
        let renderButtonsActions = () => {
            if (this.state.order.status == STATUS_ORDER_REQUEST.ONGOING) {
                return (
                    <div>
                        <Button variant="danger" onClick = {this.setStatus} name = { STATUS_ORDER_REQUEST.REJECTED}>Mark as Rejected</Button>
                        <Button variant="success" onClick = {this.setStatus} name = {STATUS_ORDER_REQUEST.READY}>Mark as Ready</Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Button variant="danger" disabled = {true}>Mark as Rejected</Button>
                        <Button variant="success" disable= {true}>Mark as Ready</Button>
                    </div>
                        )
            }
        }

        let renderDownloadButton = () =>
        {
            if(this.state.order.filename == null) {
                return (<Button type="submit" value="Submit" disabled>Download File</Button>)
            } else {
                return (<Button type="submit" value="Submit">Download File</Button>)
            }
        }
        let renderStatus = ()=> {
            if (this.state.order.status == STATUS_ORDER_REQUEST.ONGOING){
                return (
                    <Badge pill variant="secondary">
                        ONGOING
                    </Badge>
                )
            } else if (this.state.order.status == STATUS_ORDER_REQUEST.REJECTED) {
                return (
                    <Badge pill variant="danger">
                        REJECTED
                    </Badge>
                )
            }else if (this.state.order.status == STATUS_ORDER_REQUEST.READY) {
                return (
                <Badge pill variant="success">
                    READY
                </Badge>
                )
            }
        }
        return(
            <div id = "container">
                { renderStatus() }
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>

                        <Form.Label>Code: </Form.Label>
                        <Form.Control type="text" placeholder={ this.state.order.code } readOnly />
                        <Form.Label>Created: </Form.Label>
                        <Form.Control type="text" placeholder={ this.state.order.date_created} readOnly />
                        <Form.Label>Subject: </Form.Label>
                        <Form.Control type="text" placeholder={ this.state.order.subject } readOnly />
                        <Form.Label>Body: </Form.Label>
                        <Form.Control type="text" placeholder={ this.state.order.body } readOnly  as="textarea" rows={3} />
                        <Form.Label>Updated: </Form.Label>
                        <Form.Control type="text" placeholder={ this.state.order.date_updated } readOnly />
                    </Form.Group>
                    { renderDownloadButton()}
                </Form>
                <ButtonGroup>
                    { renderButtonsActions() }
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