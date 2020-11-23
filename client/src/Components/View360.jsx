import React, { useEffect, useRef } from "react";
import { PanoViewer } from "@egjs/view360";
import { useState } from "react";
import MiddleImg from "../assets/img/sample-car/interior/middle.jpg";
import RearImg from "../assets/img/sample-car/interior/rear.jpg";

const CONSTANTS = {
  REAR: "rear",
  FRONT: "front",
  MIDDLE: "middle",
};

function View360({ images }) {
  const interiorView = useRef(null);
  const panoSet = useRef(null);
  const [currentView, setCurrentView] = useState(CONSTANTS.MIDDLE);
  const [panoViewer,setPanoViewer] = useState({});
  //let panoViewer = {};
  const [randomId, setId] = useState(
    Math.floor(Math.random() * 100).toString()
  );
  const [randomId2, setId2] = useState(
    (Math.floor(Math.random() * 100) + 1).toString()
  );
  const handleChange = (e) => {
    console.log(e.target.value);
    setCurrentView(e.target.value);
  };
  useEffect(() => {
    var srcImage = new Image();
    srcImage.crossOrigin = "anonymous";
    console.log(currentView);
    srcImage.src = images[currentView] || MiddleImg;
    const interiorViewContainer = document.getElementById("pano-adjustable");
    const pano = new PanoViewer(interiorViewContainer, {
      //image: "src/assets/img/sample-car/interior/middle.jpg",
      image: srcImage,
      projectionType: "equirectangular",
      gyroMode: "yawPitch",
    });
    setPanoViewer(val => {
      const panoSetContainer = document.getElementById(randomId2);
      PanoControls.init(panoSetContainer, pano, {
        enableGyroOption: true,
        enableTouchOption: true,
      });
      PanoControls.showLoading();
      return pano
    });
    
  }, []);
  useEffect(() => {
    if("setImage" in panoViewer){
      panoViewer.setImage(images[currentView], {
        projectionType: "equirectangular",
        // fullscreen:true,
        
      });
      PanoControls.showLoading();

    }
  }, [currentView]);

  return (
    <div
      style={{ width: "100%", height: "100%"  }}
      className="panoviewer-container viewer"
    >
      <div
        style={{
          width: "100%",
          position: "relative",
          
        }}
        id={randomId2}
        ref={panoSet}
      >
        <div
          id={"pano-adjustable"}
          
          style={{
            height:"100%",
            paddingTop: "56.25%",
          }}
          ref={interiorView}
        ></div>
      </div>

      <select
        name="viewType"
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        value={currentView}
        onChange={handleChange}
      >
        <option value={CONSTANTS.MIDDLE}>Middle</option>
        <option value={CONSTANTS.FRONT}>Front</option>
        <option value={CONSTANTS.REAR}>Rear</option>
      </select>
    </div>
  );
}

export default View360;
