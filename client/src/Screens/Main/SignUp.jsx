import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Tabs,
  Tab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Checkbox,
  Button,
  Divider,
  Box,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { NavLink, useHistory, useParams } from "react-router-dom";
import styles from "../../assets/material/LoginResgister";
import { Alert } from "@material-ui/lab";

import GoogleLoginButton from "../../Components/Buttons/GoogleLoginButton.jsx";
import FacebookLoginButton from "../../Components/Buttons/FacebookLoginButton.jsx";

import { validateEmail, validPassword } from "../../utils/validations";
import { registerUser } from "../../redux/actions/authActions";
import { states } from "../../assets/data/carTypes";
import { useState } from "react";
import { useEffect } from "react";

const useStyles = makeStyles(styles);
const SignUp = (props) => {
  const params = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    cPassword: "",
    Phone: "",
    State: "",
    Role: false,
    DealershipName: null,
    DealershipEmail: null,
    DealershipPhone: null,
    DealershipNZBN: null,
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/user/dashboard");
    }
    if (params.dealer == "dealer") {
      setUser({
        ...user,
        Role: true,
      });
    }
  }, []);
  const showError = (message) => {
    setError(true);
    setErrorMessage(message);
  };
  const hideError = () => {
    setError(false);
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    setUser({
      ...user,
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  const validateForm = () => {
    const {
      FirstName,
      LastName,
      Email,
      Password,
      cPassword,
      Phone,
      State,
    } = user;
    if (!FirstName || FirstName.length < 1) {
      return false;
    } else if (!LastName || LastName.length < 1) {
      return false;
    } else if (!Email || !validateEmail(Email)) {
      return false;
    } else if (!Password || !validPassword(Password)) {
      return false;
    } else if (cPassword !== Password) {
      return false;
    } else if (!Phone || Phone.length !== 10) {
      return false;
    } else if (!states.includes(State)) {
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      //State Contains The Complete New User Data
      dispatch(registerUser(user, showError, history));
    }
  };

  const handleRedirect = (e, value) => {
    !value ? history.push("/register") : history.push("/login");
  };

  const toggle = () => {
    setUser((user) => ({
      ...user,
      Role: !user.Role,
    }));
  };
  const {
    FirstName,
    LastName,
    Email,
    Password,
    cPassword,
    Phone,
    State,
  } = user;
  return (
    <Grid container component="main" className="fadeIn">
      <Grid
        item
        container
        justify="center"
        md={12}
        lg={5}
        component={Paper}
        elevation={6}
        square
      >
        <Grid item xs={10} md={8}>
          <Typography component="h1" className={classes.heading}>
            Register at Hoohoop
          </Typography>
          <Typography>
            Register Now to buy or sell car. Earn money by selling cars while
            sitting at your home.
          </Typography>
          <Paper square className={classes.tabs}>
            <Tabs
              value={0}
              TabIndicatorProps={{ style: { background: "#000" } }}
              onChange={handleRedirect}
            >
              <Tab label="Register" />
              <Tab label="Login" />
            </Tabs>
          </Paper>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  label="First Name"
                  type="text"
                  name="FirstName"
                  value={FirstName}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  label="Last Name"
                  type="text"
                  name="LastName"
                  value={LastName}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <TextField
              required
              error={!!Email && !validateEmail(Email)}
              helperText={Email && !validateEmail(Email) && "Invalid Email"}
              type="email"
              label="Email Address"
              name="Email"
              autoComplete="email"
              value={Email}
              onChange={handleChange}
            />
            <TextField
              required
              error={!!Phone && Phone.length !== 10}
              type="number"
              name="Phone"
              label="Phone Number"
              value={Phone}
              onChange={handleChange}
            />
            <FormControl className={classes.controller}>
              <InputLabel id="NZ-province">Province</InputLabel>
              <Select
                required
                labelId="NZ-province"
                id="demo-simple-select-outlined"
                label="Province"
                name="State"
                value={State}
                onChange={handleChange}
              >
                <MenuItem>
                  <em>Select Province</em>
                </MenuItem>
                {states.map((state, index) => (
                  <MenuItem key={index} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              error={!!Password && !validPassword(Password)}
              name="Password"
              label="Password"
              type="password"
              value={user.Password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              error={!!cPassword && cPassword !== Password}
              required
              name="cPassword"
              label="Confirm Password"
              type="password"
              value={user.cPassword}
              onChange={handleChange}
            />
            {user.Role ? (
              <React.Fragment>
                <TextField
                  margin="normal"
                  required
                  name="DealershipName"
                  label="Dealership Name"
                  value={user.DealershipName}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  name="DealershipEmail"
                  label="Dealership Email"
                  value={user.DealershipEmail}
                  onChange={handleChange}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      name="DealershipPhone"
                      label="Deakership Phone"
                      value={user.DealershipPhone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      name="DealershipNZBN"
                      label="Deakership NZBN"
                      value={user.DealershipNZBN}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : null}
            <Grid className={classes.split}>
              <FormControlLabel
                control={<Checkbox required color="primary" />}
                label="By creating an account you agree to accept our terms and conditions."
              />
            </Grid>
            <Button
              type="submit"
              color="primary"
              className={classes[validateForm() ? "active" : "submit"]}
            >
              Create Account
            </Button>
            <Grid container className={classes.close}>
              <Grid item xs={2}>
                <Divider />
              </Grid>
              <Box ml={2} mr={2}>
                <Typography align="center">or sign up with</Typography>
              </Box>
              <Grid item xs={2}>
                <Divider />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <GoogleLoginButton />
              </Grid>
              <Grid item xs={6}>
                <FacebookLoginButton />
              </Grid>
            </Grid>
            <Box mt={2} mb={8}>
              <Typography align="center">
                Are you a {user.Role ? "buyer" : "dealer"}? &nbsp;
                <NavLink
                  to={user.Role ? "/register" : "/register/dealer"}
                  onClick={toggle}
                >
                  Sign Up
                </NavLink>
                <Snackbar
                  open={error}
                  autoHideDuration={6000}
                  onClose={hideError}
                >
                  <Alert onClose={hideError} severity="error">
                    {errorMessage}
                  </Alert>
                </Snackbar>
              </Typography>
            </Box>
          </form>
        </Grid>
      </Grid>
      {/* RIGHT BANNER IMAGE */}
      <Grid item md={false} lg={7} className={classes.image} />
    </Grid>
  );
};
export default SignUp;
