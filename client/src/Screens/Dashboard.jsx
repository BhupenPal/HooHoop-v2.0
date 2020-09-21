import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import SideBar from "../Components/Sidebar.jsx";
import { makeStyles, Typography } from "@material-ui/core";

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
    display:"flex",
    justifyContent:"space-between",
  },
  userContact:{
    flex:1,
    padding:"1rem 2rem",
    
  },
  contactHeading:{
    marginBottom:"1rem",
    position:"relative",
    "&::before":{
      position:"absolute",
      top:"100%",
      left:6,
      content: "''",
      backgroundColor: "#000",
      height:"0.2rem",
      width:"3rem",
    }
  },
  dob:{
    fontSize:"0.9rem",
    marginTop:"0.2rem"
  },
  otherOptions:{
    width: "80%",
    margin: "2rem auto",
    display:"flex",
    justifyContent:"space-between"
  },
  walletCard:{
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    minHeight:"20rem",
    width:"48%",
    margin:"1rem"
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const Logout = () => {
    this.props.logoutUser();
  };
  const user = {
    imgUrl: "https://avatars1.githubusercontent.com/u/31372005",
    firstName: "Bhupen",
    lastName: "Pal",
    dob: "19 July 2000",
    address: "513 Om Apartments Sector-3, Plot 5, Dwarka, New Delhi",
    email: ["bhupen.pal16@gmail.com"],
    phone: ["+91 9395XXXX56"],
  };
  return (
    <main>
      <SideBar>
        {/* Dashboard
          <button onClick={this.Logout}>Logout</button>
           */}

        <div className={classes.root}>
          <div className={classes.userDetails}>
            <div className={classes.user}>
              <div>
                <img
                  className={classes.userImage}
                  src={user.imgUrl}
                  alt="user"
                />
              </div>
              <div className={classes.userInfo}>
                <h2>{`${user.firstName} ${user.lastName}`}</h2>
                <p className={classes.dob}><span style={{color:"rgba(0,0,0,0.6)"}}>Born on : </span>{user.dob}</p>
              </div>
            </div>
            <div className={classes.userContacts}>
              <div className={classes.userContact}>
                <Typography variant="h4" className={classes.contactHeading}>Address</Typography>
                <div>{user.address}</div>
              </div>
              <div className={classes.userContact}>
                <Typography variant="h4" className={classes.contactHeading}>Email Address</Typography>
                <div>
                  {user.email.map((email) => (
                    <p>{email}</p>
                  ))}
                </div>
              </div>
              <div className={classes.userContact}>
                <Typography variant="h4" className={classes.contactHeading}>Phone Number</Typography>
                <div>
                  {user.phone.map((phone) => (
                    <p>{phone}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.otherOptions}>
            <div className={classes.walletCard}>

            </div>
            <div className={classes.walletCard}>

            </div>
          </div>
        </div>
      </SideBar>
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
