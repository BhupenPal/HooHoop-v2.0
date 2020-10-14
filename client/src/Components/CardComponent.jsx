import React, { Component } from "react";
import { withRouter } from "react-router";
import compose from "recompose/compose";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Grid,
} from "@material-ui/core";
import Sports from "../assets/img/Home/sports.png";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import SpeedIcon from "@material-ui/icons/Speed";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import { withStyles } from "@material-ui/core/styles";
import styles from "../assets/material/Buycar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

class CardComponent extends Component {
  render() {
    const { classes, car } = this.props;
    return (
      <Grid item container xs={12} sm={4} justify="center">

      <Card className={classes.rootCard}>
        <CardHeader
          title={`${car.Make} ${car.Model}`}
          subheader={`${car.ModelYear} Model`}
        />
        <CardMedia className={classes.media} image={Sports} />
        <CardContent className={classes.cardContent}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h5"
              component="h2"
              className={classes.typoBold}
            >
              ₹ {car.Price}
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              className={classes.typoBold}
            >
              <IconButton className={classes.LocationIcon}>
                <RoomOutlinedIcon />
              </IconButton>
              {car.State}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" margin="1rem 0">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxWidth="33%"
            >
              <Avatar className={classes.iconCirclePrimary}>
                <LocalTaxiIcon className={classes.iconSpacing} />
              </Avatar>
              <Typography className={classes.typoSmall}>
                {car.BodyType}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxWidth="33%"

            >
              <Avatar className={classes.iconCirclePrimary}>
                <LocalGasStationIcon className={classes.iconSpacing} />
              </Avatar>
              <Typography className={classes.typoSmall}>
                {car.FuelType}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxWidth="33%"

            >
              <Avatar className={classes.iconCirclePrimary}>
                <SpeedIcon className={classes.iconSpacing} />
              </Avatar>
              <Typography className={classes.typoSmall}>{car.KMsDriven} Kms</Typography>
            </Box>
          </Box>
          <Box display="flex">
            <Button variant="outlined" className={classes.viewDetails}>
              View Details
            </Button>
            <Avatar className={classes.favoriteIcon}>
              <IconButton>
                <FavoriteBorderIcon className={classes.heartIcon} />
              </IconButton>
            </Avatar>
          </Box>
        </CardContent>
      </Card>
      </Grid>
    );
  }
}

export default compose(withStyles(styles, { withTheme: true }))(
  withRouter(CardComponent)
);
