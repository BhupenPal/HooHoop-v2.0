import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./assets/css/index.scss";
import theme from "./assets/material/theme";
import { ThemeProvider } from "@material-ui/core";

import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Screens/Home.jsx";
import SignIn from "./Screens/SignIn.jsx";
import SignUp from "./Screens/SignUp.jsx";
import Dashboard from "./Screens/Dashboard.jsx";
import PrivacyPolicy from "./Screens/PrivacyPolicy.jsx";
import TermsConditions from "./Screens/TermsConditions.jsx";
import AboutUs from "./Screens/AboutUs.jsx";
import FAQ from "./Screens/FAQ.jsx";
import CancellationPolicy from "./Screens/CancellationPolicy.jsx";
import ContactUs from "./Screens/ContactUs.jsx";
import BuyCar from "./Screens/BuyCar.jsx";
import SellCar from "./Screens/SellCar.jsx";
import CarPage from "./Screens/CarPage.jsx";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./Components/private-route/PrivateRoute";
import store from "./store";
import MyListing from "./Screens/MyListing.jsx";
import userLayout from "./Components/userLayout.jsx";
import SideBar from "./Components/Sidebar.jsx";

if (localStorage.accessToken) {
  const token = localStorage.accessToken;
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
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={SignIn} />
              <Route path="/register/:dealer?" component={SignUp} />
              {/* <Route path="/dashboard" exact>
                <SideBar>
                  <PrivateRoute path="/" exact component={Dashboard} />
                  <PrivateRoute
                    path="/my-listing"
                    exact
                    component={MyListing}
                  />
                </SideBar>
              </Route> */}
              <PrivateRoute path="/user" component={SideBar} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/terms-and-conditions" component={TermsConditions} />
              <Route path="/about-us" component={AboutUs} />
              <Route path="/faq" component={FAQ} />
              <Route
                path="/cancellation-policy"
                component={CancellationPolicy}
              />
              <Route path="/contact-us" component={ContactUs} />
              <Route path="/buy-car" component={BuyCar} />
              <PrivateRoute path="/sell-car" component={SellCar} />
              <Route path="/sellcar" component={SellCar} />
              <Route path="/car/:VINum" component={CarPage} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));