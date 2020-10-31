// DEPENDENCIES
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core'

// STYLES & CSS
import './assets/css/index.scss'
import theme from './assets/material/theme'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// COMPONENTS & SCREENS
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Home from './Screens/Main/Home.jsx'
import SignIn from './Screens//Main/SignIn.jsx'
import SignUp from './Screens/Main/SignUp.jsx'
import PrivacyPolicy from './Screens/Footer/PrivacyPolicy.jsx'
import TermsConditions from './Screens//Footer/TermsConditions.jsx'
import AboutUs from './Screens/Footer/AboutUs.jsx'
import FAQ from './Screens/Footer/FAQ.jsx'
import CancellationPolicy from './Screens/Footer/CancellationPolicy.jsx'
import ContactUs from './Screens/Footer/ContactUs.jsx'
import BuyCar from './Screens/Main/BuyCar.jsx'
import SellCar from './Screens/Main/SellCar.jsx'
import CarPage from './Screens/Main/CarPage.jsx'
import SideBar from './Components/Sidebar.jsx'

// ERROR PAGES
import Error404 from './Screens/Error Pages/Error404.jsx'
import Error500 from './Screens/Error Pages/Error500.jsx'

// SERVICES & UTILS
import CSRFtoken from './utils/CSRFTokenReq'
import CheckLoginOnRender from './utils/CheckLoginOnRender'
import PrivateRoute from './utils/PrivateRoute'
import store from './redux/store'
import CheckAuth from './HOC/CheckAuth'

const App = () => {

  useEffect(() => {
    CheckLoginOnRender()
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
            <Route path='/user' component={CheckAuth(SideBar)} />
            <Route path='/privacy-policy' component={PrivacyPolicy} />
            <Route path='/terms-and-conditions' component={TermsConditions} />
            <Route path='/about-us' component={AboutUs} />
            <Route path='/faq' component={FAQ} />
            <Route path='/cancellation-policy' component={CancellationPolicy} />
            <Route path='/contact-us' component={ContactUs} />
            <Route path='/buy-car' component={BuyCar} />
            <Route path='/sell-car' component={CheckAuth(SellCar)} />
            <Route path='/car/:VINum' component={CarPage} />
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