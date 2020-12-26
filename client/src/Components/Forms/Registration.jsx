import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
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
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { NavLink, useHistory, useParams } from "react-router-dom";
import styles from "../../assets/material/LoginResgister";

import {
  invalidPasswordMessage,
  validateEmail,
  validPassword,
} from "../../utils/validations";
import { states } from "../../assets/data/carTypes";
import { useState } from "react";
import { useEffect } from "react";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import GoogleLoginButton from "../Buttons/GoogleLoginButton.jsx";
import FacebookLoginButton from "../Buttons/FacebookLoginButton.jsx";
const useStyles = makeStyles(styles);

function Registration(props) {

  const classes = useStyles();
  const params = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    cPassword: "",
    Phone: "",
    State: "",
    Role: false,
    termsAndConditions: false,
    DealershipName: null,
    DealershipEmail: null,
    DealershipPhone: null,
    DealershipNZBN: null,
  });
  const auth = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    
    if (params.dealer == "dealer") {
      setUser({
        ...user,
        Role: true,
      });
    }
  }, []);



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
      termsAndConditions,
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
    } else if (!termsAndConditions) {
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      //State Contains The Complete New User Data
      dispatch(registerUser(user, history));
    }
  };

  const toggle = () => {
    setUser((user) => ({
      ...user,
      Role: !user.Role,
    }));
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
      <FormControl
        margin="normal"
        variant="outlined"
        error={!!Password && !validPassword(Password)}
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          name="Password"
          label="Password"
          type="password"
          required
          error={!!Password && !validPassword(Password)}
          //helperText={}
          type={showPassword ? "text" : "password"}
          value={user.Password}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((val) => !val)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
        <FormHelperText id="component-error-text">
          {invalidPasswordMessage(Password)}
        </FormHelperText>
      </FormControl>
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
                label="Dealership Phone"
                value={user.DealershipPhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="DealershipNZBN"
                label="Dealership NZBN"
                value={user.DealershipNZBN}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      ) : null}
      <Grid className={classes.split}>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChange}
              name="termsAndConditions"
              checked={user.termsAndConditions}
              required
              color="primary"
            />
          }
          label="By creating an account you agree to accept our terms and conditions."
        />
      </Grid>
      <Button
        type="submit"
        color="primary"
        disabled={!validateForm() || auth.isLoading}
        className={classes.submit}
      > 
        {showLoader()}
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
          {/* <Snackbar open={error} autoHideDuration={6000} onClose={hideError}>
            <Alert onClose={hideError} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar> */}
        </Typography>
      </Box>
    </form>
  );
}

export default Registration;
