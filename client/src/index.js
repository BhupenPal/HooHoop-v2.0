import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/css/index.scss'

import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Home from './Screens/Home.jsx'
import SignIn from './Screens/SignIn.jsx'
import SignUp from './Screens/SignUp.jsx'
import Dashboard from './Screens/Dashboard.jsx'

import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"
import PrivateRoute from "./Components/private-route/PrivateRoute"
import store from "./store"

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={SignIn} />
            <Route path='/register' component={SignUp} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))