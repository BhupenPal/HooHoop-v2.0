import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/img/logo/Logo.png";
import { Box } from "@material-ui/core";
import ToggleIcon from "../assets/img/svgs/toggleIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { hideSideBar, showSideBar } from "../actions/sideBarActions";

const HeaderStyles = makeStyles(theme => ({
  HeaderStyle: {
    margin: "10px 6%",
    justifyContent: "space-between",
    fontSize: 13.5,
    fontWeight: 500,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      margin: "0",
    }
  },
  HeaderLogo: {
    width: 300,
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      width: 150,
    },
  },
  OptButton: {
    width: 50,
    height: 30,
    backgroundColor: "#fff",
    color: "#333",
  },
  RegisterButton: {
    width: 175,
    height: 30,
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #DDDDDD",
  },
  LoginButton: {
    background: "linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)",
    color: "#fff",
    width: 100,
    height: 30,
    borderRadius: 5,
    [theme.breakpoints.down("md")]: {
      background: "none",
      color: "#666666",
      width: "unset",
      padding: 0
    },
  },
}));

const Header = () => {
  const classes = HeaderStyles();
  const dispatch = useDispatch();
  const sideBar = useSelector(store => store.sideBar)
  const handleSideBarToggle = () => {
    if (sideBar.active) {
      dispatch(hideSideBar());
    } else {
      dispatch(showSideBar());
    }
  }
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#fff" }}
    >
      <Toolbar className={classes.HeaderStyle}>
        <Box display={{ xs: "inline", md: "none" }} onClick={handleSideBarToggle}>
          <img src={ToggleIcon} alt="" />
        </Box>
        <Link to="/">
          <img src={Logo} alt="Hoohoop Logo" className={classes.HeaderLogo} />
        </Link>

        <Box className="header-options">
          <Box display={{ xs: "none", md: "inline" }}>
            <NavLink to="/">
              <Button color="inherit" className={classes.OptButton}>
                Home
              </Button>
            </NavLink>
          </Box>
          <Box display={{ xs: "none", md: "inline" }}>
            <NavLink to="/buy-car">
              <Button color="inherit" className={classes.OptButton}>
                Buy
              </Button>
            </NavLink>
          </Box>
          <Box display={{ xs: "none", md: "inline" }}>
            <NavLink to="/sell-car">
              <Button color="inherit" className={classes.OptButton}>
                Sell
              </Button>
            </NavLink>
          </Box>
          <Box display={{ xs: "none", md: "inline" }}>
            <NavLink to="/register">
              <Button color="inherit" className={classes.RegisterButton}>
                Create Account
              </Button>
            </NavLink>
          </Box>
          <Box display={{ xs: "inline" }}>
            <NavLink to="/login">
              <Button color="inherit" className={classes.LoginButton}>
                Sign In
              </Button>
            </NavLink>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;