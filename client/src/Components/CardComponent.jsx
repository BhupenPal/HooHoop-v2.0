import React, { Component } from "react"
import { withRouter } from "react-router";
import compose from "recompose/compose";
import { Card, CardContent, CardHeader, CardMedia, Box, Typography, Avatar, IconButton, Button } from "@material-ui/core";
import Sports from '../assets/img/Home/sports.png'
import RoomIcon from '@material-ui/icons/Room';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import SpeedIcon from '@material-ui/icons/Speed';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import { withStyles } from "@material-ui/core/styles";
import styles from '../assets/material/Buycar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class CardComponent extends Component {
  render() {
    const { classes } = this.props;
    return (
        <Card className={classes.root}>
            <CardHeader title="Ford Ecosport" subheader="2018 Model" />
            <CardMedia className={classes.media} image={Sports} />
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" component="h2" className={classes.typoBold}>₹17Lakh</Typography>
                  <Typography variant="h5" component="h2" className={classes.typoBold}>
                  <IconButton><RoomIcon /></IconButton>New Delhi
                  </Typography>
              </Box>
              <Box display="flex" justifyContent="center" margin="1rem 0">
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                  <Avatar className={classes.iconCirclePrimary}><LocalTaxiIcon className={classes.iconSpacing} /></Avatar>
                  <Typography className={classes.typoSmall}>Compact Suv</Typography>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                  <Avatar className={classes.iconCirclePrimary}><LocalGasStationIcon className={classes.iconSpacing} /></Avatar>
                  <Typography className={classes.typoSmall}>Petrol</Typography>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                  <Avatar className={classes.iconCirclePrimary}><SpeedIcon className={classes.iconSpacing} /></Avatar>
                  <Typography className={classes.typoSmall}>180,000 Kms</Typography>
                </Box>
              </Box>
              <Box display="flex">
                <Button variant="outlined" className={classes.viewDetails}>View Details</Button>
                <Avatar className={classes.favoriteIcon}><IconButton><FavoriteBorderIcon className={classes.heartIcon} /></IconButton></Avatar>
              </Box>
            </CardContent>
        </Card>
    )
  }
}

export default compose(
    withStyles(styles, {withTheme: true})
  )(withRouter(CardComponent));