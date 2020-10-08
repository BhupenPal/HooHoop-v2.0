import React, { useEffect, useRef } from "react";
import { PanoViewer } from "@egjs/view360";
import { useState } from "react";

function View360({ url }) {
  const interiorView = useRef(null);
  const panoSet = useRef(null);
  const [randomId,setId] = useState((Math.floor(Math.random()* 100) ).toString());
  const [randomId2,setId2] = useState((Math.floor(Math.random()* 100)  + 1).toString());

  useEffect(() => {
    var srcImage = new Image();
    srcImage.crossOrigin = "anonymous";
    srcImage.src =
      url ||
      "https://naver.github.io/egjs-view360/examples/panoviewer/controls/equi-car-inside.jpg";
    const interiorViewContainer = document.getElementById(randomId);
    const panoViewer = new PanoViewer(interiorViewContainer, {
      //image: "src/assets/img/sample-car/interior/middle.jpg",
      image: srcImage,
      projectionType: "equirectangular",
      gyroMode: "yawPitch",
    });
    console.log(panoViewer);
    const panoSetContainer = document.getElementById(randomId2);
    PanoControls.init(panoSetContainer, panoViewer, {
      enableGyroOption: true,
      enableTouchOption: true,
    });
    PanoControls.showLoading();
  });
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="panoviewer-container viewer"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "20rem",
          position: "relative",
        }}
        id={randomId2}
        ref={panoSet}
      >
        <div
          id={randomId}
          style={{ width: "100%", height: "100%" }}
          ref={interiorView}
        ></div>
      </div>
    </div>
  );
}

export default View360;
