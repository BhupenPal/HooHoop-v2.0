import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import SideBar from "../Components/Sidebar.jsx";
import { makeStyles, Typography } from "@material-ui/core";
import { getProfile } from "../services/profile";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "2rem 0",
  },
  userDetails: {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    width: "80%",
    margin: "0 auto",
    padding: "2rem",
    borderRadius: 5,
    boxSizing: "border-box",
    backgroundColor:"#fff",

  },
  userImage: {
    height: "7.5rem",
    width: "7.5rem",
    borderRadius: 10,
    margin: "1rem",
  },
  user: {
    display: "flex",
  },
  userInfo: {
    paddingTop: "1.5rem",
  },
  userContacts: {
    display: "flex",
    justifyContent: "space-between",
  },
  userContact: {
    flex: 1,
    padding: "1rem 2rem",
  },
  contactHeading: {
    marginBottom: "1rem",
    position: "relative",
    "&::before": {
      position: "absolute",
      top: "100%",
      left: 6,
      content: "''",
      backgroundColor: "#000",
      height: "0.2rem",
      width: "3rem",
    },
  },
  dob: {
    fontSize: "0.9rem",
    marginTop: "0.2rem",
  },
  otherOptions: {
    width: "80%",
    margin: "2rem auto",
    display: "flex",
    justifyContent: "space-between",
  },
  walletCard: {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
   // minHeight: "15rem",
    width: "48%",
    margin: "1rem",
    padding: "2rem",
    backgroundColor:"#fff",

  },
  walletCredits: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem 0",

  },
  sign:{
    fontWeight:500,
  },
  amount:{
    fontSize:"4rem",
    margin:0,
    fontWeight:500,
    padding:"0 0.5rem",
    lineHeight:"4rem"
  },
  
  walletActions : {
    textAlign:"center"
  },
  walletButton: {
    margin: "0 1rem",
    backgroundColor:"#fff",
    color:"#708DC7",
    border:"1px solid #708DC7",
    padding:"0.2rem 1rem",
    borderRadius:"0.5rem"
  },
  buttonPrimary:{
    background: "linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)",
    margin: "0 1rem",
    color:"#fff",
    border:"none",
    padding:"0.2rem 2rem",
    borderRadius:"0.5rem"
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  // const Logout = () => {
  //   this.props.logoutUser();
  // };
  useEffect(() => {
    getProfile()
      .then((profile) => {
        setProfile(profile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const user = {
    imgUrl: "https://avatars1.githubusercontent.com/u/31372005",
    firstName: "Bhupen",
    lastName: "Pal",
    dob: "19 July 2000",
    address: "513 Om Apartments Sector-3, Plot 5, Dwarka, New Delhi",
    email: ["bhupen.pal16@gmail.com"],
    phone: ["+91 9395XXXX56"],
  };
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      {/* Dashboard
          <button onClick={this.Logout}>Logout</button>
           */}

      <div className={classes.root}>
        <div className={classes.userDetails}>
          <div className={classes.user}>
            <div>
              <img className={classes.userImage} src={user.imgUrl} alt="user" />
            </div>
            <div className={classes.userInfo}>
              <h2>{`${profile.FirstName} ${profile.LastName}`}</h2>
              <p className={classes.dob}>
                <span style={{ color: "rgba(0,0,0,0.6)" }}>Born on : </span>
                {profile.DOB ? profile.DOB : "N/A"}
              </p>
            </div>
          </div>
          <div className={classes.userContacts}>
            <div className={classes.userContact}>
              <Typography variant="h4" className={classes.contactHeading}>
                Address
              </Typography>
              <div>{profile.Address ? profile.Address : "N/A"}</div>
            </div>
            <div className={classes.userContact}>
              <Typography variant="h4" className={classes.contactHeading}>
                Email Address
              </Typography>
              <div>
                  <p>{profile.Email}</p>
                
              </div>
            </div>
            <div className={classes.userContact}>
              <Typography variant="h4" className={classes.contactHeading}>
                Phone Number
              </Typography>
              <div>
                <p>{profile.Phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.otherOptions}>
          <div className={classes.walletCard}>
            <Typography variant="h4">Your HoopHoop Wallet</Typography>
            <div className={classes.walletCredits}>
              <div className={classes.sign}>$</div>
              <div className={classes.amount}>{profile.Credits}</div>
            </div>
            <div className={classes.walletActions}>
              <button className={classes.walletButton }>Add money</button>
              <button className={classes.buttonPrimary}>Sell Car</button>

            </div>
          </div>
          <div className={classes.walletCard}></div>
        </div>
      </div>
    </main>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
