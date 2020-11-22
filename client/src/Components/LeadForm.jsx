import {
  Box,
  Button,
  makeStyles,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { FacebookProvider, Share } from "react-facebook";
import ShareLink from "react-twitter-share-link";
import React from "react";
import { useHistory } from "react-router-dom";
import CheckIcon from '@material-ui/icons/Check';
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "../assets/img/svgs/facebook_white.svg";
import { LockOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { showLoginModel } from "../utils/showLoginModel";

//import {FacebookShareButton, TwitterShareButton} from "react-share";
const useStyles = makeStyles((theme) => ({
  boxContainer: {
    backgroundColor: "#fff",
    width: "-webkit-fill-available",
    padding: "1rem",
    margin: "1rem",
    height: "fit-content",
    borderRadius:"5px",
    [theme.breakpoints.down("md")]: {
      padding: "1rem",
      margin: "1rem 0",
    },
  },
  options: {
    border: "1px solid #708DC7",
    color: "#708DC7",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    marginTop: "1rem",
  },
  optionLabel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0.3rem 0.8rem",
  },
  optionMark: {
    border: "2px solid #708DC7",
    height: "1rem",
    width: "1rem",
    borderRadius: "200rem",
  },
  optionCheckMark: {
    border: "2px solid #fff",
    // boxShadow:"-0.1rem -0.1rem  0.5rem #fff"
  },
  checked: {
    backgroundColor: "#708DC7",
    color: "#fff",
  },
  shareButton: {
    height: "2.5rem",
    width: "2.5rem",
    borderRadius: "200rem",
    margin: "0 1rem 0 0",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  shareContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  facebookButton: {
    backgroundColor: "#3B599A",
  },
  twitterButton: {
    backgroundColor: "#71BBFF",
  },
}));

function LeadForm({ handleChange, handleCheckboxChange, user, handleSubmit }) {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(history);
  //console.log(process.env.FB_APP_ID);
  const renderLock = () => {
    if(!isAuthenticated){
      return (
        <div 
        onClick={showLoginModel}
        style={{
          position:"absolute",
          width:"100%",
          height:"100%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          zIndex:10
        }}>
            <LockOutlined style={{fontSize:"10rem"}}/>
        </div>
      )
    }
  }
  return (
    <>
      <div className={`${classes.boxContainer} ${classes.shareContainer}`}>
        <div>Share This Deal</div>
        <div style={{ display: "flex" }}>
          <FacebookProvider appId={process.env.FB_CLIENT_ID}>
            <Share
              href={`${process.env.PUBLIC_URL}${history.location.pathname}`}
            >
              {({ handleClick, loading }) => (
                <button
                  className={`${classes.shareButton} ${classes.facebookButton}`}
                  type="button"
                  disabled={loading}
                  onClick={handleClick}
                >
                  <img height="20rem" src={FacebookIcon} alt="" />
                </button>
              )}
            </Share>
          </FacebookProvider>

          <ShareLink
            link={`${process.env.PUBLIC_URL}${history.location.pathname}`}
          >
            {(link) => (
              <a href={link} target="_blank">
                <button
                  className={`${classes.shareButton} ${classes.twitterButton}`}
                  type="button"
                >
                  <TwitterIcon />
                </button>
              </a>
            )}
          </ShareLink>
        </div>
      </div>
      <div className={classes.boxContainer}>
        <div style={{fontSize:"1.2rem"}}>Interested in this Car?</div>
        <div>Request a call!</div>
        <div style={{position:"relative"}}>
        {renderLock()}
        <form
          disabled
          onSubmit={handleSubmit}
          style={{ filter: !isAuthenticated ? "blur(10px)" : "none" }}
        >

          <TextField
            onChange={handleChange}
            name={"FullName"}
            value={user.FullName}
            label="Enter Name"
          />
          <TextField
            onChange={handleChange}
            name={"Phone"}
            value={user.Phone}
            label="Enter Phone No."
          />
          <Box mt={5}>
            <div
              className={`${classes.options} ${
                user.CallbackQuery ? classes.checked : ""
              }`}
            >
              <input
                type="checkbox"
                id="Contact Seller"
                style={{ display: "none" }}
                name="CallbackQuery"
                onChange={handleCheckboxChange}
              />
              <label className={classes.optionLabel} htmlFor="Contact Seller">
                <div>Contact Seller</div>
                <div>
                  {
                    user.CallbackQuery ?
                    (
                      <CheckIcon/>
                    ):(
                      <div className={`${classes.optionMark}`} />
                    )
                  }
                </div>
              </label>
            </div>
            <div
              className={`${classes.options} ${
                user.TestDriveQuery ? classes.checked : ""
              }`}
            >
              <input
                type="checkbox"
                id="Book A Test Drive"
                style={{ display: "none" }}
                name="TestDriveQuery"
                onChange={handleCheckboxChange}
              />
              <label
                className={classes.optionLabel}
                htmlFor="Book A Test Drive"
              >
                <div>Book A Test Drive</div>
                <div>
                  
                  {
                    user.TestDriveQuery ?
                    (
                      <CheckIcon/>
                    ):(
                      <div className={`${classes.optionMark}`} />
                    )
                  }
                </div>
              </label>
            </div>
            <div
              className={`${classes.options} ${
                user.ShipmentQuery ? classes.checked : ""
              }`}
            >
              <input
                type="checkbox"
                id="Shipping Query"
                style={{ display: "none" }}
                name="ShipmentQuery"
                onChange={handleCheckboxChange}
              />
              <label className={classes.optionLabel} htmlFor="Shipping Query">
                <div>Shipping Quote</div>
                <div>
                  {
                    user.ShipmentQuery ?
                    (
                      <CheckIcon/>
                    ):(
                      <div className={`${classes.optionMark}`} />
                    )
                  }
                </div>
              </label>
            </div>
          </Box>
          <Box mt={5}>
            <Button onClick={handleSubmit} variant="outlined">Submit</Button>
          </Box>
        </form>
        </div>
      </div>
    </>
  );
}

export default LeadForm;
