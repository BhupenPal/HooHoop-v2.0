import React, { Component } from "react";
import { Box, Typography, Button, withStyles } from "@material-ui/core";
import SliderImg from '../assets/img/slidercar.png';
import styles from '../assets/material/Buycar';
import "../assets/css/buypage.scss"

const sliderComponent = (props) => {
    const { classes } = props;

    return (
        <Box className='sliderBox'>
            <Box>
                <Typography variant="h3" >Want to get your car listed <br /> at lowest prices?</Typography>
                <Button variant="contained" className={classes.gButton}>Get Started Now</Button>
            </Box>
            <Box>
                <img src={SliderImg} alt=""/>
            </Box>
        </Box>
    );
};

export default withStyles(styles, {withTheme: true })(sliderComponent);