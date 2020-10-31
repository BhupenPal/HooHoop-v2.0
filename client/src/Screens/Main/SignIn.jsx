import React, { Component } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Box,
  Snackbar,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import styles from "../../assets/material/LoginResgister";
import { Alert } from "@material-ui/lab";
import GoogleLoginButton from "../../Components/Buttons/GoogleLoginButton.jsx";
import FacebookLoginButton from "../../Components/Buttons/FacebookLoginButton.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { activateEmail } from "../../services/emailVerifications";
const useStyles = makeStyles(styles)

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SignIn = () => {
  const [user,setUser] = useState({
    Email:"",
    Password:"",
    Remember:false
  })
  // const [Errors,setErrors] = useState(null);
  const query = useQuery()

  const [loginError,setLoginError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const [activationSuccess,setActivationSuccess] = useState(false);
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  // const [showGoogleDialog,setGoogleDialog] = useState(false);
  // const [showFacebookDialog,setFacebookDialog] = useState(false);
  // const [socialLoginResult,setSocialLoginResult] = useState(null);
  const classes  = useStyles();
const history = useHistory();
 
  useEffect(() => {
    if(query.get("token")){
      activateEmail(query.get("token"))
      .then(res => {
        setActivationSuccess(true)
      })
    }
    if (auth.isAuthenticated) {
      history.push("/user/dashboard");
    }
  }, [])
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/user/dashboard");
    }
    // if (nextProps.errors) {
    //   this.setState({
    //     Errors: nextProps.errors,
    //   });
    // }
  })
  const showError = (message) => {
    setLoginError(true);
    setErrorMessage(message)
  };
  const hideError = () => {
    setLoginError(false);
    setErrorMessage("");
  };
  const hideSuccess = () => {
    setActivationSuccess(false);

  }
  const handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    setUser({
      ...user,
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
  
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      Email: user.Email,
      Password: user.Password,
      LogWithPhone: isNaN(parseInt(user.Email)) ? false : true,
    };

    dispatch(loginUser(userData, showError));
  };

  const handleRedirect = (e, value) => {
    !value
      ? history.push("/register")
      : history.push("/login");
  };

  return (
    <Grid
      item
      container
      component="main"
      justify="center"
      className="fadeIn"
      style={{ minHeight: "calc(100vh - 101px)" }}
    >
      <Grid
        item
        container
        justify="center"
        xs={10}
        md={12}
        lg={5}
        component={Paper}
        elevation={6}
        square
      >
        <Grid item sm={10} md={8}>
          <Typography component="h1" className={classes.heading}>
            Welcome Back
          </Typography>
          <Typography>
            Continue to login at HooHoop. Once Logged In you’ll be able to
            manage all your listings and purchases.
          </Typography>
          <Paper square className={classes.tabs}>
            <Tabs
              value={1}
              TabIndicatorProps={{ style: { background: "#000" } }}
              onChange={handleRedirect}
            >
              <Tab label="Register" />
              <Tab label="Login" />
            </Tabs>
          </Paper>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              label="Email Address"
              name="Email"
              autoComplete="email"
              value={user.Email}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              name="Password"
              label="Password"
              type="password"
              value={user.Password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Grid className={classes.split}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Remember"
                    value={user.Remember}
                    color="primary"
                    onChange={handleChange}
                  />
                }
                label="Remember me"
              />
              <NavLink to="/forogot-password">
                <Typography>Forgot Password?</Typography>
              </NavLink>
            </Grid>
            <Button type="submit" className={classes.submit}>
              Login
            </Button>
            <Grid container className={classes.close}>
              <Grid item xs={2}>
                <Divider />
              </Grid>
              <Box ml={2} mr={2}>
                <Typography align="center">or log in with</Typography>
              </Box>
              <Grid item xs={2}>
                <Divider />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <GoogleLoginButton/>
              </Grid>
              <Grid item xs={6}>
                <FacebookLoginButton/>
              </Grid>
            </Grid>
            <Grid>
              

              <Typography align="center">
                Are you a dealer? &nbsp;
                <NavLink to="/register/dealer">Sign Up</NavLink>
              </Typography>
              <Snackbar
                open={loginError}
                autoHideDuration={6000}
                onClose={hideError}
              >
                <Alert onClose={hideError} severity="error">
                  {errorMessage}
                </Alert>
              </Snackbar>
              <Snackbar
                open={activationSuccess}
                autoHideDuration={6000}
                onClose={hideSuccess}
              >
                <Alert onClose={hideSuccess} severity="success">
                  {"Email Activated Successfully"}
                </Alert>
              </Snackbar>
            </Grid>
          </form>
        </Grid>
      </Grid>
      {/* RIGHT BANNER IMAGE */}
      <Grid item md={false} lg={7} className={classes.image} />
    </Grid>
  );

}

export default (SignIn);
