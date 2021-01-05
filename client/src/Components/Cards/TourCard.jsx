// DEPENDENCIES
import React from "react"
import { useHistory, withRouter } from "react-router"
import { Link } from "react-router-dom"
import compose from "recompose/compose"
import { Card, CardContent, CardHeader, CardMedia, Box, Typography, Button, Grid } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

// STYLES
import styles from "../../assets/material/Buycar"

// UTILS
import { getTourThumbnail } from "../../utils/getImagesUrl"

const TourCard = ({ classes, tour }) => {
	const history = useHistory()

	return (
		<Grid item xs={12} sm={4} lg={3} xl={2} className={classes.cardContainer}>

			<Card className={`${classes.rootCard} fadeIn`}>
				<CardHeader
					title={<p className={classes.cardTitle}>{tour.Name}</p>}
					subheader={
						<Typography
							variant="h5"
							component="h2"
							className={`${classes.typoBold} ${classes.cardLocationLeft}`}
						>
							{tour.State}
						</Typography>
					}
				/>
				<CardMedia
					className={classes.media}
					image={getTourThumbnail(tour)}
					onClick={() => history.push(`/virtual-tour/${tour.APID}`)}
					style={{ cursor: 'pointer' }}
				/>
				<CardContent className={classes.cardContent}>
					<Box display="flex" margin="1rem 0 0 0">
						<Link style={{ display: "contents" }} to={`/virtual-tour/${tour.APID}`}>
							<Button variant="outlined" className={classes.viewDetails}>
								View Virtual Tour
            				</Button>
						</Link>
					</Box>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default compose(withStyles(styles, { withTheme: true }))(
	withRouter(TourCard)
)