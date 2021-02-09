import React from 'react';
import {  Route, BrowserRouter, Switch } from 'react-router-dom';
import MainView from './mainView/mainView';
import HomeView from './homeView/homeView';
import CreateView from './createView/createView';
import OrderRequestListView from './orderRequestView/orderRequestView';
import OrderRequestDetailView from './orderRequestDetailView/orderRequestDetailView';


const getRoutes = function() {
    return (
        <BrowserRouter>
            <div>
            <Route name="Main" component={MainView} />
                <Switch>
                    <Route exact path="/" component={HomeView} />
                    <Route path="/create/" component={CreateView} />
                    <Route path="/list-view/" component={OrderRequestListView} />
                    <Route path="/detail/:id" component={OrderRequestDetailView} />
                </Switch>
            </div>
        </BrowserRouter>
)
};
export default getRoutes;