import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../../assets/material/LoginResgister";

import { useEffect } from "react";
import { activateEmail } from "../../services/emailVerifications";

import { successSnackbar } from "../../utils/showSnackbar";
import Login from "../../Components/Forms/Login.jsx";

const useStyles = makeStyles(styles);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SignIn = ({ inDialog, closeDialog }) => {
  const query = useQuery();

  const auth = useSelector((store) => store.auth);
  const csrf = useSelector((store) => store.csrf);

  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    if (csrf.csrfAvailable) {
      if (query.get("token")) {
        activateEmail(query.get("token")).then(() => {
          successSnackbar("Email Activated Successfully");
        });
      }
    }
  }, [csrf.csrfAvailable]);
  useEffect(() => {
    if (!inDialog && auth.isAuthenticated) {
      history.push(query.get("redirect") || "/user/dashboard");
    }

    if (inDialog && auth.isAuthenticated) {
      closeDialog();
    }
  });
  const handleRedirect = (e, value) => {
    !value ? history.push("/register") : history.push("/login");
  };

  return (
    <Grid
      item
      container
      component="main"
      justify="center"
      className="fadeIn"
      style={{ minHeight: "calc(100vh - 105px)" }}
    >
      <Grid
        item
        container
        justify="center"
        xs={12}
        //md={12}
        //spacing={3}
        lg={inDialog ? 12 : 5}
        component={Paper}
        elevation={6}
        square
      >
        <Grid item sm={10} md={8}>
          <Box style={{padding:"1rem"}}>
          <Typography component="h1" className={classes.heading}>
            Welcome Back
          </Typography>
          <Typography>
            Continue to login at HooHoop. Once Logged In you’ll be able to
            manage all your listings and purchases.
          </Typography>
          <Paper square className={classes.tabs}>
            <Tabs
              value={1}
              TabIndicatorProps={{ style: { background: "#000" } }}
              onChange={handleRedirect}
            >
              <Tab label="Register" />
              <Tab label="Login" />
            </Tabs>
          </Paper>
          <Login />
          </Box>
        </Grid>
      </Grid>
      {/* RIGHT BANNER IMAGE */}

      <Grid item md={false} lg={!inDialog && 7} className={classes.image} />
    </Grid>
  );
};

export default SignIn;
