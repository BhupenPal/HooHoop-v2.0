import React, { Component } from "react";
import Slider from "react-slick";

export default ({elements,setSlide}) => {
    console.log("called",elements)
    const settings = {
      dots:false,
      speed: 500,
      slidesToShow: elements.length < 4 ? elements.length : 4,
      slidesToScroll: 1,
      responsive: [
        {
            breakpoint: 720,
            settings: {
                slidesToShow: elements.length < 3 ? elements.length : 3.2,
                slidesToScroll: 1,
                initialSlide: 0,
                arrows:false,

            }
        }
      ]
    };

    return (
      <div className="asNavFor">
        <Slider {...settings}>
            {
                elements.map((elem,index) => (
                    <div key={index} style={{textAlign:"center",cursor:"pointer"}} onClick={() => setSlide(index)}>
                        {elem}
                    </div>
                ))
            }
         </Slider>
      </div>
    );
  }
