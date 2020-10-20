// Dependency
import React, { Fragment } from "react"
import { withRouter, Link } from "react-router"

// Styling
import "../assets/css/footer.scss"

// Images
import Facebook from "../assets/img/svgs/facebook.svg"
import Twitter from "../assets/img/svgs/twitter.svg"
import Instagram from "../assets/img/svgs/instagram.svg"

const Footer = () => {

  const DoNotRenderFooter = () => {
    return window.location.pathname === '/login' || window.location.pathname.includes("/register") || window.location.pathname.includes("/user/")
  }

  return (
    <Fragment>
      {
        (DoNotRenderFooter())
          ?
          null
          :
          (
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
    </Fragment>
  )
}

export default withRouter(Footer)