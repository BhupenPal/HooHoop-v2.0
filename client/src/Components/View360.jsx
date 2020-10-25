import React, { useEffect, useRef } from "react";
import { PanoViewer } from "@egjs/view360";
import { useState } from "react";
import MiddleImg from "../assets/img/sample-car/interior/middle.jpg";
import RearImg from "../assets/img/sample-car/interior/rear.jpg";


function View360({ url }) {
  const interiorView = useRef(null);
  const panoSet = useRef(null);
  let panoViewer;
  const [randomId, setId] = useState(
    Math.floor(Math.random() * 100).toString()
  );
  const [randomId2, setId2] = useState(
    (Math.floor(Math.random() * 100) + 1).toString()
  );
  const handleChange = (e) => {
    if(e.target.value === "Rear"){
    panoViewer.setImage(RearImg, {
      projectionType: "equirectangular",

     });
    }else{
      panoViewer.setImage(MiddleImg, {
        projectionType: "equirectangular",
  
       });      
    }
  }
  useEffect(() => {
    var srcImage = new Image();
    srcImage.crossOrigin = "anonymous";
    srcImage.src =
      url || MiddleImg;
    const interiorViewContainer = document.getElementById(randomId);
     panoViewer = new PanoViewer(interiorViewContainer, {
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
          minHeight: "25rem",
          // paddingTop: "56.25%",
          position: "relative",
        }}
        id={randomId2}
        ref={panoSet}
      >
        <div
          id={randomId}
          style={{
            width: "100%",
            height: "100%",
            paddingTop: "56.25%",
          }}
          ref={interiorView}
        ></div>
      </div>
      <input
        type="text"
        
      />

      <select name="viewType"
      style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
      onChange={handleChange}
      >
        <option value="Middle">Middle</option>
        <option value="Rear">Rear</option>
      </select>
    </div>
  );
}

export default View360;
