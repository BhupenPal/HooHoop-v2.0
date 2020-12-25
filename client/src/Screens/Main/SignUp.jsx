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
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { NavLink, useHistory, useParams } from "react-router-dom";
import styles from "../../assets/material/LoginResgister";
import { Alert } from "@material-ui/lab";

import GoogleLoginButton from "../../Components/Buttons/GoogleLoginButton.jsx";
import FacebookLoginButton from "../../Components/Buttons/FacebookLoginButton.jsx";

import {
  invalidPasswordMessage,
  validateEmail,
  validPassword,
} from "../../utils/validations";
import { registerUser } from "../../redux/actions/authActions";
import { states } from "../../assets/data/carTypes";
import { useState } from "react";
import { useEffect } from "react";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Registration from "../../Components/Forms/Registration.jsx";

const useStyles = makeStyles(styles);
const SignUp = (props) => {
  const history = useHistory();
  const classes = useStyles();
 
  const auth = useSelector((store) => store.auth);
  
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/user/dashboard");
    }
  }, []);


  const handleRedirect = (e, value) => {
    !value ? history.push("/register") : history.push("/login");
  };

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
          <Registration/>
          
          </Grid>
      </Grid>
      {/* RIGHT BANNER IMAGE */}
      <Grid item md={false} lg={7} className={classes.image} />
    </Grid>
  );
};
export default SignUp;
