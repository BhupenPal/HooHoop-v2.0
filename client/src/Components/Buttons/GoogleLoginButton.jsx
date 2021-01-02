// DEPENDENCIES
import React, { useState, Fragment } from "react"
import { Button, makeStyles } from "@material-ui/core"
import GoogleLogin from "react-google-login"

// STYLES
import styles from "../../assets/material/LoginResgister"

// SERVICES
import { GoogleLoginService } from "../../services/OAuthLogin.js"

// COMPONENTS
import MoreDetailsDialog from "../Modals/MoreDetailsDialog.jsx"

// REDUX
import { useDispatch } from "react-redux"
import { socialLogin } from "../../redux/actions/authActions.js"

// UTILS
import { errorSnackbar } from "../../utils/showSnackbar.js"

const useStyles = makeStyles(styles)

const GoogleLoginButton = () => {
	const [showGoogleDialog, setGoogleDialog] = useState(false)
	const [loginResult, setLoginResult] = useState(false)
	const classes = useStyles()
	const dispatch = useDispatch()
	const googleLogin = async (authResult) => {
		try {
			if (authResult["tokenId"]) {
				const result = await GoogleLoginService(authResult["tokenId"])
				if (result && result["FirstGoogleLogin"]) {
					setGoogleDialog(true)
					setLoginResult(result)
				} else {
					dispatch(socialLogin(result))
				}
			} else {
				throw new Error(authResult)
			}
		} catch (error) {
			errorSnackbar("Unsuccessful sign in attempt")
		}
	}
	return (
		<Fragment>
			<MoreDetailsDialog
				visible={showGoogleDialog}
				type="google_login"
				handleClose={() => setGoogleDialog(false)}
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
							color: "#fff",
							backgroundColor: "#DE403A",
							boxShadow: "0.2rem 0.2rem 1rem rgba(0,0,0,0.2)"
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
				onSuccess={googleLogin}
				onFailure={googleLogin}
				cookiePolicy={"single_host_origin"}
			/>
		</Fragment>
	)
}

export default GoogleLoginButton