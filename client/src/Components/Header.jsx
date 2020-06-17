import React, { Component } from "react"
import Logo from '../assets/img/logo/Logo.png'
import { NavLink } from 'react-router-dom'

class Header extends Component {
  render() {
    return ( 
      <header>
        <img src={Logo} alt=""/>
        <NavLink to='/login'>
        <button>Login</button>
        </NavLink>
        <button>Signup</button>
      </header>
    )
  }
}

export default Header