import React, { Component } from "react"
import Logo from '../assets/img/logo/Logo.png'

class Footer extends Component {
  render() {
    return ( 
      <footer>
        <img src={Logo} style={{height: "2rem"}} alt=""/>
      </footer>
    )
  }
}

export default Footer