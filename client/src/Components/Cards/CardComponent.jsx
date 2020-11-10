import React, { Component, useState } from "react";
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
import Sports from "../../assets/img/Home/Banner/saleen.jpg";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import SpeedIcon from "@material-ui/icons/Speed";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../assets/material/Buycar";

import { Link } from "react-router-dom";
import { getThumbnailLink } from "../../utils/getImagesUrl";
import WishlistButton from "../Buttons/WishlistButton.jsx";

const CardComponent = ({ classes, car, index }) => {
   
    return (
      <Grid item xs={12} sm={4}  lg={3} xl={2} className={classes.cardContainer}>

      <Card className={`${classes.rootCard} fadeIn`}>
        <CardHeader
          
          title={<p className={classes.cardTitle}>{car.Make} {car.Model}</p>}
          subheader={<p className={classes.cardSubTitle}>{car.ModelYear} Model</p>}
        />
        <CardMedia className={classes.media} image={getThumbnailLink(car.VINum)} />
        <CardContent className={classes.cardContent}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography
              variant="h5"
              component="h2"
              className={`${classes.typoBold} ${classes.cardAmount}`}
            >
              $ {car.Price}
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              className={`${classes.typoBold} ${classes.cardLocation}`}
            >
              <IconButton className={classes.LocationIcon}>
                <RoomOutlinedIcon />
              </IconButton>
              {car.State}
            </Typography>
          </Box>
          <Box flex={1} display="flex" justifyContent="center" margin="1rem 0">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="33%"
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
            <Link style={{display: "contents"}} to={`/car/${car.VINum}`}>
            <Button variant="outlined" className={classes.viewDetails}>
              View Details
            </Button>
            </Link>
            <WishlistButton VINum={car.VINum} LikedBy={car.LikedBy}/>
          </Box>
        </CardContent>
      </Card>
      </Grid>
    );
  }

export default compose(withStyles(styles, { withTheme: true }))(
  withRouter(CardComponent)
);
