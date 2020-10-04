import React, { Component } from "react";
import compose from "recompose/compose";
import { Box, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../assets/material/CarPage";
import FilterComponent from "../Components/filterComponent.jsx";
import PetrolIcon from "../assets/img/svgs/pertol.svg";
import KMsIcon from "../assets/img/svgs/KMsDriven.svg";
import OwnerIcon from "../assets/img/svgs/owner-no.svg";
import CalanderIcon from "../assets/img/svgs/calander.svg";
import MilageIcon from "../assets/img/svgs/milage.svg";
import EngineIcon from "../assets/img/svgs/engine.svg";
import TransmissionIcon from "../assets/img/svgs/automation.svg";
import PowerIcon from "../assets/img/svgs/power.svg";
import ColorIcon from "../assets/img/svgs/color.svg";
import SeatIcon from "../assets/img/svgs/chair.svg";

class CarPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      Password: "",
      Remember: false,
      Errors: null,
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        justify="center"
        component="main"
        className={classes.pageDefault}
      >
        <Grid item container xs={8}>
          {/* <FilterComponent /> */}
        </Grid>
        <Grid item container xs={4}>
          {/* <FilterComponent /> */}
          <div className={classes.boxContainer}>
            <div className={classes.boxHeader}>Ford Focus</div>
            <div className={classes.boxText}>6.56 Lakh</div>
            <div>
              <p className={classes.boxText}>About Car</p>
              <Box className={classes.iconsContainer}>
                <div>
                  <div className={classes.icon}>
                    <img src={PetrolIcon} alt="icon" />
                  </div>
                  <p className={classes.iconText}>Petrol</p>
                </div>
                <div>
                  <div className={classes.icon}>
                    <img src={KMsIcon} alt="icon" />
                  </div>
                  <p className={classes.iconText}>1200 KM</p>
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
                  <p className={classes.iconText}>2018</p>
                </div>
              </Box>
            </div>
          </div>
          <div className={classes.boxContainer}>
            <div className={classes.boxHeader}>Seller Details</div>
            <div className={classes.boxText}>
              <div className={classes.sellerDetail}>
                <div>Name</div>
                <div>Matt Right</div>
              </div>
              <div className={classes.sellerDetail}>
                <div>Phone No.</div>
                <div>Matt Right</div>
              </div>
              <div className={classes.sellerDetail}>
                <div>Email</div>
                <div>Matt Right</div>
              </div>
              <div className={classes.sellerDetail}>
                <div>Location</div>
                <div>Matt Right</div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item container xs={12} sm={8}>
          <div className={`${classes.boxContainer}`}>
            <h2>Top Specs</h2>
            <div className={`${classes.iconsContainer} ${classes.topSpecs}`}>
              <div className={classes.icon}>
                <img src={MilageIcon} alt="icon" />
              </div>
              <div className={classes.icon}>
                <img src={EngineIcon} alt="icon" />
              </div>
              <div className={classes.icon}>
                <img src={TransmissionIcon} alt="icon" />
              </div>
              <div className={classes.icon}>
                <img src={PowerIcon} alt="icon" />
              </div>
              <div className={classes.icon}>
                <img src={ColorIcon} alt="icon" />
              </div>
              <div className={classes.icon}>
                <img src={SeatIcon} alt="icon" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>Hide All Details</div>
            </div>
            <div>
              <div>
                <p>Reg. Expiry</p>
                <p>Febuary 2020</p>
              </div>
              <div>
                <p>Reg. Expiry</p>
                <p>Febuary 2020</p>
              </div>
              <div>
                <p>Reg. Expiry</p>
                <p>Febuary 2020</p>
              </div>
              <div>
                <p>Reg. Expiry</p>
                <p>Febuary 2020</p>
              </div>
              <div>
                <p>Reg. Expiry</p>
                <p>Febuary 2020</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              Description
            </div>
            <div>
              Content
            </div>
          </div>
        </Grid>
        <Grid item container xs={4}></Grid>
      </Grid>
    );
  }
}
export default compose(withStyles(styles, { withTheme: true }))(CarPage);
