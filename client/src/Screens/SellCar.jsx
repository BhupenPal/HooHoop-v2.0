import React, { Component } from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  TextField,
  Divider
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from '../assets/material/SellForm';
import SellBackCar from '../assets/img/SellCar/sellbackground.png'
import ImageIcon from '../assets/img/svgs/Image.svg';
import EditIcon from '../assets/img/svgs/edit-3.svg';
import HappyCarIcon from '../assets/img/svgs/Car.svg';
import FileTextIcon from '../assets/img/svgs/file-text.svg';
import '../assets/css/sellcarpage.scss';
import CarDetails from '../assets/data/CarDetails';
import SelectBox from '../Components/SelectBox.jsx';
import AddIcon from '@material-ui/icons/Add';


const SellCar = (props) => {
    const {classes} = props;

    return(
        <Grid container justify="center" component="main" className={classes.pageDefault}>
            <Grid item container xs={12} className={classes.APIGrid}>
                <img src={SellBackCar} className={classes.backgroundImg} alt=""/>
                <Grid item container xs={9} justify="center" className={classes.ApiEncloser}>
                    <Box className={classes.ContainerType_one}>
                        <div size="small" className="IconImage"><img src={HappyCarIcon}/><span>Car Details</span></div>
                        <hr className={classes.Horizontal} />
                        <div size="small" className="IconImage"><img src={FileTextIcon}/><span>Other Details</span></div>
                        <hr className={classes.Horizontal} />
                        <div size="small" className="IconImage"><img src={EditIcon}/><span>Description</span></div>
                        <hr className={classes.Horizontal} />
                        <div size="small" className="IconImage"><img src={ImageIcon}/><span>Upload Images</span></div>
                    </Box>
                    <Box className={classes.ContainerType_one} id="APIbox">
                        <Typography component="h3" variant="h5">Tell us about the car you are selling</Typography>
                        <div className="searchField">
                            <TextField id="outlined-basic" label="Enter your number plate" variant="outlined" />
                            <button>Search</button>
                        </div>
                        <Box display="flex" flexDirection="column" alignItems="center" className="FetchData">
                            <Typography component="h3" variant="h4">Car Details</Typography>
                            <div className="DetailsContainer">
                                {
                                    CarDetails.map((item, index) => {
                                    return <span key={index}>{item.DetailName} : <span>{item.DummyData}</span></span>
                                    })
                                }
                            </div>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container item className={classes.FormGrid} xs={10} justify="center">
                <Box className="PriceSetter" display="flex" alignItems="center">
                    <Typography component="h1" variant="h2">Selling price details</Typography>
                    <TextField className="priceinputs" type="number" label="Preffered selling price" variant="outlined" />
                    <TextField className="priceinputs" type="number" label="Minimum selling price" variant="outlined" />
                </Box>
                <Grid item className={classes.FromFetch} xs={12}>
                    <Grid className="Fetched_Details">
                        <div className="BasicDetails">
                            <Typography component="h3" variant="h5">Please Enter the details of your car</Typography>
                            <SelectBox Label="Select Maker" />
                            <SelectBox Label="Model" />
                            <SelectBox required={true} Label="Model Year" />
                            <SelectBox required={true} Label="Body Type" />
                            <SelectBox required={true} Label="Transmission" />
                            <SelectBox required={true} Label="Engine Size" />
                            <SelectBox required={true} Label="Fuel Type" />
                            <SelectBox required={true} Label="Kilometers Ran" />
                            <SelectBox required={true} Label="Color Type" />
                            <SelectBox required={true} Label="Number Plate" />
                            <SelectBox required={true} Label="Number of seats" />
                            <SelectBox required={true} Label="Number of doors" />
                        </div>
                        <div className="ExtraDetails">
                            <Typography component="h3" variant="h5">Help us know more about your car</Typography>
                            <SelectBox Label="Model Detail" />
                            <SelectBox Label="Import History" />
                            <SelectBox Label="Previous Oweners" />
                            <SelectBox Label="Cylinders" />
                            <SelectBox Label="Registration Expiry" />
                            <TextField label="WOF" variant="outlined" />
                        </div>
                    </Grid>
                    <Grid>
                        <div className="Description">
                            <Typography component="h3" variant='h5'>Describe your car in 300-500 words</Typography>
                            <TextField
                                id="outlined-textarea"
                                label="Description"
                                placeholder="Describe Here"
                                multiline
                                variant="outlined"
                                rows={10}
                                rowsMax={10}
                            />
                        </div>
                        <div className="FileUpload">
                            <Typography component="h3" variant='h5'>Upload Car Images</Typography>
                            <div className="InteriorImages">
                                <Typography component="h3" variant='h5'>Upload Interior Images</Typography>
                                <div>
                                    <Button><AddIcon /></Button>
                                    <Button><AddIcon /></Button>
                                    <Button><AddIcon /></Button>
                                </div>
                            </div>
                            <Divider orientation="vertical" flexItem />
                            <div className="ExteriorImages">
                                <Typography component="h3" variant='h5'>Upload Exterior Images</Typography>
                                <div>
                                    <Button><AddIcon /></Button>
                                    <Button><AddIcon /></Button>
                                </div>
                            </div>
                        </div>
                        <Box display="flex" justifyContent="flex-end">
                            <Button className={classes.LoginButton}>SUBMIT</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles, {withTheme: true})(SellCar);