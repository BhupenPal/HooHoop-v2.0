// Dependencies
import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import classNames from 'classnames'
import { Skeleton } from '@material-ui/lab'

// Icons
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { getThumbnailLink } from '../../utils/getImagesUrl'

const CarSliderStyles = makeStyles(theme => ({
	SliderCar: {
		width: 300,
		backgroundColor: '#fff',
		borderRadius: 5,
		margin: '2rem auto',
		transition: 'box-shadow 0.2s',
		display: "flex",
		flexDirection: 'column',
		justifyContent: "center",
		boxShadow: '0 0.1rem 1rem rgba(0,0,0,0.2)',
		[theme.breakpoints.down('md')]: {
			width: 250,
		}
	},
	smMargin: {
		[theme.breakpoints.down('md')]: {
			margin: '1rem',
		}
	},
	HideBoxShadow: {
		boxShadow: 'none !important'
	},
	SlideCarImage: {
		objectFit: "cover",
		width: '100%',
		height: "15rem"
	},
	SlideCarViews: {
		fontSize: "0.7rem"
	},
	CarDetails: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: "flex-start",
		padding: '8px 15px',
	},
	cardText: {
		color: '#000'
	},
	hideBelowMD: {
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
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

const CarSlider = ({ data, loading, giveMargin }) => {
	const classes = CarSliderStyles()

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: Math.min(data?.length || 4, 4),
		slidesToScroll: 1,
		initialSlide: 0,
		nextArrow: <ForwardIcon />,
		prevArrow: <BackwardIcon />,
		responsive: [
			{
				breakpoint: 1450,
				settings: {
					slidesToShow: Math.min(data?.length || 3, 3),
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: Math.min(data?.length || 3, 3),
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: Math.min(data?.length || 2, 2),
					slidesToScroll: 1,
					arrows: false,

				}
			},
			{
				breakpoint: 480,
				settings: {
					infinite: false,
					slidesToShow: Math.min(data?.length || 1.3, 1.3),
					slidesToScroll: 1,
					arrows: false
				}
			}
		]
	}

	const renderSkeletons = () => {
		return (
			<div style={{ width: '100%', margin: '30px 0' }}>

				<Slider {...settings}>
					{
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
							<div key={item}>
								<div className={classNames(classes.SliderCar, classes.HideBoxShadow)}>
									<Skeleton
										variant='rect'
										height={250}
										className={classes.SlideCarImage}
									/>
									<div className={classes.CarDetails} style={{ width: 300, padding: '10px 0' }}>
										<div>
											<Skeleton
												variant='rect'
												width={150}
												height={18}
												style={{ marginBottom: 5 }}
											/>
											<Skeleton
												variant='rect'
												width={80}
												height={18}
											/>
										</div>
										<div className={classNames('flex-jc-center', classes.hideBelowMD)}>
											<Skeleton
												variant='rect'
												width={80}
												height={18}
											/>
										</div>
									</div>
								</div>
							</div>
						))
					}
				</Slider>
			</div>
		)

	}

	if (loading) {
		return renderSkeletons();
	}

	return (
		<div style={{ width: '100%', margin: '30px 0' }}>
			<Slider {...settings}>

				{
					data.map(item => {
						const carName = `${item.Make} ${item.Model}`;
						return (
							<div className='fadeIn' key={item.VINum} title={carName}>
								<div className={`${classes.SliderCar} ${giveMargin ? classes.smMargin : ''} `}>
									<Link to={`/car/${item.VINum}`}>
										<img src={getThumbnailLink(item.VINum)} alt='' className={classes.SlideCarImage} />
										<div className={classNames(classes.CarDetails, classes.cardText)}>
											<div>
												<span className="wt-600">{carName.slice(0, 15) + (carName.length > 15 ? "..." : "")}</span>
												<br />
                                                &#36; {item.Price}
											</div>
											<div className={`${classes.SlideCarViews} flex-jc-center`}>
												<VisibilityOutlinedIcon style={{ marginRight: 5, fontSize: "1rem" }} />
												{(item.ViewsCount < 1000) ? item.ViewsCount + ' ' : (item.ViewsCount / 1000).toFixed(1) + 'K '}
                                                View{item.ViewsCount > 1 ? "s" : ""}
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