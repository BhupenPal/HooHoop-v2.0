import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getInteriorLinks, getSliderLinks } from "../utils/getImagesUrl";
import AsNavFor from "./Sliders/AsNavFor.jsx";
import View360 from "./View360.jsx";
import Icon360 from "../assets/img/360 Components/360-degree.svg";
function CarPreview({ ImageData, VINum, classes }) {
  console.log(ImageData, VINum);

  const [sliderElements, setSliderElements] = useState([]);
  const [navs, setNavs] = useState([]);

  const [slide, setSlide] = useState(0);

  const makeSliderElements = () => {
    const slider = [];
    const navs = [];

    if (
      !(
        ImageData.InteriorFront ||
        ImageData.InteriorRear ||
        ImageData.InteriorMiddle
      )
    ) {
      slider.push(<View360 images={getInteriorLinks(VINum)} />);
      navs.push(
        <div className={classes.sliderImages} style={{display: "flex",alignItems: "center"}}>
          <img src={Icon360} alt="360 View" height={"50rem"} style={{margin:"auto"}} />
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
        navs.push(
          <img className={classes.sliderImages} src={link} alt="car" />
        );
      });
    }

    setSliderElements(slider);
    setNavs(navs);
  };
  useEffect(() => {
    if (ImageData) {
      makeSliderElements();
    }
  }, [ImageData]);
  if (sliderElements.length < 1) {
    return null;
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
            height: "100% ",
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
          <AsNavFor elements={navs} setSlide={setSlide} />
        </div>
      </Grid>
    </Grid>
  );
}

export default CarPreview;
