import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Home from './Screens/Home.jsx'
import SignIn from './Screens/SignIn.jsx'
import SignUp from './Screens/SignUp.jsx'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' component={SignIn} />
                <Route path='/register' component={SignUp} />
            </Switch>
            <Footer />
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))