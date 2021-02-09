import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import { setList } from "../../actionsCreators";
import {Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sharedStyles.css';


class OrderRequestListView extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){
        this.getResults()
    }
    getResults(){

        fetch('http://localhost:3001/order-request/',{
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(resp =>{
                return resp.json()
            })
            .then( resp =>{

                this.props.setList(resp.orders)
               // console.log(this.state.orders)
            })
            .catch(err =>{
                console.log(err)
            })
    }

        render() {
        return(
            <div id = "container">

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Ver</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.props.list.map(orders => {
                        return (
                                <tr>
                                    <td> { orders.subject } </td>
                                    <td> { orders.body } </td>
                                    <td> { orders.date} </td>
                                    <td> <Button> Submit </Button> </td>
                                </tr>
                        )
                    })
                   }
                    </tbody>
                </Table>
            </div>
            )
        }

}

function mapStateToProps(state) {
    return {
       list: state.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setList: (list) => dispatch(setList(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderRequestListView));