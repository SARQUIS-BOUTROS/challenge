import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sharedStyles.css';
import { Spinner } from 'react-bootstrap';

class HomeView extends Component {
    constructor() {
        super();
        this.state = {
        }
        document.title = "Home | Orders ";
    }
    render() {
        return (
            <div id="container">
                <Link to="/list-view"><Button>Orders Requests</Button></Link>
                <Link to="/create"><Button>New Order Request</Button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}
function mapDispatchToProps(dispatch) {

    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);