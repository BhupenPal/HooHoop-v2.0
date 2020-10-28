import React, { useEffect, useState } from "react";
import compose from "recompose/compose";
import { Box, Grid, } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import AsNavFor from "../../Components/Sliders/AsNavFor.jsx";
import View360 from "../../Components/View360.jsx";
import CarSlider from "../../Components/Sliders/CarSlider.jsx";
import Ad from "../../Components/Ad.jsx";
import LeadForm from "../../Components/LeadForm.jsx";
import CarDetails from "../../Components/CarDetails.jsx";

import CarImage from "../../assets/img/sample-car/interior/middle.jpg";
import View360Slides from "../../Components/View360Slides.jsx";
import PetrolIcon from "../../assets/img/svgs/pertol.svg";
import KMsIcon from "../../assets/img/svgs/KMsDriven.svg";
import OwnerIcon from "../../assets/img/svgs/owner-no.svg";
import CalanderIcon from "../../assets/img/svgs/calander.svg";

import styles from "../../assets/material/CarPage";

import { fetchCar, fetchRecommendedCar } from "../../services/fetchCar";
import { submitCarLead } from "../../services/submitCarLead";
import { useParams } from "react-router-dom";

import '../../assets/Interior 360/PanoControls.css'

const CarPage = (props) => {
  const [user, setUser] = useState({
    FullName: "",
    Phone: "",
    WantsToTrade: false,
    CallbackQuery: false,
    ShipmentQuery: false,
    TestDriveQuery: false,
    MakeModel: "",
    VINum: "",
    AuthorID: "",
  });
  const [car, setCar] = useState(null);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [loadingMore,setLoadingMore] = useState(true);
  const [slide, setSlide] = useState(1);
  const { VINum } = useParams();
  const { classes } = props;

  const handleChange = (e) => {
    console.log(e.target);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
    console.log(e.target.checked);
    setUser({ ...user, [e.target.name]: e.target.checked });
  };
  const handleSubmit = () => {
    submitCarLead(user);
  };
  const fetchAndSetCar = () => {
    // @TODO change the api for fetching featured

    fetchCar(VINum)
      .then((res) => {
        setCar(res);
        setUser((user) => ({
          ...user,
          AuthorID: res.Author,
          VINum: res.VINum,
          MakeModel: res.Make + " " + res.Model,
        }));

        fetchRecommendedCar(res.Price)
          .then((cars) => {
            setLoadingMore(false)
            setRecommendedCars(cars);
          })
          .catch((err) => {
            alert("Error fetching data");
            setLoadingMore(false)
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [VINum]);
  useEffect(() => {
    setLoadingMore(true)
    fetchAndSetCar();
  }, [VINum]);
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
    className={classes.sliderImages}
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
        className={classes.imagesContainer}

        style={{  position: "relative" }}
        xs={12}
        md={8}
      >
      <Grid
        item
        container
        style={{ position: "relative" }}
        xs={12}
      >
        <div
          style={{
            height: "100% ",
            width: "100%",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {sliderElements()}
        </div>
      </Grid>
      <Grid
        item
        container

        xs={12}
      >
        <div style={{ width: "100%" }}>
          <AsNavFor elements={navs} setSlide={setSlide} />
        </div>
      </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <div className={classes.boxContainer}>
          <div className={classes.boxHeader}>
            {car?.Make} {car?.Model}
          </div>
          <div className={classes.boxText}>$ {car?.Price}</div>
          <div>
            <p className={classes.boxText}>About Car</p>
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
        <CarDetails car={car} classes={classes} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LeadForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCheckboxChange={handleCheckboxChange}
          user={user}
        />
      </Grid>
      
      <Grid item xs={12}>
        <div>
          <h2>Recommended Cars For You</h2>
        </div>
        <div>
          <CarSlider loading={false} data={recommendedCars} />
        </div>
      </Grid>
      <Ad/>
    
    </Grid>
  );
};
export default compose(withStyles(styles, { withTheme: true }))(CarPage);
