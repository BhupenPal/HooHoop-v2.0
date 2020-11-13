import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getInteriorLinks, getSliderLinks } from "../utils/getImagesUrl";

import AsNavFor from "./Sliders/AsNavFor.jsx";
import View360 from "./View360.jsx";
import Icon360 from "../assets/img/360 Components/360-degree.svg";
import View360Slides from "./View360Slides.jsx";
import { Skeleton } from "@material-ui/lab";
function CarPreview({ ImageData, VINum, classes }) {
  console.log(ImageData, VINum);

  const [sliderElements, setSliderElements] = useState([]);
  const [navs, setNavs] = useState([]);
  const [slide, setSlide] = useState(0);

  const makeSliderElements = () => {
    const slider = [];
    const navImages = [];

    if (
      (
        ImageData.InteriorFront ||
        ImageData.InteriorRear ||
        ImageData.InteriorMiddle
      )
    ) {
      slider.push(<View360 images={getInteriorLinks(VINum)} />);
      navImages.push(
        <div
          className={classes.sliderImages}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Icon360}
            alt="360 View"
            height={"40rem"}
            style={{ margin: "0 auto" }}
          />
          <div>Interior</div>
        </div>
      );
    }
    if (ImageData.VideoFrames && ImageData.VideoFrames > 0) {
      slider.push(
        <View360Slides VINum={VINum} noOfFrames={ImageData.VideoFrames} />
      );
      navImages.push(
        <div
          className={classes.sliderImages}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Icon360}
            alt="360 View"
            height={"40rem"}
            style={{ margin: "0 auto" }}
          />
          <div>Exterior</div>
        </div>
      );
    }
    if (ImageData.SliderCount && ImageData.SliderCount > 0) {
      getSliderLinks(VINum, ImageData.SliderCount).forEach((link) => {
        slider.push(
          <div style={{ textAlign: "center" }}>
            <img style={{ height: "100%", width: "100%" }} src={link} />
          </div>
        );
        navImages.push(
          <img
            className={classes.sliderImages}
            height={"100%"}
            width={"100%"}
            src={link}
            alt="car"
          />
        );
      });
    }

    setSliderElements(slider);
    setNavs(navImages);
  };
  useEffect(() => {
    if (ImageData) {
      makeSliderElements();
    }
  }, [ImageData]);
  console.log(navs);

  if (sliderElements.length < 1) {
    const SkeletonNavs = [
      <Skeleton variant="rect" className={classes.sliderImages} key={1} />,
      <Skeleton variant="rect" className={classes.sliderImages} key={2} />,
      <Skeleton variant="rect" className={classes.sliderImages} key={3} />,
      <Skeleton variant="rect" className={classes.sliderImages} key={4} />,

    ]
    return (
      <Grid
      item
      container
      className={classes.imagesContainer}
      style={{ position: "relative" }}
      xs={12}
      md={8}
    >
      <Grid item container xs={12}>
        <Skeleton variant="rect" width={"100%"} height={"100%"} style={{paddingTop:"56.25%"}} />
      </Grid>
      <Grid item container xs={12}>
        <div style={{ width: "100%" }}>
        <AsNavFor elements={SkeletonNavs} setSlide={setSlide} />

        </div>
      </Grid>
    </Grid>
    );
  }
  return (
    <Grid
      item
      container
      className={classes.imagesContainer}
      style={{ position: "relative" }}
      xs={12}
      md={8}
    >
      <Grid item container style={{ position: "relative" }} xs={12}>
        <div
          style={{
            //height: "100%",
            width: "100%",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {sliderElements[slide]}
        </div>
      </Grid>
      <Grid item container xs={12}>
        <div style={{ width: "100%" }}>
          {console.log("check", navs)}
          <AsNavFor elements={navs} setSlide={setSlide} />
        </div>
      </Grid>
    </Grid>
  );
}

export default CarPreview;
