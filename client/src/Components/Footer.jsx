import React, { Component } from "react"
import Logo from '../assets/img/logo/Logo.png'
import { withRouter } from "react-router";

class Footer extends Component {
  render() {
    if (this.props.location.pathname === '/login' || this.props.location.pathname === '/register') {
      return null
    }
    return (
      <footer>
        <img src={Logo} alt="" />
      </footer>
    )
  }
}

export default withRouter(Footer)