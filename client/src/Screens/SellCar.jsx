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
import axios from 'axios'

const SellCar = (props) => {
    const {classes} = props;
    let dataarray = [];
    const [dataobject, changedata] = React.useState({
        Make : '',
        Model : '',
        Year : '',
        BodyStyle : '',
        Transmission : '',
        EngineSize : '',
        FuelType : '',
        Kilometers : '',
        Color : '',
        Plate : '',
        Seats : '',
        Doors : ''
    })

    const FetchJam = () => {
        var platenum = document.getElementsByName("platenum")[0].value
        axios.get(`/api/user/car-data-fetch/${platenum}`)
        .then(res => {
            console.log(res.data)
            document.querySelector("#Make").textContent = res.data.make
            document.querySelector("#Year").textContent = res.data.year_of_manufacture
            document.querySelector("#BodyStyle").textContent = res.data.body_style
            document.querySelector("#Model").textContent = res.data.model
            document.querySelector("#NoOweners").textContent = res.data.number_of_owners
            document.querySelector("#Color").textContent = res.data.main_colour
            document.querySelector("#FuelType").textContent = res.data.fuel_type
            document.querySelector("#VIN").textContent = res.data.vin
            document.querySelector("#EngineNo").textContent = res.data.engine_no
            document.querySelector("#PlateNumber").textContent = res.data.plate
            document.querySelector("#Chassis").textContent = res.data.chassis
            document.querySelector("#Seats").textContent = res.data.no_of_seats
            dataarray.push(res.data);
            changedata({
                Make : res.make,
                Model : res.model,
                Year : res.year_of_manufacture,
                BodyStyle : res.body_style,
                Transmission : res.transmission,
                EngineSize : res.cc_rating,
                FuelType : res.fuel_type,
                Kilometers : res.latest_odometer_reading,
                Color : res.main_colour,
                Plate : res.plate,
                Seats : res.no_of_seats,
                Doors : 5
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <Grid container justify="center" component="main" className={classes.pageDefault}>
            <Grid item container xs={12} className={classes.APIGrid}>
                <img src={SellBackCar} className={classes.backgroundImg} alt=""/>
                <Grid item container xs={11} md={9} justify="center" className={classes.ApiEncloser}>
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
                            <TextField id="outlined-basic" name="platenum" label="Enter your number plate" variant="outlined" />
                            <button onClick={() => FetchJam()}>Search</button>
                        </div>
                        <Box display="flex" flexDirection="column" alignItems="center" className="FetchData">
                            <Typography component="h3" variant="h4">Car Details</Typography>
                            <div className="DetailsContainer">
                                <span>Make : <span id="Make"></span></span>
                                <span>Year : <span id="Year"></span></span>
                                <span>Body Style : <span id="BodyStyle"></span></span>
                                <span>Model : <span id="Model"></span></span>
                                <span>No of Oweners : <span id="NoOweners"></span></span>
                                <span>Color : <span id="Color"></span></span>
                                <span>Fuel Type : <span id="FuelType"></span></span>
                                <span>VIN : <span id="VIN"></span></span>
                                <span>Engine No : <span id="EngineNo"></span></span>
                                <span>Plate Number : <span id="PlateNumber"></span></span>
                                <span>Chassis : <span id="Chassis"></span></span>
                                <span>Seats : <span id="Seats"></span></span>
                            </div>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container item className={classes.FormGrid} xs={12} md={10} justify="center">
                <Box className="PriceSetter" display="flex" alignItems="center">
                    <Typography component="h1" variant="h2">Selling price details</Typography>
                    <TextField className="priceinputs" type="number" label="Preffered selling price" variant="outlined" />
                    <TextField className="priceinputs" type="number" label="Minimum selling price" variant="outlined" />
                </Box>
                <Grid item className={classes.FromFetch} xs={12}>
                    <Grid className="Fetched_Details">
                        <div className="BasicDetails">
                            <Typography component="h3" variant="h5">Please Enter the details of your car</Typography>
                        <div className="BasicDetails_form">
                            
                            <SelectBox data={dataobject.Make || ''} Label="Select Make" />
                            <SelectBox data={dataobject.Model || ''} Label="Model" />
                            <SelectBox data={dataobject.Year || ''} required={true} Label="Model Year" />
                            <SelectBox data={dataobject.BodyStyle || ''} required={true} Label="Body Type" />
                            <SelectBox data={dataobject.Transmission || ''} required={true} Label="Transmission" />
                            <SelectBox data={dataobject.EngineSize || ''} required={true} Label="Engine Size" />
                            <SelectBox data={dataobject.FuelType || ''} required={true} Label="Fuel Type" />
                            <SelectBox data={dataobject.Kilometers || ''} required={true} Label="Kilometers Ran" />
                            <SelectBox data={dataobject.Color || ''} required={true} Label="Color Type" />
                            <SelectBox data={dataobject.Plate || ''} required={true} Label="Number Plate" />
                            <SelectBox data={dataobject.Seats || ''} required={true} Label="Number of seats" />
                            <SelectBox data={dataobject.Doors || ''} required={true} Label="Number of doors" />
                            </div>
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