import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import Slider from "react-slick";
import styles from '../assets/material/Home'
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from '@material-ui/core';
// Slider Images
import IndexBackground from '../assets/img/Home/IndexBackground.png'
import WoxWagon from '../assets/img/Home/woxwagon.png'
import Sports from '../assets/img/Home/sports.png'

import CarSlider from '../Components/CarSlider.jsx'

class Home extends Component {
  render() {
    const { classes } = this.props

    const SliderImages = [
      { id: 1, url: IndexBackground },
      { id: 2, url: WoxWagon },
      { id: 3, url: Sports }
    ]

    const settings = {
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Fragment>
        <Slider {...settings}>
          {
            SliderImages.map(item => {
              return (
                <div className={classes.SliderDiv} key={item.id}>
                  <img src={item.url} alt="" className={classes.SliderImage} />
                  <div>
                    Hello
                  </div>
                </div>
              )
            })
          }
        </Slider>
        <Grid container justify='center' style={{ margin: '35px 0 85px 0' }}>
          <Grid item xs={10}>
            <Typography variant='h2' className='home-subhead'><span className='wt-600'>Popular</span> Used Cars</Typography>
            <CarSlider />
          </Grid>
          <Grid item xs={10} style={{ marginTop: 70 }}>
            <Typography variant='h2' className='home-subhead'><span className='wt-600'>Recently</span> Added Cars</Typography>
            <CarSlider />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default compose(withStyles(styles, { withTheme: true }))(Home);
