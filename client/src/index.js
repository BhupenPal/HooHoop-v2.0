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
import VirtualTour from './Screens/Main/VirtualTour.jsx'
import TourPage from './Screens/Main/TourPage.jsx'

// ERROR PAGES
import Error404 from './Screens/Error Pages/Error404.jsx'
import Error500 from './Screens/Error Pages/Error500.jsx'

// SERVICES & UTILS
import CSRFtoken from './utils/CSRFTokenReq'
import CheckLoginOnRender from './utils/CheckLoginOnRender'
import store from './redux/store'
import CheckAuth from './HOC/CheckAuth'
import CustomSnackbar from './Components/Snackbar.jsx'
import Layout from './Components/Layout.jsx'
import Profile from './Screens/Dashboard/Profile.jsx'
import Favourites from './Screens/Dashboard/Favourites.jsx'
import MyListingScreen from './Screens/Dashboard/MyListing.jsx'
import AllListingScreen from './Screens/Dashboard/AllListings.jsx'
import UserManagementScreen from './Screens/Dashboard/UserManagements.jsx'
import MyClientManagementScreen from './Screens/Dashboard/MyClientManagement.jsx'
import AllClientManagementScreen from './Screens/Dashboard/AllClientsManagement.jsx'
import Payments from './Screens/Dashboard/Payments.jsx'

const App = () => {
	useEffect(() => {
		CheckLoginOnRender()
		CSRFtoken()
	}, [])

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Layout>
						<Switch>
							<Route path='/' exact component={Home} />
							<Route path='/login' component={SignIn} />
							<Route path='/register/:dealer?' component={SignUp} />
							<Route path='/user/dashboard' component={CheckAuth(Profile)} />
							<Route
								path='/user/my-favourites'
								component={CheckAuth(Favourites)}
							/>
							<Route
								path='/user/my-listing'
								component={CheckAuth(MyListingScreen)}
							/>
							<Route
								path='/user/all-listing'
								component={CheckAuth(AllListingScreen)}
							/>
							<Route
								path='/user/user-management'
								component={CheckAuth(UserManagementScreen)}
							/>
							<Route
								path='/user/my-client-management'
								component={CheckAuth(MyClientManagementScreen)}
							/>
							<Route
								path='/user/all-client-management'
								component={CheckAuth(AllClientManagementScreen)}
							/>
							<Route
								path='/user/your-payments'
								component={CheckAuth(Payments)}
							/>
							<Route path='/privacy-policy' component={PrivacyPolicy} />
							<Route path='/terms-and-conditions' component={TermsConditions} />
							<Route path='/about-us' component={AboutUs} />
							<Route path='/faq' component={FAQ} />
							<Route
								path='/cancellation-policy'
								component={CancellationPolicy}
							/>
							<Route path='/contact-us' component={ContactUs} />
							<Route path='/buy-car' component={BuyCar} />
							<Route path='/sell-car' component={CheckAuth(SellCar)} />
							<Route path='/car/:VINum' component={CarPage} />
							<Route path='/virtual-tours' component={VirtualTour} />
							<Route path='/virtual-tour/:APID' component={TourPage} />
							<Route path='/500' component={Error500} />
							<Route component={Error404} />
						</Switch>
						<CustomSnackbar />
					</Layout>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))