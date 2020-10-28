import { Switch } from 'react-router-dom';
import React from 'react';
import Profile from '../Screens/Dashboard/Profile.jsx';
import PrivateRoute from './private-route/PrivateRoute.js';
import MyListing from '../Screens/MyListing.jsx';
import SideBar from './Sidebar.jsx';

function userLayout(props) {
    return (
        <SideBar>
        <Switch>
            <PrivateRoute path="/" exact component={Profile} />
            <PrivateRoute path="/my-listing" exact component={MyListing} />
        </Switch>
        </SideBar>
    );
}

export default userLayout;