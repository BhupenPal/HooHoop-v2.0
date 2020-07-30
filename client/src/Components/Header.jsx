import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link, NavLink } from "react-router-dom";
import Logo from '../assets/img/logo/Logo.png';

const HeaderStyles = makeStyles(() => ({
  HeaderStyle: {
    margin: '10px 6%',
    justifyContent: 'space-between',
    fontSize: 13.5,
    fontWeight: 500
  },
  HeaderLogo: {
    width: 300,
    objectFit: 'contain'
  },
  OptButton: {
    width: 50,
    height: 30,
    backgroundColor: '#fff',
    color: '#333'
  },
  RegisterButton: {
    width: 175,
    height: 30,
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #DDDDDD'
  },
  LoginButton: {
    background: 'linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)',
    color: '#fff',
    width: 100,
    height: 30,
    borderRadius: 5
  }
}));

const Header = () => {
  const classes = HeaderStyles();

  return (
    <AppBar position="static" style={{ backgroundColor: '#fff' }}>
      <Toolbar className={classes.HeaderStyle}>
        <Link to="/">
          <img src={Logo} alt="Hoohoop Logo" className={classes.HeaderLogo} />
        </Link>

        <div className='header-options'>
          <NavLink to="/search-cars">
            <Button color="inherit" className={classes.OptButton}>Buy</Button>
          </NavLink>
          <NavLink to="/sell-car">
            <Button color="inherit" className={classes.OptButton}>Sell</Button>
          </NavLink>
          <NavLink to="/register">
            <Button color="inherit" className={classes.RegisterButton}>Create Account</Button>
          </NavLink>
          <NavLink to="/login">
            <Button color="inherit" className={classes.LoginButton}>Sign In</Button>
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
