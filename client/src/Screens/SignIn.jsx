import React, { Component } from "react"
import Logo from '../assets/img/logo/Logo.png'
import '../assets/css/login.scss'
import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return ( 
        <div className="login-wrapper">
          <div className="login-card">
          <form>
            <div className="logo"><img src={Logo}/></div>
            <div className="input-type-alpha">
              <input type="email" name="Email" placeholder="Email" />
              <input type="password" name="Password" placeholder="Password" />
            </div>
            <div className="forgot-password-link">
              <Link to="/forgot-password" className="link">
                <div>Forgot Password ?</div>
              </Link>
            </div>
            <div className="signup-link"></div>
            <div className="form-submitter login-btn"><button type="submit">Login</button></div>
          </form>
        </div>
        </div>
    )
  }
}

export default Home