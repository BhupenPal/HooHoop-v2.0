import React, { Component } from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import '../assets/css/login.scss'

class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Email: '',
      Password: '',
      Errors: []
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = e => {
    const isCheckbox = e.target.type === 'checkbox'
    this.setState({
      [e.target.name]: isCheckbox
        ? e.target.checked
        : e.target.value
    })
  }

  validate = () => {
    return true
  }

  handleSubmit = e => {
    e.preventDefault()
    const isValid = this.validate()
    if (isValid) {
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    } else {
      console.log(this.state.Errors)
    }
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={this.state.Email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={this.state.Password}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
};



const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(SignIn);