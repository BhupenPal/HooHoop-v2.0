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
  Box, Snackbar
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import styles from "../assets/material/LoginResgister"
import { Alert } from "@material-ui/lab";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      Password: "",
      Remember: false,
      Errors: null,
      loginError:false,
      errorMessage:""
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        Errors: nextProps.errors,
      });
    }
  }

  showError = (message) => {
    this.setState({ loginError: true, errorMessage: message });
  };
  hideError = () => {
    this.setState({ loginError: false, errorMessage: "" });
  }
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
      LogWithPhone: isNaN(parseInt(this.state.Email)) ? false : true
    };

    this.props.loginUser(userData,this.showError);
  };

  handleRedirect = (e, value) => {
    !value
      ? this.props.history.push("/register")
      : this.props.history.push("/login");
  };

  render() {
    const { classes } = this.props
    const { errorMessage,loginError } = this.state;
    return (
      <Grid container component="main" style={{ minHeight: 'calc(100vh - 101px)' }}>
        <Grid item container justify="center" md={12} lg={5} component={Paper} elevation={6} square>
          <Grid item sm={10} md={8}>
            <Typography component="h1" className={classes.heading}>
              Welcome Back
            </Typography>
            <Typography>
              Continue to login at HooHoop. Once Logged In you’ll be able to manage all your listings and purchases. 
            </Typography>
            <Paper square className={classes.tabs}>
              <Tabs
                value={1}
                TabIndicatorProps={{style: {background:'#000'}}}
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
                  control={<Checkbox name='Remember' value={this.state.Remember} color="primary" onChange={this.handleChange} />}
                  label="Remember me"
                />
                <NavLink to="/forogot-password">
                  <Typography>
                    Forgot Password?
                  </Typography>
                </NavLink>
              </Grid>
              <Button
                type="submit"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container className={classes.close}>
                <Grid item xs={2}><Divider /></Grid>
                <Box ml={2} mr={2}>
                  <Typography align='center'>or log in with</Typography>
                </Box>
                <Grid item xs={2}><Divider /></Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button className={classes.social}>Google</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button className={classes.social}>Facebook</Button>
                </Grid>
              </Grid>
              <Grid>
                <Typography align='center'>
                  Are you a dealer? &nbsp;
                  <NavLink to="/register/dealer">
                    Sign Up
                  </NavLink>
                </Typography>
                <Snackbar open={loginError} autoHideDuration={6000} onClose={this.hideError}>
                    <Alert onClose={this.hideError} severity="error">{errorMessage}</Alert>
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
