import React, { Component } from "react";
import Slider from "react-slick";

export default ({elements,setSlide}) => {

    const settings = {
      dots:false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
      responsive: [
        {
            breakpoint: 720,
            settings: {
                slidesToShow: 3.2,
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
                    <div style={{textAlign:"center",cursor:"pointer"}} onClick={() => setSlide(index)}>
                        {elem}
                    </div>
                ))
            }
         </Slider>
      </div>
    );
  }