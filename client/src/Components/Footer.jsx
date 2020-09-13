import React, { Component } from "react"
import Logo from '../assets/img/logo/Logo.png'
import { withRouter } from "react-router";
import "../assets/css/footer.scss";
import Facebook from "../assets/img/svgs/facebook.svg";
import Twitter from "../assets/img/svgs/twitter.svg";
import Instagram from "../assets/img/svgs/instagram.svg";

class Footer extends Component {
  render() {
    if (this.props.location.pathname === '/login' || this.props.location.pathname === '/register') {
      return null
    }
    return (
      <footer className="footer">
        <div>
        <div className="footer__follow-us">
          <p>Follow us on</p>
          <span className="footer__logo">
            <img src={Facebook} />
          </span>
          <span className="footer__logo">
            <img src={Twitter} />
          </span>
          <span className="footer__logo">
            <img src={Instagram} />
          </span>
        </div>
        <p className="footer__copyrights">Copyright &copy; HoopHoop.co.nz</p>
        </div>
        <div>
          About Us
        </div>
        <div>
          FAQ
        </div>
        <div>
          Privacy Policy
        </div>
        <div>
          Terms of Use
        </div>
      </footer>
    )
  }
}

export default withRouter(Footer)