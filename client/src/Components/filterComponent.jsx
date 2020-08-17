import React, { useState } from "react";
import { Box, Typography, Button, withStyles, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, Collapse, Slider, Avatar } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import styles from '../assets/material/Buycar';
import "../assets/css/buypage.scss"
import clsx from 'clsx';
import edit3 from "../assets/img/svgs/edit-3.svg"

const filterComponent = (props) => {
    const { classes } = props;
    const [filterstate, toggle] = React.useState({State0: true, State1: false, State2: false, State3: false, State4: false, State5: true})

    function toggleFilter(getState){
            switch(getState){
                case 'State0': 
                    if(filterstate.State0) toggle({State0: false, State5: true});
                    else toggle({State0: true, State5: true});
                    break;
                case 'State1': 
                    if(filterstate.State1) toggle({State1: false, State5: true});
                    else toggle({State1: true, State5: true});
                    break;
                case 'State2': 
                    if(filterstate.State2) toggle({State2: false, State5: true});
                    else toggle({State2: true, State5: true});
                    break;
                case 'State3': 
                    if(filterstate.State3) toggle({State3: false, State5: true});
                    else toggle({State3: true, State5: true});
                    break;
                case 'State4': 
                    if(filterstate.State4) toggle({State4: false, State5: true});
                    else toggle({State4: true, State5: true});
                    break;
                case 'State5': 
                    if(filterstate.State5) toggle({State5: false});
                    else toggle({State5: true});
                    break;
            }
            let _icon = document.querySelectorAll(".collapsed")
            let stateElement = parseInt(getState[5])

            for(var key in filterstate){
                if(filterstate[key]){
                    getState = true
                } else {
                    getState = false
                }
            }

            if(getState){
                _icon[stateElement].animate([
                    {transform: "rotate(180deg)"},
                    {transform: "rotate(0deg)"}
                ],{
                    duration: 200,
                    fill: "forwards"
                })
            } else {
                _icon[stateElement].animate([
                    {transform: "rotate(0deg)"},
                    {transform: "rotate(180deg)"}
                ],{
                    duration: 100,
                    fill: "forwards"
                })
            }
    }

    function valuetext(value) {
        return `${value}`;
    }

    let currentDate = new Date;
    let currentYear = currentDate.getFullYear();
    let p20Year = currentYear - 20;
    const [value, setValue] = React.useState([ 1977, p20Year]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    }

    function rangetextSet(rangeValue){
        return `${rangeValue}`
    }
    const [rangeValue, setRange] = React.useState([30000,60000]);
    const handleRangeChange = (event, newValue) => {
        console.log(newValue)
        setRange(newValue);
    }

    function kilometerstextSet(kilometersValue){
        return `${kilometersValue}`
    }
    const [kilometersValue, setkilometers] = React.useState([0,50000]);
    const handleKilometersValueChange = (event, newValue) => {
        setkilometers(newValue);
    }

    function numFormatter(num) {
        if(num > 999 && num < 1000000){
            return (num/1000).toFixed(0) + 'K';
        }else if(num > 1000000){
            return (num/1000000).toFixed(0) + 'M';
        }else if(num < 900){
            return num;
        }
    }

    return (
        <Box className="filterContainer">
            <Typography variant="h4" component="h3">Search by Filters</Typography>
            <FormControl className={clsx(classes.marginInput, classes.textField, "controlInput")} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" className={classes.inputLabel}>Search City</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        size="small"
                        edge="end"
                        >
                        <img src={edit3}/>
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={90}
                />
            </FormControl>
            
            <div className="filterClass"> 
                <div className="filterHead">
                    <Typography variant="h6" component="h6">Search By Brand</Typography>
                <IconButton size="small" className="collapsed" onClick={() => toggleFilter('State0')}>{filterstate.State0 ? <RemoveIcon /> : <AddIcon />}</IconButton>
                </div>
                <Collapse in={filterstate.State0} >
                    <div className={classes.expandedFilter}></div>
                </Collapse>
            </div>

            <div className="filterClass"> 
                <div className="filterHead">
                    <Typography variant="h6" component="h6">Search by Model</Typography>
                <IconButton size="small" className="collapsed" onClick={() => toggleFilter('State1')}>{filterstate.State1 ? <RemoveIcon /> : <AddIcon />}</IconButton>
                </div>
                <Collapse in={filterstate.State1} >
                    <div className={classes.expandedFilter}></div>
                </Collapse>
            </div>

            <div className="filterClass"> 
                <div className="filterHead">
                    <Typography variant="h6" component="h6">Model Year</Typography>
                </div>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    className="rangeSlider"
                    min={1960}
                    max={currentYear}
                />
            </div>

            <div className="filterClass"> 
                <div className="filterHead">
                    <Typography variant="h6" component="h6">Price Range</Typography>
                </div>
                <Slider
                    value={rangeValue}
                    onChange={handleRangeChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    valueLabelFormat={value => <div>{numFormatter(value)}</div>}
                    getAriaValueText={rangetextSet}
                    step={1000}
                    className="rangeSlider"
                    min={5000}
                    max={100000}
                />
            </div>

            <div className="filterClass"> 
                <div className="filterHead">
                    <Typography variant="h6" component="h6">Kilometers Driven</Typography>
                </div>
                <Slider
                    value={kilometersValue}
                    onChange={handleKilometersValueChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={kilometerstextSet}
                    valueLabelFormat={value => <div>{numFormatter(value)}</div>}
                    className="rangeSlider"
                    min={0}
                    max={100000}
                />
            </div>

            <div className="filterClass"> 
                <div className="filterHead">
                    <Typography variant="h6" component="h6">Fuel Type</Typography>
                <IconButton size="small" className="collapsed" onClick={() => toggleFilter('State2')}>{filterstate.State2 ? <RemoveIcon /> : <AddIcon />}</IconButton>
                </div>
                <Collapse in={filterstate.State2} >
                    <div className={classes.expandedFilter}></div>
                </Collapse>
            </div>

            <div className="filterClass"> 
                <div className="filterHead">
                    <Typography variant="h6" component="h6">Type</Typography>
                <IconButton size="small" className="collapsed" onClick={() => toggleFilter('State3')}>{filterstate.State3 ? <RemoveIcon /> : <AddIcon />}</IconButton>
                </div>
                <Collapse in={filterstate.State3} >
                    <div className={classes.expandedFilter}></div>
                </Collapse>
            </div>

            <div className="filterClass"> 
                <div className="filterHead">
                    <Typography variant="h6" component="h6">Transmission</Typography>
                <IconButton size="small" className="collapsed" onClick={() => toggleFilter('State4')}>{filterstate.State4 ? <RemoveIcon /> : <AddIcon />}</IconButton>
                </div>
                <Collapse in={filterstate.State4} >
                    <div className={classes.expandedFilter}></div>
                </Collapse>
            </div>

            <div className="filterClass"> 
                <div className="filterHead">
                    <Typography variant="h6" component="h6">Color</Typography>
                <IconButton size="small" className="collapsed" onClick={() => toggleFilter('State5')}>{filterstate.State5 ? <RemoveIcon /> : <AddIcon />}</IconButton>
                </div>
                <Collapse in={filterstate.State5} >
                    <div className={classes.expandedFilter} id="colorContainer">
                        <div className="colorCircle"></div>
                        <div className="colorCircle"></div>
                        <div className="colorCircle"></div>
                        <div className="colorCircle"></div>
                        <div className="colorCircle"></div>
                        <div className="colorCircle"></div>
                        <div className="colorCircle"></div>
                        <div className="colorCircle"></div>
                    </div>
                </Collapse>
            </div>
        </Box>
    );
};

export default withStyles(styles, {withTheme: true })(filterComponent);