import React from 'react';

import GoogleLoginButton from "../Buttons/GoogleLoginButton.jsx";
import FacebookLoginButton from "../Buttons/FacebookLoginButton.jsx";
import styles from "../../assets/material/LoginResgister";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import { useState } from "react";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { loginUser } from '../../redux/actions/authActions.js';

const useStyles = makeStyles(styles)

function Login(props) {
  const [user,setUser] = useState({
    Email:"",
    Password:"",
    Remember:false,
    showPassword: false
  })
  const auth = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const classes  = useStyles();


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

    dispatch(loginUser(userData));
  };

  const handleClickShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const showLoader = () => {
    if(auth.isLoading){
      return <CircularProgress
      className={classes.circularProgress}
      size={20}
      style={{ margin: "0 1rem" }}
    />
    }
  }

  return (
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
      type={user.showPassword ? 'text' : 'password'}
      value={user.Password}
      onChange={handleChange}
      autoComplete="current-password"
      InputProps={{
        endAdornment: (
        <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {user.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
          )
      }}
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
    <Button type="submit" className={classes.submit} 
    disabled={auth.isLoading}
      style={{
      }}
    >
      {showLoader()}
       
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
 
    </Grid>
  </form>
  );
}

export default Login;