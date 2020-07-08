import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, NavLink } from "react-router-dom";

const HeaderStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  },
  Head: {
    height: 87
  }
}));

const Header = () => {
  const classes = HeaderStyles();

  return (
      <AppBar position="static">
        <Toolbar  className={classes.Head}>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">HooHoop</Link>
          </Typography>
          <NavLink to="/login">
            <Button color="inherit">Login</Button>
          </NavLink>
          <NavLink to="/register">
            <Button color="inherit">Register</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
  );
};

export default Header;
