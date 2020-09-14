import React, { Fragment, useState, useEffect } from "react";
import compose from "recompose/compose";
import Slider from "react-slick";
import styles from "../assets/material/Home";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Tabs, Tab, AppBar } from "@material-ui/core";
import axios from "axios";

// Slider Images
import IndexBackground from "../assets/img/Home/IndexBackground.png";
import WoxWagon from "../assets/img/Home/woxwagon.png";
import Sports from "../assets/img/Home/sports.png";

import Advertise from "../assets/img/Home/Advetisement.png";

import CarSlider from "../Components/CarSlider.jsx";

function Home(props) {
  const { classes } = props;

  const [carsData, setCarsData] = useState([]);
  const [rangeTab, setRangeTab] = useState(0);

  useEffect(() => {
    axios
      .get("/api/")
      .then((res) => {
        setCarsData(res.data);
      })
      .catch((err) => {
        alert("Error fetching data");
        console.log(err);
      });
  }, []);
  
  const SliderImages = [
    { id: 1, url: IndexBackground },
    { id: 2, url: WoxWagon },
    { id: 3, url: Sports },
  ];

  const settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleRangeChange = (e,index) => {
  
    setRangeTab((val) => index);
  };
  let {usedCars = [],under5K = [],under10K = [],above10K = []} = carsData;

  const renderRangeCars = () => {
    const tabs = [under5K,under10K,above10K];
    return <CarSlider data={tabs[rangeTab]} />
  }
  return (
    <Fragment>
      <Slider {...settings}>
        {SliderImages.map((item) => {
          return (
            <div className={classes.SliderDiv} key={item.id}>
              <img src={item.url} alt="" className={classes.SliderImage} />
            </div>
          );
        })}
      </Slider>
      <Grid container justify="center" style={{ margin: "35px 0 85px 0" }}>
        <Grid item xs={10}>
          <Typography variant="h2" className="home-subhead">
            <span className="wt-600">Popular</span> Used Cars
          </Typography>
          <CarSlider data={usedCars} />
        </Grid>
        <Grid item xs={10} style={{ marginTop: 70 }}>
          <Typography variant="h2" className="home-subhead">
            <span className="wt-600">Recently</span> Added Cars
          </Typography>
          <CarSlider data={above10K} />
        </Grid>
        <Grid item xs={10} style={{ marginTop: 70 }}>
          <Typography variant="h2" className="home-subhead">
            <span className="wt-600">Feautured</span> Used Cars
          </Typography>
          <Tabs value={1} TabIndicatorProps={{ style: { background: "#000" } }}>
            <Tab label="Sedans" />
            <Tab label="Hatchbacks" />
            <Tab label="SUVS" />
          </Tabs>
          <CarSlider data={above10K} />
        </Grid>
        <Grid item xs={12}>
          <img src={Advertise} alt="" className={classes.AdImage} />
        </Grid>
        <Grid item xs={10} style={{ marginTop: 70 }}>
          <Typography variant="h2" className="home-subhead">
            <span className="wt-600">Shop</span> by Range
          </Typography>
 
          <Tabs
            value={rangeTab}
            onChange={handleRangeChange}
            TabIndicatorProps={{ style: { background: "#000" } }}
          >
            <Tab label="UNDER 5000" index={0} />
            <Tab label="UNDER 10000" index={1} />
            <Tab label="Above 10000" index={2} />
          </Tabs>
          {renderRangeCars()}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default compose(withStyles(styles, { withTheme: true }))(Home);
