import React, { Component, useEffect, useState } from "react";
import compose from "recompose/compose";
import {
  Grid, makeStyles,
} from "@material-ui/core";
import styles from '../assets/material/Buycar';
import CardComponent from '../Components/CardComponent.jsx';
import SliderComponent from '../Components/sliderComponent.jsx';
import FilterComponent from '../Components/filterComponent.jsx';
import { fetchBuyCar } from "../services/fetchCar";

const useStyles = makeStyles(styles);
const BuyCar = () => {
      const classes  = useStyles();
      const [cars,setCars] = useState([]);
      useEffect(() => {
        fetchBuyCar()
        .then(res => {
         // console.log(res.docs)
          setCars([...res.docs.slice(0,10)])
        })
      },[])

      const renderCars = () => {
        console.log(cars)
        return cars.map((car) => <CardComponent />);
      }
      return ( 
        <Grid container justify="center" component="main" className={classes.pageDefault}>
          <Grid item container xs={12} sm={2}>
            <FilterComponent />
            </Grid>
          <Grid item container xs={12} sm={8} justify="center">
            {renderCars()}
          </Grid>
        </Grid>
      )
    }
  
export default (BuyCar);