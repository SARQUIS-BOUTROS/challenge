import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import {setList} from "../../actionsCreators";
import {Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sharedStyles.css';
import LookUp from './lookUp/lookUp';
import {stringify, parse} from 'qs';
import Moment from 'react-moment';
import {URL_ROOT} from '../../constants.js';

class OrderRequestListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nextUrl: "/list-view/"
        }

    }

    componentDidMount() {
        this.getResults()
    }


    /*
    Detect change in url and trigger new search with getResults().
     */
    componentDidUpdate(prevProps, prevState) {

        console.log(prevProps.index, prevProps.filter_resume)

        if (prevProps.index !== this.props.index || prevProps.filter_resume !== this.props.filter_resume) {
            let query = stringify({
                search: this.props.index,
                status: this.props.filter_resume
            }, {arrayFormat: 'brackets', encode: false})

            this.props.history.push(`${this.state.nextUrl}${query}`);
            this.getResults()
        }


    }

    getResults() {
        let query = stringify({
            search: this.props.index,
            status: this.props.filter_resume
        }, {arrayFormat: 'brackets', encode: false})

        fetch(`${URL_ROOT}/order-request/?${query}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(resp => {
                return resp.json()
            })
            .then(resp => {
                this.props.setList(resp.order)

            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div id="container">
                <LookUp/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Status</th>
                        <th>Subject</th>
                        <th>Date Created</th>
                        <th>Code</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.list.map(orders => {
                        return (
                            <tr>
                                <td> {orders.status} </td>
                                <td> {orders.subject} </td>
                                <td><Moment date={orders.date_created}/></td>
                                <td> {orders.code} </td>
                                <td><Link to={`/detail/${orders.code}`}><Button> Details </Button> </Link></td>
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
        index: state.index,
        filter_resume: state.filter_resume
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setList: (list) => dispatch(setList(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderRequestListView));