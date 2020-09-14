import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../actions/authActions";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Tabs,
  Tab,
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
  Button,
  Divider,
  Box,
  Select,
  MenuItem
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import styles from '../assets/material/LoginResgister'

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      cPassword: "",
      Phone: "",
      State: "",
      Role: false,
      DealershipName: "",
      DealershipEmail: "",
      DealershipPhone: "",
      DealershipNZBN: "",
      Errors: [],
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (this.props.match.params.dealer == "dealer") {
      this.setState({
        Role: true,
      });
    }
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();

    //State Contains The Complete New User Data
    this.props.registerUser(this.state, this.props.history);
  };

  handleRedirect = (e, value) => {
    !value
      ? this.props.history.push("/register")
      : this.props.history.push("/login");
  };

  toggle = () => {
    this.setState({
      Role: !this.state.Role,
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <Grid container component="main">
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
          <Grid item xs={8}>
            <Typography component="h1" className={classes.heading}>
              Register at Hoohoop
            </Typography>
            <Typography>
              Register Now to buy or sell car. Earn money by selling cars while sitting at your home.
            </Typography>
            <Paper square className={classes.tabs}>
              <Tabs
                value={0}
                TabIndicatorProps={{style: {background:'#000'}}}
                onChange={this.handleRedirect}
              >
                <Tab label="Register" />
                <Tab label="Login" />
              </Tabs>
            </Paper>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    error = {this.state.FirstName && this.state.FirstName.length < 1}
                    label="First Name"
                    type="text"
                    name="FirstName"
                    value={this.state.FirstName}
                    onChange={this.handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Last Name"
                    type="text"
                    name="LastName"
                    value={this.state.LastName}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <TextField
                required
                type="email"
                label="Email Address"
                name="Email"
                autoComplete="email"
                value={this.state.Email}
                onChange={this.handleChange}
              />
              <TextField
                required
                type="tel"
                name="Phone"
                label="Phone Number"
                value={this.state.Phone}
                onChange={this.handleChange}
              />
              <FormControl className={classes.controller}>
                <InputLabel id="NZ-province">Province</InputLabel>
                <Select
                  required
                  labelId="NZ-province"
                  id="demo-simple-select-outlined"
                  label="Province"
                  name="State"
                  value={this.state.State} 
                  onChange={this.handleChange}
                >
                  <MenuItem><em>Select Province</em></MenuItem>
                  <MenuItem value="Auckland">Auckland</MenuItem>
                  <MenuItem value="Bay of Plenty">Bay of Plenty</MenuItem>
                  <MenuItem value="Northland">Northland</MenuItem>
                  <MenuItem value="Waikato">Waikato</MenuItem>
                  <MenuItem value="Gisborne">Gisborne</MenuItem>
                  <MenuItem value="Hawke's Bay">Hawke's Bay</MenuItem>
                  <MenuItem value="Taranaki">Taranaki</MenuItem>
                  <MenuItem value="Whanganui">Whanganui</MenuItem>
                  <MenuItem value="Manawatu">Manawatu</MenuItem>
                  <MenuItem value="Wairarapa">Wairarapa</MenuItem>
                  <MenuItem value="Wellington">Wellington</MenuItem>
                  <MenuItem value="Nelson Bays">Nelson Bays</MenuItem>
                  <MenuItem value="Marlborough">Marlborough</MenuItem>
                  <MenuItem value="West Coast">West Coast</MenuItem>
                  <MenuItem value="Canterbury">Canterbury</MenuItem>
                  <MenuItem value="Timaru">Timaru</MenuItem>
                  <MenuItem value="Otago">Otago</MenuItem>
                  <MenuItem value="Southland">Southland</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                name="Password"
                label="Password"
                type="password"
                value={this.state.Password}
                onChange={this.handleChange}
              />
              <TextField
                margin="normal"
                required
                name="cPassword"
                label="Confirm Password"
                type="password"
                value={this.state.cPassword}
                onChange={this.handleChange}
              />
              {this.state.Role ? (
                <React.Fragment>
                  <TextField
                    margin="normal"
                    required
                    name="DealershipName"
                    label="Dealership Name"
                    value={this.state.DealershipName}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    name="DealershipEmail"
                    label="Dealership Email"
                    value={this.state.DealershipEmail}
                    onChange={this.handleChange}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        required
                        name="DealershipPhone"
                        label="Deakership Phone"
                        value={this.state.DealershipPhone}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        name="DealershipNZBN"
                        label="Deakership NZBN"
                        value={this.state.DealershipNZBN}
                        onChange={this.handleChange}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              ) : null}
              <Grid className={classes.split}>
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      color="primary"
                    />
                  }
                  label="By creating an account you agree to accept our terms and conditions."
                />
              </Grid>
              <Button type="submit" color="primary" className={classes.submit}>
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
                  <Button className={classes.social}>Google</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button className={classes.social}>Facebook</Button>
                </Grid>
              </Grid>
              <Box mt={2} mb={8}>
                <Typography align="center">
                  Are you a {this.state.Role ? "buyer" : "dealer"}? &nbsp;
                  <NavLink
                    to={this.state.Role ? "/register" : "/register/dealer"}
                    onClick={this.toggle}
                  >
                    Sign Up
                  </NavLink>
                </Typography>
              </Box>
            </form>
          </Grid>
        </Grid>
        {/* RIGHT BANNER IMAGE */}
        <Grid item md={false} lg={7} className={classes.image} />
      </Grid>
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, { registerUser })
)(SignUp);
