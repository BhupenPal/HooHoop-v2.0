import React, { Component } from "react"
import '../assets/css/register.scss'

class SignUp extends Component {
  render() {
    return ( 
        <div className="signup-wrapper">
          <div className="signup-card">
            <h1>Register</h1>
            <form>
              <div className="form-inp-container">
                <input type="text" name="FirstName" placeholder="First Name"/>
                <input type="text" name="LastName" placeholder="Last Name"/>
                <input type="email" name="Email" placeholder="Email"/>
                <input type="password" name="Password" placeholder="Password"/>
                <input type="password" name="Cpassword" placeholder="Confirm Password"/>
                <input type="number" name="Phone" placeholder="Phone Number"/>
                <input type="text" name="Address" placeholder="Address"/>
                <div className="role-container">
                  <label htmlFor="admin">Admin</label>
                  <input type="radio" name="Role" id="admin"/>
                  <label htmlFor="dealer">Dealer</label>
                  <input type="radio" name="Role" id="dealer"/>
                  <label htmlFor="user">User</label>
                  <input type="radio" name="Role" id="user"/>
                </div>
                <div className="submit-btn"><button type="submit">Submit</button></div>
              </div>
            </form>
          </div>
        </div>
    )
  }
}

export default SignUp