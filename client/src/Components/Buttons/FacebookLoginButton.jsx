import { Button, makeStyles } from "@material-ui/core";
import React, { useState, Fragment } from "react";
import  FacebookLogin  from "react-facebook-login/dist/facebook-login-render-props";
import { FacebookLoginService } from "../../services/OAuthLogin.js";
import MoreDetailsDialog from "../Modals/MoreDetailsDialog.jsx";
import styles from "../../assets/material/LoginResgister";

const useStyles = makeStyles(styles);

function FacebookLoginButton(props) {
  const [showDialog, setDialog] = useState(false);
  const [loginResult, setLoginResult] = useState(false);
  const classes = useStyles();
  const facebookLogin = async (authResult) => {
    try {
      if (authResult["accessToken"] && authResult["userID"]) {
          
        const result = await FacebookLoginService(
          authResult["accessToken"],
          authResult["userID"]
        );
        //props.login(result)
        setDialog(true);
        setLoginResult(result);
      } else {
        throw new Error(authResult);
      }
    } catch (error) {
      console.log(Object.keys(error.message));
    }
  };
  return (
    <Fragment>
      <MoreDetailsDialog
        visible={showDialog}
        type="facebook_login"
        handleClose={() => setDialog(false)}
        userDetails={loginResult}
      />
      <FacebookLogin
        appId={process.env.FB_CLIENT_ID}
        render={(renderProps) => (
          <Button 
          onClick={renderProps.onClick} 
          className={classes.social}
          style={{
            color:"#fff",
            backgroundColor:"#3B5998",
            boxShadow:"0.2rem 0.2rem 1rem rgba(0,0,0,0.2)"
          }}
          >
            Facebook
          </Button>
        )}
        scope={[
          "public_profile",
          "email",
          "user_birthday",
          "user_gender",
          "user_location",
        ].join(" ")}
        callback={facebookLogin}
      />
    </Fragment>
  );
}

export default FacebookLoginButton;
