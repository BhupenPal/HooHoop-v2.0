import React, { Component, useEffect, useState } from "react";
import compose from "recompose/compose";
import { Box, Button, Grid, TextField } from "@material-ui/core";
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
import { spacing } from "@material-ui/system";
import { fetchCar } from "../services/fetchCar";
import Slider from "react-slick";
import AsNavFor from "../Components/AsNavFor.jsx";
import View360 from "../Components/View360.jsx";
import CarImage from "../assets/img/sample-car/interior/middle.jpg" 
import View360Slides from "../Components/View360Slides.jsx";

const CarPage = (props) => {
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Option: "",
  });
  const [car, setCar] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [slide,setSlide] = useState(1)
  const { classes } = props;

  const handleChange = (e) => {
    console.log(e.target);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const fetchAndSetCar = () => {
    fetchCar("JTHFF2C20F2914360")
      .then((res) => {
        setCar(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAndSetCar();
    
  }, []);
  const sliderElements = () => [
    <View360 />,
    <View360Slides />,
    <div style={{textAlign:"center"}}>
      <img style={{height:"20rem",width:"100%"}} src="https://naver.github.io/egjs-view360/examples/panoviewer/controls/equi-car-inside.jpg" />
      </div>,
    <div style={{textAlign:"center"}}>
      <img style={{height:"20rem",width:"100%"}} src="https://naver.github.io/egjs-view360/examples/panoviewer/controls/equi-car-inside.jpg" />
      </div>,
    <div style={{textAlign:"center"}}>
      <img style={{height:"20rem",width:"100%"}} src="https://naver.github.io/egjs-view360/examples/panoviewer/controls/equi-car-inside.jpg" />
      </div>,
  ][slide];
  const navs = [
    <div style={{width:"100%",textAlign:"center"}}>
      <img
        style={{height:"10rem",width:"90%",margin:"0 auto"}}
        src={
          CarImage
        }
        alt="car"
      />
    </div>,
    <div style={{width:"100%",textAlign:"center"}}>
      <img
        style={{height:"10rem",width:"90%",margin:"0 auto"}}
        src={
          CarImage
        }
        alt="car"
      />
    </div>,
    <div style={{width:"100%",textAlign:"center"}}>
      <img
        style={{height:"10rem",width:"90%",margin:"0 auto"}}
        src={
          CarImage
        }
        alt="car"
      />
    </div>,
    <div style={{width:"100%",textAlign:"center"}}>
      <img
        style={{height:"10rem",width:"90%",margin:"0 auto"}}
        src={
          CarImage
        }
        alt="car"
      />
    </div>,
    <div style={{width:"100%",textAlign:"center"}}>
      <img
        style={{height:"10rem",width:"90%",margin:"0 auto"}}
        src={
          CarImage
        }
        alt="car"
      />
    </div>,
  ];
  return (
    <Grid
      container
      justify="center"
      component="main"
      className={classes.pageDefault}
    >
      <Grid item container xs={12}>
      </Grid>
      <Grid item container style={{ padding: "1rem",position:"relative" }} xs={12} md={8}>
        {/* <View360 /> */}
        <div style={{height:"20rem",width:"100%"}}>
        {sliderElements()}
        </div>

        <div style={{width:"100%"}}>
        <AsNavFor elements={navs} setSlide={setSlide}/>
        </div>
        {/* <div
          className="cloudimage-360"
          data-folder="src/assets/img/sample-car/exterior/"
          data-filename="Photo_{index}.jpg"
          data-amount="33"
          data-spin-reverse
        ></div>

         */}
      </Grid>
      <Grid item xs={12} md={4}>
        <div className={classes.boxContainer}>
          <div className={classes.boxHeader}>
            {car?.Make} {car?.Model}
          </div>
          <div className={classes.boxText}>$ {car?.Price}</div>
          <div>
            <p className={classes.boxText}>About Car</p>
            <Box className={classes.iconsContainer}>
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
        <div className={classes.boxContainer}>
          <div className={classes.boxHeader}>Seller Details</div>
          <div className={classes.boxText}>
            <div className={classes.sellerDetail}>
              <div>Name</div>
              <div>{car?.Dealer.Name}</div>
            </div>
            <div className={classes.sellerDetail}>
              <div>Phone No.</div>
              <div>{car?.Dealer.Phone}</div>
            </div>
            <div className={classes.sellerDetail}>
              <div>Email</div>
              <div>{car?.Dealer.Email}</div>
            </div>
            <div className={classes.sellerDetail}>
              <div>Location</div>
              <div>{car?.Dealer.Location}</div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item container xs={12} sm={8}>
        <div style={{ width: "100%" }}>
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
          <div className={classes.boxContainer}>
            <div
              className={classes.detailsHeader}
              onClick={() => setShowDetails((val) => !val)}
            >
              {showDetails ? (
                <div>Hide All Details</div>
              ) : (
                <div>Show Details</div>
              )}
            </div>
            {!showDetails ? null : (
              <div className={classes.details}>
                <div className={classes.detail}>
                  <p className={classes.detailHead}>Reg. Expiry</p>
                  <p>{car?.REGExpiry}</p>
                </div>
                <div className={classes.detail}>
                  <p className={classes.detailHead}>Fuel Economy</p>
                  <p>{car?.FuelStar}</p>
                </div>
                <div className={classes.detail}>
                  <p className={classes.detailHead}>On Road Cost</p>
                  <p>{car?.ONRoadCost}</p>
                </div>
                <div className={classes.detail}>
                  <p className={classes.detailHead}>Safety Stars</p>
                  <p>{car?.SafetyStar}</p>
                </div>
                <div className={classes.detail}>
                  <p className={classes.detailHead}>Drive Type</p>
                  <p>{car?.DriveWheel4}</p>
                </div>
              </div>
            )}
          </div>
          <div style={{ padding: "1rem" }}>
            <h2>Description</h2>
            <p>{car?.Description}</p>
          </div>
        </div>
        {/* <div>
            <div>
              Description
            </div>
            <div>
              Content
            </div>
          </div> */}
      </Grid>
      <Grid item xs={12} md={4}>
        <div className={classes.boxContainer}>Share This Deal</div>
        <div className={classes.boxContainer}>
          <div>Interested in this Car?</div>
          <div>Share your details and make offer!</div>
          <form>
            <TextField
              onChange={handleChange}
              name={"Name"}
              value={user.Name}
              label="Enter Name"
            />
            <TextField
              onChange={handleChange}
              name={"Email"}
              value={user.Email}
              label="Enter Email"
            />
            <Box mt={5}>
              <div className={classes.options}>
                <input
                  type="radio"
                  id="Contact Seller"
                  style={{ display: "none" }}
                  name="Option"
                  value="Contact Seller"
                />
                <label htmlFor="Contact Seller">Contact Seller</label>
              </div>
              <div className={classes.options}>
                <input
                  type="radio"
                  id="Book A Test Drive"
                  style={{ display: "none" }}
                  name="Option"
                  value="Book A Test Drive"
                />
                <label htmlFor="Book A Test Drive">Book A Test Drive</label>
              </div>
              <div className={classes.options}>
                <input
                  type="radio"
                  id="Shipping Quote"
                  style={{ display: "none" }}
                  name="gender"
                  value="Shipping Quote"
                />
                <label htmlFor="Shipping Quote">Shipping Quote</label>
              </div>
            </Box>
            <Box mt={5}>
              <Button>Submit</Button>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default compose(withStyles(styles, { withTheme: true }))(CarPage);
