// Dependencies
import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import classNames from 'classnames'

import Car from '../assets/img/Rectangle 4.png'
import { Skeleton } from '@material-ui/lab'

// Icons
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const CarSliderStyles = makeStyles((theme) => ({
    SliderCar: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: '2rem auto',
        transition: 'box-shadow 0.2s',
        // '&:hover': {
        boxShadow: '0 0.1rem 1rem rgba(0,0,0,0.2)',
        // },
        [theme.breakpoints.down('md')]: {
            boxShadow: '0 0.1rem 1rem rgba(0,0,0,0.2)',
            width: 250
        }
    },
    SlideCarImage: {
        width: '100%'
    },
    CarDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 15px',
    },
    cardText: {
        color: '#000'
    }
}))

const ForwardIcon = ({ className, style, onClick }) => {
    return (
        <Fragment>
            <ArrowForwardIosIcon style={{ ...style, color: '#708DC7' }} className={className} onClick={onClick} fontSize='large' />
        </Fragment>
    )
}

const BackwardIcon = ({ className, style, onClick }) => {
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
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                nextArrow: null,
                prevArrow: null
            }
        }
    ]
}


const CarSlider = ({ data, loading }) => {
    const classes = CarSliderStyles()

    const viewsHandle = () => {

    }

    const renderSkeletons = () => {
        if (!loading) return null
        return (
            [1, 2, 3, 4].map(item => (
                <div style={{ padding: '1rem 0' }} key={item}>
                    <Skeleton
                        variant='rect'
                        width={280}
                        height={250}
                        style={{ margin: '1rem' }}
                    />
                </div>
            ))
        )
    }

    return (
        <div style={{ width: '100%', margin: '30px 0' }}>
            <Slider {...settings}>
                {renderSkeletons()}
                {
                    data.map(item => {
                        return (
                            <div className='fadeIn' key={item.VINum}>
                                <div className={classes.SliderCar}>
                                    <Link to={`/car/${item.VINum}`}>
                                        <img src={Car} alt='' className={classes.SlideCarImage} />
                                        <div className={classNames(classes.CarDetails, classes.cardText)}>
                                            <div>
                                                <span className="wt-600">{item.Make} {item.Model}</span>
                                                <br />
                                                &#36; {item.Price}
                                            </div>
                                            <div className='flex-jc-center'>
                                                <VisibilityOutlinedIcon style={{ marginRight: 5 }} />
                                                {(item.ViewsCount < 1000) ? item.ViewsCount + ' ' : (item.ViewsCount / 1000).toFixed(1) + 'K '}
                                                Views
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default CarSlider
