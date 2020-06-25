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

  handleSubmit = e => {
    e.preventDefault()
    
    const userData = {
      Email: this.state.Email,
      Password: this.state.Password,
      LogWithPhone: (isNaN(parseInt(this.state.Email))) ? false : true 
    };
    this.props.loginUser(userData);
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(SignIn);