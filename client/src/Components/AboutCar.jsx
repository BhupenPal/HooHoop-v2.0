import React from "react";
import PetrolIcon from "../assets/img/svgs/pertol.svg";
import KMsIcon from "../assets/img/svgs/KMsDriven.svg";
import OwnerIcon from "../assets/img/svgs/owner-no.svg";
import CalanderIcon from "../assets/img/svgs/calander.svg";
import styles from "../assets/material/CarPage";
import { Box, makeStyles } from "@material-ui/core";
import WishlistButton from "../Components/Buttons/WishlistButton.jsx";
import { Skeleton } from "@material-ui/lab";


const useStyles = makeStyles(styles);
function AboutCar({ car }) {
  const classes = useStyles();
  
  if (!car?.Make) {
    return (
      <Skeleton
        variant="rect"
        height={"15rem"}
        className={classes.boxContainer}
        key={1}
      />
    );
  }
  return (
    <div  className={classes.boxContainer}>
      <div className={classes.boxHeader}>
        {car?.Make} {car?.Model}
      </div>
      <div className={`${classes.boxText} ${classes.price}`}>
        <div>$ {car?.Price}</div>
        
        <WishlistButton VINum={car?.VINum} LikedBy={car?.LikedBy} />
      </div>
      <div>
        {/* <p className={classes.boxText}>About Car</p>
         */}
        <Box className={classes.aboutIconsContainer}>
          <div>
            <div className={classes.icon}>
              <img src={PetrolIcon} alt="icon" />
            </div>
            <p className={classes.iconText}>{car?.FuelType}</p>
          </div>
          <div>
            <div className={classes.icon}>
              <img src={KMsIcon} alt="icon" />
            </div>
            <p className={classes.iconText}>{car?.KMsDriven} KM</p>
          </div>
          <div>
            <div className={classes.icon}>
              <img src={OwnerIcon} alt="icon" />
            </div>
            <p className={classes.iconText}>1st Owner</p>
          </div>
          <div>
            <div className={classes.icon}>
              <img src={CalanderIcon} alt="icon" />
            </div>
            <p className={classes.iconText}>{car?.ModelYear}</p>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default AboutCar;
