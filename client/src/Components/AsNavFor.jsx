import React, { Component } from "react";
import Slider from "react-slick";

export default ({elements,setSlide}) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };

    return (
      <div className="asNavFor">
        <Slider {...settings}>
            {
                elements.map((elem,index) => (
                    <div onClick={() => setSlide(index)}>
                        {elem}
                    </div>
                ))
            }
         </Slider>
      </div>
    );
  }
