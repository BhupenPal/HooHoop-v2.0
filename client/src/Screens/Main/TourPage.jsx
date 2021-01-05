// DEPENDENCIES
import React, { useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { useParams } from 'react-router-dom'

// STYLES
import styles from '../../assets/material/Buycar'

// Functional Component Starts Here
const TourPage = () => {
	const classes = makeStyles(styles)()
	const { APID } = useParams()

	useEffect(() => {
		window.scrollTop = 0
	}, [])

	return (
		<Grid
			container
			component='main'
		>
			<Grid item container xs={12} style={{ height: 'fit-content' }}>
				<iframe
					style={{ width: '100%', height: '90vh', border: 'none', maxWidth: '100%' }}
					frameBorder='0' allowFullScreen allow='xr-spatial-tracking; gyroscope; accelerometer' scrolling='no'
					src={`https://kuula.co/share/collection/${APID}?fs=1&vr=1&sd=1&thumbs=1&info=0&logo=1&logosize=96`}
				/>
			</Grid>
		</Grid>
	)
}

export default TourPage