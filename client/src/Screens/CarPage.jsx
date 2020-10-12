import React, { Component, useEffect, useState } from "react";
import compose from "recompose/compose";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLessSharpIcon from '@material-ui/icons/ExpandLessSharp';
import { fetchCar } from "../services/fetchCar";
import Slider from "react-slick";
import AsNavFor from "../Components/AsNavFor.jsx";
import View360 from "../Components/View360.jsx";
import CarImage from "../assets/img/sample-car/interior/middle.jpg";
import View360Slides from "../Components/View360Slides.jsx";
import RoundedIcon from "../Components/icons/RoundedIcons.jsx";
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
import styles from "../assets/material/CarPage";
import { Rating } from "@material-ui/lab";
import CarSlider from "../Components/CarSlider.jsx";
import Axios from "axios";
import Ad from "../Components/Ad.jsx";


const CarPage = (props) => {
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Option: "",
  });
  const [car, setCar] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [slide, setSlide] = useState(1);
  const { classes } = props;

  const handleChange = (e) => {
    console.log(e.target);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const fetchAndSetCar = () => {

    // @TODO change this 7998 to the current car price
    Axios
    .get("/api/recommended-cars/7998")
    .then((res) => {
      setRecommendedCars(res.data);
    })
    .catch((err) => {
      alert("Error fetching data");
      console.log(err);
    });
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
  const sliderElements = () =>
    [
      <View360 />,
      <View360Slides />,
      <div style={{ textAlign: "center" }}>
        <img
          style={{ height: "100%", width: "100%" }}
          src="https://naver.github.io/egjs-view360/examples/panoviewer/controls/equi-car-inside.jpg"
        />
      </div>,
      <div style={{ textAlign: "center" }}>
        <img
          style={{ height: "100%", width: "100%" }}
          src="https://naver.github.io/egjs-view360/examples/panoviewer/controls/equi-car-inside.jpg"
        />
      </div>,
      <div style={{ textAlign: "center" }}>
        <img
          style={{ height: "100%", width: "100%" }}
          src="https://naver.github.io/egjs-view360/examples/panoviewer/controls/equi-car-inside.jpg"
        />
      </div>,
    ][slide];
  const navs = [
    <img className={classes.sliderImages} src={CarImage} alt="car" />,

    <img className={classes.sliderImages} src={CarImage} alt="car" />,

    <img className={classes.sliderImages} src={CarImage} alt="car" />,

    <img className={classes.sliderImages} src={CarImage} alt="car" />,

    <img
      style={{ height: "100px", width: "10rem", margin: "0 auto" }}
      src={CarImage}
      alt="car"
    />,
  ];
  return (
    <Grid
      container
      justify="center"
      component="main"
      className={classes.pageDefault}
    >
      <Grid
        item
        container
        style={{ padding: "1rem", position: "relative" }}
        xs={12}
        md={8}
      >
        <div
          style={{
            height: "25rem",
            width: "100%",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {sliderElements()}
        </div>

        <div style={{ width: "100%" }}>
          <AsNavFor elements={navs} setSlide={setSlide} />
        </div>
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
             
              <RoundedIcon icon={MilageIcon} title="Milage" content={`${car?.ONRoadCost} kmpl`} />
              <RoundedIcon icon={EngineIcon} title="Engine" content={`${car?.EngineSize} cc`} />
              <RoundedIcon icon={TransmissionIcon} title="Transmission" content={`${car?.Transmission}`} />
              <RoundedIcon icon={PowerIcon} title="Max. Power" content={`${car?.EngineSize} bhp`} />
              <RoundedIcon icon={ColorIcon} title="Color" content={`${car?.Color}`} />
              <RoundedIcon icon={SeatIcon} title="Seats" content={`${car?.SeatCount}`} />
              
            </div>
          </div>
          <div className={`${classes.boxContainer} ${classes.detailsContainer}`}>
            <div
              className={classes.detailsHeader}
              onClick={() => setShowDetails((val) => !val)}
            >
              {showDetails ? (
                <>Hide All Details <ExpandLessSharpIcon style={{color:"#E85513"}}/></>
              ) : (
                <>Show Details <ChevronRightIcon style={{color:"#E85513"}}/></>
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
                  <p> <Rating name="half-rating-read" precision={0.1} readOnly={true} className={"MuiRating-decimal"} value={car?.FuelStar || 0} size="small" /></p>
                </div>
                <div className={classes.detail}>
                  <p className={classes.detailHead}>On Road Cost</p>
                  <p>{car?.ONRoadCost}</p>
                </div>
                <div className={classes.detail}>
                  <p className={classes.detailHead}>Safety Stars</p>
                  <p> <Rating name="half-rating-read" value={car?.SafetyStar || 0} size="small" /></p>
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
      <Grid item container xs={12}>
        <div>
          <h2>Recommended Cars For You</h2>
        </div>
        <CarSlider data={recommendedCars} />

      </Grid>
      <Ad></Ad>
    </Grid>
  );
};
export default compose(withStyles(styles, { withTheme: true }))(CarPage);
