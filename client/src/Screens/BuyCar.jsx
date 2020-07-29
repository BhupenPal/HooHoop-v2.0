import React, { Component } from "react";
import compose from "recompose/compose";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Box
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from '../assets/material/Buycar'

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
        <Grid container component="main">
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      )
    }
  }
export default compose(
  withStyles(styles, {withTheme: true})
)(BuyCar);