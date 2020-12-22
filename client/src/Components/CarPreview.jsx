import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getInteriorLink, getSliderLinks } from "../utils/getImagesUrl";

import AsNavFor from "./Sliders/AsNavFor.jsx";
import View360 from "./View360.jsx";
import Icon360 from "../assets/img/360 Components/360-degree.svg";
import View360Slides from "./View360Slides.jsx";
import { Skeleton } from "@material-ui/lab";
import InteriorIcon from "../assets/img/svgs/interior.svg";
import ExteriorIcon from "../assets/img/svgs/exterior.svg";

function CarPreview({ ImageData, VINum, classes }) {
  const [sliderElements, setSliderElements] = useState([]);
  const [navs, setNavs] = useState([]);
  const [slide, setSlide] = useState(0);
  const [buttons, setButtons] = useState([]);
  let [sliderNavStart, setNavStart] = useState(0);
  const makeSliderElements = () => {
    const slider = [];
    const navImages = [];
   
    if (
      ImageData.Interior
    ) {
      slider.push(
        <View360
          key={1}
          image={getInteriorLink(VINum)}
        />
      );
      navImages.push(
        <div
          className={classes.sliderImages}
          style={{
            display: "none",
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
      setNavStart((val) => 1);
      setButtons((arr) => {
        return [
          <button onClick={() => setSlide(0)} className={classes.button360}>
            <img src={InteriorIcon} alt={"interior"} />
          </button>,
        ];
      });
    }
    if (ImageData.VideoFrames && ImageData.VideoFrames > 0) {
      slider.push(
        <View360Slides
          key={2}
          VINum={VINum}
          noOfFrames={ImageData.VideoFrames}
        />
      );
      setNavStart((val) => (val ? 2 : 1));
      navImages.push(
        <div
          className={classes.sliderImages}
          style={{
            display: "none",
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
      setButtons((arr) => {
        const button = (
          <button
            onClick={() =>
              setSlide(
                Number(
				  ImageData.Interior                
				)
              )
            }
            className={classes.button360}
          >
            <img src={ExteriorIcon} alt={"exterior"} />
          </button>
        );
        arr = arr[0] ? [arr[0], button] : [button];
        return arr;
      });
    }
    if (ImageData.SliderCount && ImageData.SliderCount > 0) {
      getSliderLinks(VINum, ImageData.SliderCount).forEach((link) => {
        slider.push(
          <div
            key={slider.length + 2}
            style={{
              textAlign: "center",
              backgroundImage: `url(${link})`,
              backgroundSize: "cover",
              paddingTop: "56.25%",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        );
        navImages.push(
          <img
            key={navImages.length}
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
  const setSlideFromNav = (index) => {
    setSlide(index + sliderNavStart);
  };
  if (sliderElements.length < 1) {
    const SkeletonNavs = [
      <Skeleton variant="rect" className={classes.sliderImages} key={1} />,
      <Skeleton variant="rect" className={classes.sliderImages} key={2} />,
      <Skeleton variant="rect" className={classes.sliderImages} key={3} />,
      <Skeleton variant="rect" className={classes.sliderImages} key={4} />,
    ];
    return (
      <Grid
        item
        container
        className={classes.imagesContainer}
        style={{ position: "relative" }}
        xs={12}
      >
        <Grid item container xs={12}>
          <Skeleton
            variant="rect"
            width={"100%"}
            height={"100%"}
            style={{ paddingTop: "56.25%" }}
          />
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
          <div className={classes.buttons360}>{buttons}</div>
        </div>
      </Grid>
      <Grid item container xs={12}>
        <div style={{ width: "100%" }}>
          <AsNavFor
            elements={navs.slice(sliderNavStart)}
            setSlide={setSlideFromNav}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default CarPreview;
