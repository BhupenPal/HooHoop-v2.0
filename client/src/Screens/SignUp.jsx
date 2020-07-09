import React, { Component } from "react";
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
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Box,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const styles = (theme) => ({
  heading: {
    fontSize: "2.25rem",
    fontWeight: 600,
    margin: theme.spacing(4, 0, 2, 0),
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    height: 40,
    margin: theme.spacing(3, 0, 2, 0),
  },
  tabs: {
    borderBottom: "1px solid #DDDDDD",
    margin: theme.spacing(4, 0, 2, 0),
  },
  split: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  close: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  social: {
    height: 45,
    width: "100%",
    margin: theme.spacing(3, 0, 2, 0),
  },
});

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
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const NewUser = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Password: this.state.Password,
      cPassword: this.state.cPassword,
      Phone: this.state.Phone,
      State: this.state.State,
      Role: this.state.Role,
      DealershipName: this.state.DealershipName,
      DealershipEmail: this.state.DealershipEmail,
      DealershipPhone: this.state.DealershipPhone,
      DealershipNZBN: this.state.DealershipNZBN,
    };

    this.props.registerUser(NewUser, this.props.history);
  };

  handleRedirect = (e, value) => {
    !value
      ? this.props.history.push("/register")
      : this.props.history.push("/login");
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container component="main">
        <Grid
          item
          container
          justify="center"
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Grid item xs={8}>
            <Typography component="h1" className={classes.heading}>
              Register at Hoohoop
            </Typography>
            <Typography>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Accusamus sed dolor vitae.
            </Typography>
            <Paper square className={classes.tabs}>
              <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleRedirect}
              >
                <Tab label="Register" />
                <Tab label="Login" />
              </Tabs>
            </Paper>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
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
              />
              <TextField
                required
                type="number"
                name="Phone"
                label="Phone Number"
                value={this.state.Phone}
                onChange={this.handleChange}
              />
              <TextField
                margin="normal"
                required
                name="Password"
                label="Password"
                type="password"
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
                  label="By creating an account you agree to accept our terms and conditions."
                />
              </Grid>
              <Button
                type="submit"
                color="primary"
                className={classes.submit}
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
                  <Button className={classes.social}>Google</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button className={classes.social}>Facebook</Button>
                </Grid>
              </Grid>
              <Grid>
                <Typography align="center">
                  Are you a dealer? &nbsp;
                  <NavLink to="/register">Sign Up</NavLink>
                </Typography>
              </Grid>
            </form>
          </Grid>
        </Grid>
        {/* RIGHT BANNER IMAGE */}
        <Grid item sm={false} md={7} className={classes.image} />
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
