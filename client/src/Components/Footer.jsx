// Dependency
import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

// Styling
import "../assets/css/footer.scss";

// Images
import Facebook from "../assets/img/svgs/facebook.svg";
import LinkedIn from "../assets/img/svgs/linkedin.svg";
import Instagram from "../assets/img/svgs/instagram.svg";

const Footer = () => {
  const DoNotRenderFooter = () => {
    return (
      window.location.pathname === "/login" ||
      window.location.pathname.includes("/register") ||
      window.location.pathname.includes("/user/") ||
      window.location.pathname.includes(500) ||
      window.location.pathname.includes(400)
    );
  };

  return (
    <Fragment>
      {DoNotRenderFooter() ? null : (
        <footer className="footer">
          <div className="footer__follow-us">
            <p>Follow us on</p>
            <span className="footer__logo">
              <a href="https://www.facebook.com/HooHoopNZ/" target="_blank">
                <img src={Facebook} height={"12rem"} />
              </a>
            </span>
            <span className="footer__logo">
              <a
                href="https://www.linkedin.com/company/hoohoop-limited-nz"
                target="_blank"
              >
                <img src={LinkedIn} height={"12rem"} />
              </a>
            </span>
            <span className="footer__logo">
              <a
                href="https://instagram.com/hoohoopnz?igshid=43art0hn3v5n"
                target="_blank"
              >
                <img src={Instagram} height={"12rem"} />
              </a>
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
            <Link to="/terms-and-conditions">Terms of Use</Link>
          </div>
          <div>
            <Link to="/cancellation-policy">Cancellation Policy</Link>
          </div>
          <div>
            <Link to="/contact-us">Contact Us</Link>
          </div>
          <div className="footer__copyrights">
            <p>
              &copy; {new Date().getFullYear()} by HoopHoop.co.nz
            </p>
            {/* <p className="">Powered By Grey Dot Solutions</p>  */}
          </div>
        </footer>
      )}
    </Fragment>
  );
};

export default withRouter(Footer);
