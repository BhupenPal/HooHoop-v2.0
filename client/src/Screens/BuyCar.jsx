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
import useDebounce from "../Hooks/useDebounce.js";

const useStyles = makeStyles(styles);
const BuyCar = () => {
      const classes  = useStyles();
      const [cars,setCars] = useState([]);
      const [query,setQuery] = useState("");

      const debouncedQuery = useDebounce(query,1000)
      useEffect(() => {
        if (debouncedQuery) {
          // Set isSearching state
         // setIsSearching(true);
          // Fire off our API call
          fetchBuyCar(1,debouncedQuery).then(results => {
            // Set back to false since request finished
           // setIsSearching(false);
            // Set results state
            console.log("hi")
            setCars(results);
          });
        } else {
          setCars([]);
        }
      },[debouncedQuery])

      const renderCars = () => {

        return (cars.map((car,index) => <CardComponent key={index} car={car}/>));
      }
      return ( 
        <Grid container justify="center" component="main" className={classes.pageDefault}>
          <Grid item container xs={12} sm={3}>
            <FilterComponent setQuery={setQuery}/>
            </Grid>
           <Grid item container xs={12} sm={9} justify="center">
              {renderCars()}
      
         </Grid>
        </Grid>
      )
    }
  
export default (BuyCar);