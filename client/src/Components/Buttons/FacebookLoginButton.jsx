// DEPENDENCIES
import React, { useState, Fragment } from "react"
import { Button, makeStyles } from "@material-ui/core"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// STYLES
import styles from "../../assets/material/LoginResgister"

// SERVICES
import { FacebookLoginService } from "../../services/OAuthLogin.js"

// COMPONENTS
import MoreDetailsDialog from "../Modals/MoreDetailsDialog.jsx"

// UTILS
import { errorSnackbar } from "../../utils/showSnackbar.js"

// REDUX
import { useDispatch } from "react-redux"
import { socialLogin } from "../../redux/actions/authActions.js"

const useStyles = makeStyles(styles)

const FacebookLoginButton = () => {
	const [showFacebookDialog, setFacebookDialog] = useState(false)
	const [loginResult, setLoginResult] = useState(false)
	const classes = useStyles()
	const dispatch = useDispatch()

	const facebookLogin = async (authResult) => {
		try {
			if (authResult["accessToken"] && authResult["userID"]) {
				const result = await FacebookLoginService(
					authResult["accessToken"],
					authResult["userID"]
				)
				if (result && result["FirstFacebookLogin"]) {
					setFacebookDialog(true)
					setLoginResult(result)
				} else {
					dispatch(socialLogin(result))
				}
			} else {
				throw new Error(authResult)
			}
		} catch (error) {
			console.log(error)
			errorSnackbar("Unsuccessful sign in attempt")
		}
	}

	return (
		<Fragment>
			<MoreDetailsDialog
				visible={showFacebookDialog}
				type="facebook_login"
				handleClose={() => setFacebookDialog(false)}
				userDetails={loginResult}
			/>
			<FacebookLogin
				appId={process.env.FB_CLIENT_ID}
				render={(renderProps) => (
					<Button
						onClick={renderProps.onClick}
						className={classes.social}
						style={{
							color: "#fff",
							backgroundColor: "#3B5998",
							boxShadow: "0.2rem 0.2rem 1rem rgba(0,0,0,0.2)"
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
	)
}

export default FacebookLoginButton