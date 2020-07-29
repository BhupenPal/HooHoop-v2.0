import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, NavLink } from "react-router-dom";
import Slider from "react-slick";

import Car from '../assets/img/Rectangle 4.png'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const CarSliderStyles = makeStyles(() => ({
    SliderCar: {
        width: 280,
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: '0 auto'
    },
    SlideCarImage: {
        width: '100%'
    },
    CarDetails: {
        padding: '8px 15px'
    }
}));

const ForwardIcon = (props) => {
    const { className, style, onClick } = props;
    return (
        <Fragment>
            <ArrowForwardIosIcon style={{...style, color: '#708DC7'}} className={className} onClick={onClick} fontSize='large' />
        </Fragment>
    )
}

const BackwardIcon = (props) => {
    const { className, style, onClick } = props;
    return (
        <Fragment>
            <ArrowBackIosIcon style={{...style, color: '#708DC7'}} className={className} onClick={onClick} fontSize='large' />
        </Fragment>
    )
}

const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <ForwardIcon />,
    prevArrow: <BackwardIcon/>,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const CarSlider = () => {
    const classes = CarSliderStyles();

    return (
        <div style={{ width: '100%', margin: '30px 0' }}>
            <Slider {...settings}>
                <div>
                    <div className={classes.SliderCar}>
                        <img src={Car} alt="" className={classes.SlideCarImage} />
                        <div className={classes.CarDetails}>
                            <div>
                                Ford Mustang
                            </div>
                            <div>
                                ₹ 34 Lakh
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={classes.SliderCar}>
                        <img src={Car} alt="" className={classes.SlideCarImage} />
                        <div className={classes.CarDetails}>
                            <div>
                                Ford Mustang
                            </div>
                            <div>
                                ₹ 34 Lakh
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={classes.SliderCar}>
                        <img src={Car} alt="" className={classes.SlideCarImage} />
                        <div className={classes.CarDetails}>
                            <div>
                                Ford Mustang
                            </div>
                            <div>
                                ₹ 34 Lakh
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={classes.SliderCar}>
                        <img src={Car} alt="" className={classes.SlideCarImage} />
                        <div className={classes.CarDetails}>
                            <div>
                                Ford Mustang
                            </div>
                            <div>
                                ₹ 34 Lakh
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={classes.SliderCar}>
                        <img src={Car} alt="" className={classes.SlideCarImage} />
                        <div className={classes.CarDetails}>
                            <div>
                                Ford Mustang
                            </div>
                            <div>
                                ₹ 34 Lakh
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={classes.SliderCar}>
                        <img src={Car} alt="" className={classes.SlideCarImage} />
                        <div className={classes.CarDetails}>
                            <div>
                                Ford Mustang
                            </div>
                            <div>
                                ₹ 34 Lakh
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={classes.SliderCar}>
                        <img src={Car} alt="" className={classes.SlideCarImage} />
                        <div className={classes.CarDetails}>
                            <div>
                                Ford Mustang
                            </div>
                            <div>
                                ₹ 34 Lakh
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={classes.SliderCar}>
                        <img src={Car} alt="" className={classes.SlideCarImage} />
                        <div className={classes.CarDetails}>
                            <div>
                                Ford Mustang
                            </div>
                            <div>
                                ₹ 34 Lakh
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={classes.SliderCar}>
                        <img src={Car} alt="" className={classes.SlideCarImage} />
                        <div className={classes.CarDetails}>
                            <div>
                                Ford Mustang
                            </div>
                            <div>
                                ₹ 34 Lakh
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={classes.SliderCar}>
                        <img src={Car} alt="" className={classes.SlideCarImage} />
                        <div className={classes.CarDetails}>
                            <div>
                                Ford Mustang
                            </div>
                            <div>
                                ₹ 34 Lakh
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default CarSlider;
