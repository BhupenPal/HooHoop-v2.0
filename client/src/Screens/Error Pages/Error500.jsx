// DEPENDENCIES
import React, { useEffect } from 'react'
import ErrorPic from '../../assets/img/Error Pages/Error500.png'
import { Typography, Button, makeStyles } from '@material-ui/core'

// STYLES
import styles from "../../assets/material/ErrorPage"

function Error505() {
	const classes = makeStyles(styles)()

	useEffect(() => {
		// Hiding Footer
		document.querySelector('.footer').style.display = 'none'

		// Cleanup function to make footer visible again
        return function cleanup() {
			document.querySelector('.footer').style.display = 'grid'
        }
	}, [])

	return (
		<div className={classes.PageDefault} >
			<img src={ErrorPic} alt="Error 404" className={classes.ErrImg} />
			<div>
				<Typography variant='h1' className={classes.ErrHead}>Error 500! Internal Server Error!</Typography>
				<Typography variant='h2' className={classes.ErrDescription}>Something went wrong, we are working on it</Typography>
				<div className={classes.ErrButtonsDiv}>
					<Button className={classes.ErrButton}>Home</Button>
					<Button className={classes.ErrButtonWhite}>Report Bug</Button>
				</div>
			</div>
		</div>
	)
}

export default Error505