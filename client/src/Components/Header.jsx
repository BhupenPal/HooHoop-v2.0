import React, { Component } from "react"
import Logo from '../assets/img/logo/Logo.png'
import { NavLink } from 'react-router-dom'

class Header extends Component {
  render() {
    return ( 
      <header>
        <img className="head-logo" src={Logo} alt=""/>
        <div className="route-btn">
        <NavLink to='/login'>
        <button>Login</button>
        </NavLink>
        <NavLink to='/register'>
        <button>Signup</button>
        </NavLink>
        </div>
      </header>
    )
  }
}

export default Header