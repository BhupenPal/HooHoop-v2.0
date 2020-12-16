//Dependencies
import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Hidden
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import Slider from "react-slick";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

// Styles
import styles from "../../assets/material/Home";

// Images
import banner_1 from "../../assets/img/Home/Banner/mercedes.png";
import banner_2 from "../../assets/img/Home/Banner/headlight.png";

// Components
import CarSlider from "../../Components/Sliders/CarSlider.jsx";
import SearchBox from "../../Components/Inputs/SearchBox.jsx";

function Home(props) {
  const { classes } = props;

  // Intializing state for API Fetch, Range/Type Based Car and Loader
  const [carsData, setCarsData] = useState([]);
  const [rangeTab, setRangeTab] = useState(0);
  const [carTypeTab, setCarTypeTab] = useState(0);
  const [loader, setLoader] = useState(true);

  // Fetching Home Page API
  useEffect(() => {
    setLoader(true);
    axios
      .get("/api/")
      .then((res) => {
        setCarsData(res.data);
        setLoader(false);
      })
      .catch(() => {
        alert("Error fetching data");
        setLoader(false);
      });
  }, []);

  // Banner Images Slider
  const SliderImages = [
    { id: 1, url: banner_1 },
    { id: 2, url: banner_2 }
  ];

  // Banner Images Slider Settings
  const settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Handling Range & Type based cars Tab
  const handleRangeChange = (e, index) => {
    setRangeTab(index);
  };

  const handleTypeChange = (e, index) => {
    setCarTypeTab(index);
  };

  // Intializing all catergories with empty array
  const {
    sedanType = [],
    hatchbackType = [],
    suvType = [],
    usedCars = [],
    under5K = [],
    under10K = [],
    above10K = [],
  } = carsData;

  const renderRangeCars = () => {
    const tabs = [under5K, under10K, above10K];
    return <CarSlider giveMargin={true} data={tabs[rangeTab]} loading={loader} />;
  };

  const renderUsedTypeCars = () => {
    const tabs = [sedanType, hatchbackType, suvType];
    return <CarSlider giveMargin={true} data={tabs[carTypeTab]} loading={loader} />;
  };

  return (
    <Fragment>
      <Slider {...settings} className={`${classes.Slider} fadeIn`} >
        {SliderImages.map((item) => {
          return (
            <div className={classes.SliderDiv} key={item.id}>
              <img src={item.url} alt="" className={classes.SliderImage} />
              <div className={classes.SliderContent}>
                <Typography variant="h2" className={classes.SliderText}>
                  Buy and Sell{" "}
                  <span className={classes.SliderHighlight}>Premium</span>
                </Typography>
                <Typography variant="h2" className={classes.SliderText}>
                  Cars on our Marketplace
                </Typography>
                <div
                  className={classes.SliderInput}
                >
                  <SearchBox placeholder='Search Car' />
                </div>
                <p className="wt-500">
                  or try our{" "}
                  <Link to="/buy-car" className={classes.AdvanceSearchLink}>
                    advanced search
                  </Link>
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    
      <Grid container justify="center" style={{ margin: "35px 0 35px 0" }}>
        <Grid item xs={12} md={10}>
          <Typography variant="h2" className="home-subhead">
            <span className="wt-600">Popular</span> Used Cars
          </Typography>
          <CarSlider giveMargin={true} loading={loader} data={usedCars} />
        </Grid>
        <Grid item xs={12} md={10} className={classes.marginTop}>
          <Typography variant="h2" className="home-subhead">
            <span className="wt-600">Recently</span> Added Cars
          </Typography>
          <div>
            <CarSlider giveMargin={true} loading={loader} data={above10K} />
          </div>
        </Grid>
        <Grid item xs={12} md={10} className={classes.marginTop}>
          <Typography variant="h2" className="home-subhead">
            <span className="wt-600">Featured</span> Used Cars
          </Typography>
          <Tabs
            value={carTypeTab}
            onChange={handleTypeChange}
            TabIndicatorProps={{ style: { background: "#000" } }}
          >
            <Tab label="Sedans" index={0} />
            <Tab label="Hatchbacks" index={1} />
            <Tab label="SUVS" index={2} />
          </Tabs>
          {renderUsedTypeCars()}
        </Grid>
        {/*         
        <Grid item xs={12} md={12} className={classes.AdImage}> */}
        {/* "<Typography variant="h2" className={classes.AdContent}>
            Worried about condition of the car?
          </Typography>
          <Typography variant="h5" className={classes.AdContent}>
            Get a free test drive on your first selection.
          </Typography>
          <Button type="submit" color="primary" className={classes.AdButton}>
            Book Now
          </Button>" */}
        {/* </Grid> */}
        <Grid item xs={12} md={10} className={classes.marginTop}>
          <Typography variant="h2" className="home-subhead">
            <span className="wt-600">Shop</span> by Range
          </Typography>
          <Tabs
            value={rangeTab}
            onChange={handleRangeChange}
            TabIndicatorProps={{ style: { background: "#000" } }}
          >
            <Tab label="UNDER $5000" index={0} />
            <Tab label="UNDER $10000" index={1} />
            <Tab label="ABOVE $10000" index={2} />
          </Tabs>
          {renderRangeCars()}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default compose(withStyles(styles, { withTheme: true }))(Home);
