import { Button, makeStyles } from "@material-ui/core";
import React, { useState, Fragment } from "react";
import GoogleLogin from "react-google-login";
import { GoogleLoginService } from "../../services/OAuthLogin.js";
import MoreDetailsDialog from "../Modals/MoreDetailsDialog.jsx";
import styles from "../../assets/material/LoginResgister";
import { socialLogin } from "../../redux/actions/authActions.js";
import { useDispatch } from "react-redux";
import { errorSnackbar } from "../../utils/showSnackbar.js";
import { makeErrorMessage } from "../../utils/makeErrorMessage.js";

const useStyles = makeStyles(styles);
function GoogleLoginButton(props) {
  const [showGoogleDialog, setGoogleDialog] = useState(false);
  const [loginResult, setLoginResult] = useState(false);
  const classes = useStyles(); 
  const dispatch = useDispatch();
  const googleLogin = async (authResult) => {
    try {
      if (authResult["tokenId"]) {
        const result = await GoogleLoginService(authResult["tokenId"]);
        //props.login(result);
        if (result && result["FirstGoogleLogin"]) {
          setGoogleDialog(true);
          setLoginResult(result);
        }else{
            dispatch(socialLogin(result))
        }
      } else {
        throw new Error(authResult);
      }
    } catch (error) {
     // console.log(error)
      errorSnackbar("Unsuccessful sign in attempt")
    }
  };
  return (
    <Fragment>
      <MoreDetailsDialog
        visible={showGoogleDialog}
        type="google_login"
        handleClose={() => setGoogleDialog(false )}
        userDetails={loginResult}
      />
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        responseType={"id_token"}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className={classes.social}
            style={{
              color:"#fff",
              backgroundColor:"#DE403A",
              boxShadow:"0.2rem 0.2rem 1rem rgba(0,0,0,0.2)"
            }}
          >
            Google
          </Button>
        )}
        scope={[
          "email",
          "profile",
          "openid",
          "https://www.googleapis.com/auth/user.gender.read",
          "https://www.googleapis.com/auth/user.birthday.read",
          "https://www.googleapis.com/auth/user.phonenumbers.read",
        ].join(" ")}
        // uxMode="redirect"
        onSuccess={googleLogin}
        onFailure={googleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </Fragment>
  );
}

export default GoogleLoginButton;
