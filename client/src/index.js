import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/css/index.scss'
import theme from './assets/material/theme'
import { ThemeProvider } from '@material-ui/core'

import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Home from './Screens/Home.jsx'
import SignIn from './Screens/SignIn.jsx'
import SignUp from './Screens/SignUp.jsx'
import PrivacyPolicy from './Screens/PrivacyPolicy.jsx'
import TermsConditions from './Screens/TermsConditions.jsx'
import AboutUs from './Screens/AboutUs.jsx'
import FAQ from './Screens/FAQ.jsx'
import CancellationPolicy from './Screens/CancellationPolicy.jsx'
import ContactUs from './Screens/ContactUs.jsx'
import BuyCar from './Screens/BuyCar.jsx'
import SellCar from './Screens/SellCar.jsx'
import CarPage from './Screens/CarPage.jsx'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import CSRFtoken from './utils/CSRFTokenReq'
import { setCurrentUser, logoutUser } from './actions/authActions'
import PrivateRoute from './Components/private-route/PrivateRoute'
import store from './store'
import SideBar from './Components/Sidebar.jsx'
import Error404 from './Screens/Error Pages/Error404.jsx'
import Error500 from './Screens/Error Pages/Error500.jsx'
import ErrorBrokenLink from './Screens/Error Pages/ErrorBrokenLink.jsx'

// Slick Carousel CSS
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

if (localStorage.accessToken) {
  const token = localStorage.accessToken
  setAuthToken(token)
  const decoded = jwt_decode(token)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
  }
}

const App = () => {

  useEffect(() => {
    CSRFtoken()
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={SignIn} />
            <Route path='/register/:dealer?' component={SignUp} />
            <PrivateRoute path='/user' component={SideBar} />
            <Route path='/privacy-policy' component={PrivacyPolicy} />
            <Route path='/terms-and-conditions' component={TermsConditions} />
            <Route path='/about-us' component={AboutUs} />
            <Route path='/faq' component={FAQ} />
            <Route path='/cancellation-policy' component={CancellationPolicy} />
            <Route path='/contact-us' component={ContactUs} />
            <Route path='/buy-car' component={BuyCar} />
            <PrivateRoute path='/sell-car' component={SellCar} />
            <Route path='/sellcar' component={SellCar} />
            <Route path='/car/:VINum' component={CarPage} />
            <Route path='/400' component={ErrorBrokenLink} />
            <Route path='/500' component={Error500} />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))