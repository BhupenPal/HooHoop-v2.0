import React, { Component } from "react";
import compose from "recompose/compose";
import {
  Grid,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from '../assets/material/Buycar';
import CardComponent from '../Components/CardComponent.jsx';
import SliderComponent from '../Components/sliderComponent.jsx';
import FilterComponent from '../Components/filterComponent.jsx';

class BuyCar extends Component {
    constructor(props){
      super(props);

      this.state = {
        Email: "",
        Password: "",
        Remember: false,
        Errors: null,
      };
    }
    render() {
      const { classes } = this.props
      return ( 
        <Grid container justify="center" component="main" className={classes.pageDefault}>
          <Grid item container xs={12} sm={2}>
            <FilterComponent />
            </Grid>
          <Grid item container xs={12} sm={8} justify="center">
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <SliderComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </Grid>
        </Grid>
      )
    }
  }
export default compose(
  withStyles(styles, {withTheme: true})
)(BuyCar);