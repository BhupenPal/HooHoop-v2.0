import React, { Component } from "react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { registerUser } from '../actions/authActions'
import '../assets/css/register.scss'

class SignUp extends Component {

  constructor(props) {
    super (props)

    this.state = {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      cPassword: '',
      Phone: '',
      Address: '',
      Role: false,
      DealershipName: '',
      DealershipEmail: '',
      DealershipPhone: '',
      DealershipNZBN: '',
      Errors: []
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
    this.setState({ Errors: [] })

    if(!this.state.FirstName) {
      this.setState({ Errors : [...this.state.Errors, 'First Name is required']})
    }

    if(!this.state.LastName) {
      this.setState({ Errors : [...this.state.Errors, 'Last Name is required']})
    }

    return false
  }

  handleSubmit = e => {
    e.preventDefault()
    const isValid = this.validate()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
this.props.registerUser(newUser, this.props.history); 

    
    if(isValid){
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
  this.props.registerUser(newUser, this.props.history); 
    } else {
      console.log(this.state.Errors)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text"
          name="FirstName"
          placeholder="First Name"
          value={this.state.FirstName}
          onChange={this.handleChange}
        />
        <input 
          type="text"
          name="LastName"
          placeholder="Last Name"
          value={this.state.LastName}
          onChange={this.handleChange}
        />
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
        <input 
          type="password"
          name="cPassword"
          placeholder="Confirm Password"
          value={this.state.cPassword}
          onChange={this.handleChange}
        />
        <input 
          type="number"
          name="Phone"
          placeholder="Phone Number"
          value={this.state.Phone}
          onChange={this.handleChange}
        />
        <input 
          type="checkbox"
          name="Role"
          checked={this.state.Role}
          onChange={this.handleChange}
        />
        <input 
          type="text"
          name="DealershipName"
          placeholder="Dealership Name"
          value={this.state.DealershipName}
          onChange={this.handleChange}
        />
        <input 
          type="text"
          name="DealershipEmail"
          placeholder="Dealership Email"
          value={this.state.DealershipEmail}
          onChange={this.handleChange}
        />
        <input 
          type="text"
          name="DealershipPhone"
          placeholder="Dealership Phone"
          value={this.state.DealershipPhone}
          onChange={this.handleChange}
        />
        <input 
          type="text"
          name="DealershipNZBN"
          placeholder="Dealership NZBN"
          value={this.state.DealershipNZBN}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));