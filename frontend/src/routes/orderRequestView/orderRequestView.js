import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import { setList } from "../../actionsCreators";
import {Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sharedStyles.css';
import LookUp from  './lookUp/lookUp'

class OrderRequestListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nextUrl: "/list-view/"
        }

    }

    componentDidMount(){
        this.getResults()
    }


    /*
    Detect change in url and trigger new search with getResults().
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.index !== this.props.index){
            this.props.history.push(`${this.state.nextUrl}${this.props.index}`);
            this.getResults()
        }

    }
    getResults(){
        console.log(this.props.index)
        fetch(`http://localhost:3001/order-request/${this.props.index}`,{
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(resp =>{
                return resp.json()
            })
            .then( resp =>{

                this.props.setList(resp.order)
               // console.log(this.state.orders)
            })
            .catch(err =>{
                console.log(err)
            })
    }

        render() {
        return(
            <div id = "container">
                <LookUp/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Date Created</th>
                        <th>Code</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.props.list.map(orders => {
                        return (
                                <tr>
                                    <td> { orders.subject } </td>
                                    <td> { orders.date_created} </td>
                                    <td> { orders.code} </td>
                                    <td> <Link to={ `/detail/${orders.code}` }><Button> Details </Button> </Link></td>
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
       list: state.list,
       index: state.index
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setList: (list) => dispatch(setList(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderRequestListView));