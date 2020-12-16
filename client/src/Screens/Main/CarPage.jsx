import React, { useEffect, useState } from "react";
import compose from "recompose/compose";
import { Box, Breadcrumbs, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CarSlider from "../../Components/Sliders/CarSlider.jsx";
import Ad from "../../Components/Ad.jsx";
import LeadForm from "../../Components/LeadForm.jsx";
import CarDetails from "../../Components/CarDetails.jsx";

import styles from "../../assets/material/CarPage";

import { fetchCar, fetchRecommendedCar } from "../../services/fetchCar";
import { submitCarLead } from "../../services/submitCarLead";
import { Link, useParams } from "react-router-dom";

import "../../assets/Interior 360/PanoControls.css";
import { getInteriorLinks } from "../../utils/getImagesUrl.js";
import CarPreview from "../../Components/CarPreview.jsx";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AboutCar from "../../Components/AboutCar.jsx";
import { useSelector } from "react-redux";
import { showLoginModel } from "../../utils/showLoginModel.js";

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
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isLoginModelVisible = useSelector((state) => state.loginModel.active);

  const [car, setCar] = useState(null);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [loadingMore, setLoadingMore] = useState(true);
  const { VINum } = useParams();
  const { classes } = props;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const closeLoginModel = () => {
    setLoginModel((visible) => false);
  };
  const handleCheckboxChange = (e) => {
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
            setLoadingMore(false);
            setRecommendedCars(cars);
          })
          .catch((err) => {
            alert("Error fetching data");
            setLoadingMore(false);
          });
      })
      .catch((err) => {
        setLoadingMore(false);
      });
  };
  const handleDetailsClick = () => {
    if (!isAuthenticated) {
      showLoginModel();
    }
  };

  function searchMoreCars(e) {
    brands[car?.make] = !brands[car?.Make];
    dispatch(setFilterBrands({ ...brands }));
  }
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [VINum]);
  useEffect(
    (...args) => {
      setLoadingMore(true);
      fetchAndSetCar();
    },
    [VINum, isAuthenticated]
  );

  

  // useEffect(() => {
  //   fetchAndSetCar();
  // }, [,isLoginModelVisible]);

  return (
    <Grid
      container
      justify="center"
      component="main"
      className={classes.pageDefault}
    >
      <Grid item xs={12} style={{padding:"1rem"}}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to="/buy-car" >
            BUY CAR
          </Link>
          <Link
            color="inherit"
            to={`/buy-car?make=${car?.Make}`} 
          >
            {car?.Make}
          </Link>
          <Link
            color="textPrimary"
            to={`/car/${car?.VINum}`}
          >
            {car?.VINum}
          </Link>
        </Breadcrumbs>
      </Grid>
      <Grid item container xs={12} sm={12} md={8}>
        <Grid item xs={12}>
          <CarPreview
            ImageData={car?.ImageData}
            VINum={VINum}
            classes={classes}
          />
        </Grid>
        <Box display={{ xs: "block", md: "none" }} width={"100%"}>
          <AboutCar classes={classes} car={car} />
        </Box>
        <Grid item xs={12}>
          <CarDetails car={car} classes={classes} />
        </Grid>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box display={{ xs: "none", md: "block" }}>
          <AboutCar classes={classes} car={car} />
        </Box>

        <Accordion
          disabled={!car?.Author}
          onClick={handleDetailsClick}
          style={{
            background: "#fff",
            borderRadius: "5px",
            cursor: !car?.Author ? "pointer" : "initial",
          }}
          className={`${classes.sellerCard} sellerDetails`}
        >
          <AccordionSummary
            expandIcon={car?.Author ? <ExpandMoreIcon /> : <LockOutlinedIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className={classes.sellerHeader}>Seller Details </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={`${classes.sellerHeader}`}>
              <div className={classes.sellerDetail}>
                <div>Name</div>
                <div>
                  {car?.Author?.FirstName} {car?.Author?.LastName}
                </div>
              </div>
              <div className={classes.sellerDetail}>
                <div>Phone No.</div>
                <div>{car?.Author?.Phone}</div>
              </div>
              <div className={classes.sellerDetail}>
                <div>Email</div>
                <div>{car?.Author?.Email}</div>
              </div>
              <div className={classes.sellerDetail}>
                <div>Location</div>
                <div>{car?.Location}</div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <LeadForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCheckboxChange={handleCheckboxChange}
          user={user}
        />
      </Grid>

      <Grid item xs={12}>
        <div style={{ paddingLeft: "1rem" }}>
          <h2>Recommended Cars For You</h2>
        </div>
        <div>
          <CarSlider loading={false} data={recommendedCars} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Ad />
      </Grid>
    </Grid>
  );
};
export default compose(withStyles(styles, { withTheme: true }))(CarPage);
