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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const styles = () => ({
  root: {
    backgroundColor: "white",
    justifyContent: "center",
  },
  options: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    width: 80,
    height: 2,
    backgroundColor: "#999999",
    margin: 30
  },
  loginHead: {
    fontSize: "2.25rem",
    fontWeight: 600,
    marginTop: 30,
  },
  loginSubHead: {
    fontSize: "13.5px",
    marginTop: 10,
    marginBottom: 30,
  },
  redirectTabs: {
    borderBottom: "1px solid #DDDDDD",
    marginBottom: 40,
  },
  inputFields: {
    marginBottom: 20,
  },
  loginButtons: {
    height: 45,
    color: "#000",
    fontSize: 13.5,
  },
  socialButtons: {
    height: 45,
    width: '48%',
    marginBottom: 20
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      Password: "",
      Remember: false,
      Errors: null,
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
    this.props.loginUser(userData);
  };

  handleRedirect = (e, value) => {
    !value
      ? this.props.history.push("/register")
      : this.props.history.push("/login");
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        {/* LEFT CONTAINER (LOGIN) */}
        <Grid item container className={classes.root} sm={12} md={5}>
          {/* CENTERED GRID */}
          <Grid item sm={8}>
            <Typography className={classes.loginHead}>Welcome Back</Typography>
            <Typography className={classes.loginSubHead}>
              lorem ipsum dolor set ami lorem ipsum dolor set ami.
            </Typography>

            <Paper square className={classes.redirectTabs}>
              <Tabs
                value={1}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleRedirect}
              >
                <Tab label="Register" />
                <Tab label="Login" />
              </Tabs>
            </Paper>

            <form onSubmit={this.handleSubmit}>
              <TextField
                className={classes.inputFields}
                fullWidth
                label="Email"
                type="email"
                name="Email"
                value={this.state.Email}
                onChange={this.handleChange}
              />
              <TextField
                className={classes.inputFields}
                fullWidth
                label="Password"
                type="password"
                name="Password"
                value={this.state.Password}
                onChange={this.handleChange}
              />
              <Grid className={classes.inputFields}>
                <FormGroup row className={classes.options}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Remember}
                        onChange={this.handleChange}
                        name="Remember"
                        color="primary"
                      />
                    }
                    label="Remember Me"
                  />
                  <NavLink to="/register">Forgot Password?</NavLink>
                </FormGroup>
              </Grid>
              <Button className={classes.loginButtons} fullWidth type="submit">
                Login
              </Button>
            </form>
            <Grid container alignItems="center" justify="center">
              <Grid item className={classes.divider} sm={2} />
              <Typography>or log in with</Typography>
              <Grid item className={classes.divider} sm={2} />
            </Grid>
            <Grid container justify='space-between'>
              <Button type="submit" className={classes.socialButtons}>Google</Button>
              <Button type="submit" className={classes.socialButtons}>Facebook</Button>
            </Grid>
            <Grid>
              <Typography align='center'>
              Are you a dealer? <NavLink to="/register">Sign Up</NavLink>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid>IDHAR IMAGE HOGI</Grid>
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
