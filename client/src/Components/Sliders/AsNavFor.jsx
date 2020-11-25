import React, { Fragment } from "react";
import Slider from "react-slick";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const ForwardIcon = ({ className, style, onClick }) => {
  return (
      <Fragment>
          <ArrowForwardIosIcon style={{ ...style, color: '#708DC7' }} className={className} onClick={onClick} fontSize='small' />
      </Fragment>
  )
}

const BackwardIcon = ({ className, style, onClick }) => {
  return (
      <Fragment>
          <ArrowBackIosIcon style={{ ...style, color: '#708DC7' }} className={className} onClick={onClick} fontSize='small' />
      </Fragment>
  )
}

export default ({elements,setSlide}) => {
    console.log("called",elements)
    const settings = {
      dots:false,
      speed: 500,
      slidesToShow: (elements.length < 4) ? elements.length : 4,
      slidesToScroll: 1,
      nextArrow: <ForwardIcon />,
      prevArrow: <BackwardIcon />,
      responsive: [
        {
            breakpoint: 720,
            settings: {
                slidesToShow: elements.length <= 3 ? elements.length : 3.2,
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
