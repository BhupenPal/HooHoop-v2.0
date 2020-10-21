import React, { Component } from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
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
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import styles from "../assets/material/LoginResgister";
import { Alert } from "@material-ui/lab";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLoginService, FacebookLoginService } from "../services/OAuthLogin";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      Password: "",
      Remember: false,
      Errors: null,
      loginError: false,
      errorMessage: "",
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/user/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/user/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        Errors: nextProps.errors,
      });
    }
  }
  googleLogin = async (authResult) => {
    try {
      console.log(authResult)
      if (authResult['tokenId']) {
        const result = await GoogleLoginService(authResult['tokenId']);
        props.login(result);
      } else {
        throw new Error(authResult);
      }
    } catch (error) {
      console.log(error);
    }
  }
  FacebookLogin = async (authResult) => {
    console.log(authResult)
    try {
      if (authResult['accessToken'] && authResult['userID']) {
        const result = await FacebookLoginService(authResult['accessToken'], authResult['userID']);
        props.login(result)
      } else {
        throw new Error(authResult)
      }
    } catch (error) {
      console.log(error)
    }
  }
  showError = (message) => {
    this.setState({ loginError: true, errorMessage: message });
  };
  hideError = () => {
    this.setState({ loginError: false, errorMessage: "" });
  };
  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      Email: this.state.Email,
      Password: this.state.Password,
      LogWithPhone: isNaN(parseInt(this.state.Email)) ? false : true,
    };

    this.props.loginUser(userData, this.showError);
  };

  handleRedirect = (e, value) => {
    !value
      ? this.props.history.push("/register")
      : this.props.history.push("/login");
  };

  render() {
    const { classes } = this.props;
    const { errorMessage, loginError } = this.state;
    return (
      <Grid
        item
        container
        component="main"
        justify="center"
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
                onChange={this.handleRedirect}
              >
                <Tab label="Register" />
                <Tab label="Login" />
              </Tabs>
            </Paper>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                margin="normal"
                required
                label="Email Address"
                name="Email"
                autoComplete="email"
                value={this.state.Email}
                onChange={this.handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                name="Password"
                label="Password"
                type="password"
                value={this.state.Password}
                onChange={this.handleChange}
                autoComplete="current-password"
              />
              <Grid className={classes.split}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Remember"
                      value={this.state.Remember}
                      color="primary"
                      onChange={this.handleChange}
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
                  <GoogleLogin
                    clientId={process.env.GOOGLE_CLIENT_ID}
                    responseType={"id_token"}
                    render={(renderProps) => (
                      <Button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className={classes.social}
                      >
                        Google
                      </Button>
                    )}
                    scope={[
                      'email',
                      'profile',
                      'openid',
                      'https://www.googleapis.com/auth/user.gender.read',
                      'https://www.googleapis.com/auth/user.birthday.read',
                      'https://www.googleapis.com/auth/user.phonenumbers.read'
                    ].join(" ")}
                    // uxMode="redirect"
                    onSuccess={this.googleLogin}
                    onFailure={this.googleLogin}
                    cookiePolicy={"single_host_origin"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FacebookLogin
                    appId={process.env.FB_CLIENT_ID}
                    render={(renderProps) => (
                      <Button
                        onClick={renderProps.onClick}
                        className={classes.social}
                      >
                        Facebook
                      </Button>
                    )}
                    scope={[
                      'public_profile', 
                      'email',
                      'user_birthday',
                      'user_gender',
                      'user_location',
                    ].join(' ')}
                    callback={this.FacebookLogin}
                  />
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
                  onClose={this.hideError}
                >
                  <Alert onClose={this.hideError} severity="error">
                    {errorMessage}
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
}

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, { loginUser })
)(SignIn);
