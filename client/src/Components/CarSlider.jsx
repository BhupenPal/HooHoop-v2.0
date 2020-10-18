import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, NavLink } from "react-router-dom";
import Slider from "react-slick";

import Car from '../assets/img/Rectangle 4.png'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Skeleton } from "@material-ui/lab";

const CarSliderStyles = makeStyles((theme) => ({
    SliderCar: {
        width: 280,
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: '2rem auto',
        transition: "box-shadow 0.2s",
        "&:hover" :{
            boxShadow:"0 0.1rem 1rem rgba(0,0,0,0.2)"
        },
        [theme.breakpoints.down('md')]: {
            boxShadow:"0 0.1rem 1rem rgba(0,0,0,0.2)"  
        }
    },
    SlideCarImage: {
        width: '100%'
    },
    CarDetails: {
        padding: '8px 15px',
    },
    cardText: {
        color: "#000"
    }
}));

const ForwardIcon = (props) => {
    const { className, style, onClick } = props;
    return (
        <Fragment>
            <ArrowForwardIosIcon style={{ ...style, color: '#708DC7' }} className={className} onClick={onClick} fontSize='large' />
        </Fragment>
    )
}

const BackwardIcon = (props) => {
    const { className, style, onClick } = props;
    return (
        <Fragment>
            <ArrowBackIosIcon style={{ ...style, color: '#708DC7' }} className={className} onClick={onClick} fontSize='large' />
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
    prevArrow: <BackwardIcon />,
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
                slidesToShow: 1.4,
                slidesToScroll: 1,
                nextArrow: null,
                prevArrow:null,
            }
        }
    ]
};


const CarSlider = ({ data, loading }) => {
    const classes = CarSliderStyles();
    const renderSkeletons = () => {
        if (!loading) return null;
        return (
            [1, 2, 3, 4].map(item => (
                <div style={{ padding: "1rem 0" }} key={item}>
                    <Skeleton
                        variant="rect"
                        width={280}
                        height={250}
                        style={{ margin: "1rem" }}
                    />
                </div>
            ))
        );
    };

    return (
        <div style={{ width: '100%', margin: '30px 0' }}>
            <Slider {...settings}>
                {renderSkeletons()}

                {
                    data.map(item => {
                        return (
                            <Link to={`/car/${item.VINum}`} key={item.VINum}>
                                <div className="fadeIn">
                                    <div className={classes.SliderCar}>
                                        <img src={Car} alt="" className={classes.SlideCarImage} />
                                        <div className={classes.CarDetails}>
                                            <div className={classes.cardText}>
                                                {item.Make}
                                            </div>
                                            <div className={classes.cardText}>
                                                &#36; {item.Price}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </Slider>
        </div>
    );
};

export default CarSlider;
