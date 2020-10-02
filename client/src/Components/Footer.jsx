import React, { Component } from "react"
import Logo from '../assets/img/logo/Logo.png'
import { withRouter } from "react-router";
import "../assets/css/footer.scss";
import Facebook from "../assets/img/svgs/facebook.svg";
import Twitter from "../assets/img/svgs/twitter.svg";
import Instagram from "../assets/img/svgs/instagram.svg";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    if (this.props.location.pathname === '/login' || this.props.location.pathname === '/register' || this.props.location.pathname.includes("/user/")) {
      return null
    }
    return (
      <footer className="footer">
        
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
        <div>
          <Link to="/about-us">About Us</Link>
        </div>
        <div>
          <Link to="/faq">FAQ</Link>
        </div>
        <div>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
        <div>
          <Link to="/terms-and-conditions"> Terms of Use </Link>
        </div>
        <p className="footer__copyrights">Copyright &copy; HoopHoop.co.nz</p>

      </footer>
    )
  }
}

export default withRouter(Footer)