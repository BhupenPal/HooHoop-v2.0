import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { registerUser } from '../actions/authActions'

class SignUp extends Component {

  constructor(props) {
    super(props)

    this.state = {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      cPassword: '',
      Phone: '',
      State: '',
      Role: false,
      DealershipName: '',
      DealershipEmail: '',
      DealershipPhone: '',
      DealershipNZBN: '',
      Errors: []
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
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
      DealershipNZBN: this.state.DealershipNZBN
    }

    this.props.registerUser(NewUser, this.props.history)
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
        <select
          name="State"
          value={this.state.State}
          onChange={this.handleChange}
        >
          <option value='' defaultValue disabled>Select State</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
          <option value="Daman and Diu">Daman and Diu</option>
          <option value="Delhi">Delhi</option>
          <option value="Lakshadweep">Lakshadweep</option>
          <option value="Puducherry">Puducherry</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>
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