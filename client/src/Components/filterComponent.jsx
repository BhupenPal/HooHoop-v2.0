import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  withStyles,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Collapse,
  Slider,
  Checkbox,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import styles from "../assets/material/Buycar";
import "../assets/css/buypage.scss";

import classNames from "classnames";
import edit3 from "../assets/img/svgs/edit-3.svg";

import Makebodies from "../assets/data/MakeModel";
import { useDispatch, useSelector } from "react-redux";
import {
    setFilterBrands,
    setFilterBody,
    setFilterYearRange,
    setFilterPriceRange,
    setFilterKMRange,
    setFilterFuelType,
    setFilterBodyType,
    setFilterTransmission,
    setFilterColor,
} from "../actions/filterActions.js"

const filterComponent = (props) => {
  const { classes,setQuery } = props;
  const [filterstate, toggle] = React.useState({
    State0: true,
    State1: false,
    State2: false,
    State3: false,
    State4: false,
    State5: true,
  });
  const {brands,bodies,yearRange,priceRange,kmsDriven,bodyTypes,transmissions,fuelTypes} = useSelector((store) => store.filter);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const newbodies = {};

    Makebodies.forEach((item) => {
      if (brands[item.Make]) {
        item.Models.map((cur) => {
          newbodies[cur] = false;
        });
      }
    });
    dispatch(setFilterBody({ ...newbodies }));
  }, [brands]);

  useEffect(() => {
    let query = "";
    Object.keys(brands).forEach((maker) => {
      if (brands[maker]) {
        query += `Make=${maker}&`;
      }
    });
    Object.keys(bodies).forEach((model) => {
      if (bodies[model]) {
        query += `Model=${model}&`;
      }
    });
    Object.keys(bodyTypes).forEach((bodyType) => {
        if (bodyTypes[bodyType]) {
          query += `BodyType=${bodyType}&`;
        }
    });
    Object.keys(transmissions).forEach((transmissionType) => {
        if (transmissions[transmissionType]) {
          query += `Transmission=${transmissionType}&`;
        }
    });
    Object.keys(fuelTypes).forEach((fuelType) => {
        if (fuelTypes[fuelType]) {
          query += `FuelType=${fuelType}&`;
        }
    });
    query += `ModelYear=${yearRange[0]}-${yearRange[1]}&`;
    query += `Price=${priceRange[0]}-${priceRange[1]}&`;
    query += `KMsDriven=${kmsDriven[0]}-${kmsDriven[1]}&`;
    console.log(bodies)
    setQuery(query);
  }, [brands, bodies, yearRange, priceRange, kmsDriven,fuelTypes,transmissions,bodyTypes]);
  function toggleFilter(getState) {
    switch (getState) {
      case "State0":
        if (filterstate.State0) toggle({ State0: false, State5: true });
        else toggle({ State0: true, State5: true });
        break;
      case "State1":
        if (filterstate.State1) toggle({ State1: false, State5: true });
        else toggle({ State1: true, State5: true });
        break;
      case "State2":
        if (filterstate.State2) toggle({ State2: false, State5: true });
        else toggle({ State2: true, State5: true });
        break;
      case "State3":
        if (filterstate.State3) toggle({ State3: false, State5: true });
        else toggle({ State3: true, State5: true });
        break;
      case "State4":
        if (filterstate.State4) toggle({ State4: false, State5: true });
        else toggle({ State4: true, State5: true });
        break;
      case "State5":
        if (filterstate.State5) toggle({ State5: false });
        else toggle({ State5: true });
        break;
    }
    let _icon = document.querySelectorAll(".collapsed");
    let stateElement = parseInt(getState[5]);

    for (var key in filterstate) {
      if (filterstate[key]) {
        getState = true;
      } else {
        getState = false;
      }
    }

    if (getState) {
      _icon[stateElement].animate(
        [{ transform: "rotate(180deg)" }, { transform: "rotate(0deg)" }],
        {
          duration: 200,
          fill: "forwards",
        }
      );
    } else {
      _icon[stateElement].animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(180deg)" }],
        {
          duration: 100,
          fill: "forwards",
        }
      );
    }
  }

  function valuetext(value) {
    return `${value}`;
  }

  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let p20Year = currentYear - 20;
  const handleYearChange = (event, newValue) => {
    console.log(newValue);
    dispatch(setFilterYearRange(newValue));
  };

  function rangetextSet(priceRange) {
    return `${priceRange}`;
  }
  const handleRangeChange = (event, newValue) => {
    console.log(newValue);
    dispatch(setFilterPriceRange(newValue));
  };

  function kilometerstextSet(kmsDriven) {
    return `${kmsDriven}`;
  }
  const handlekmsDrivenChange = (event, newValue) => {
    dispatch(setFilterKMRange(newValue));
  };

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + "K";
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    } else if (num < 900) {
      return num;
    }
  }
  function handleMakerList(e) {
    dispatch(setFilterBrands({ ...brands, [e.target.name]: !brands[e.target.name] }));
  }

  function handleModelList(e) {
    dispatch(setFilterBody({ ...bodies, [e.target.name]: !bodies[e.target.name] }));
  }
  function handleFuelList(e) {
    dispatch(setFilterFuelType({ ...fuelTypes, [e.target.name]: !fuelTypes[e.target.name] }));
  }
  function handleTransmissionList(e) {
    dispatch(setFilterTransmission({ ...transmissions, [e.target.name]: !transmissions[e.target.name] }));
  }
  function handleBodyList(e) {
    dispatch(setFilterBodyType({ ...bodyTypes, [e.target.name]: !bodyTypes[e.target.name] }));
  }

  return (
    <Box className="filterContainer fadeIn">
      <Typography variant="h4" component="h3">
        Search by Filters
      </Typography>
      <FormControl
        className={classNames(
          classes.marginInput,
          classes.textField,
          "controlInput"
        )}
        variant="outlined"
      >
        <InputLabel
          htmlFor="outlined-adornment-password"
          className={classes.inputLabel}
        >
          Search City
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small" edge="end">
                <img src={edit3} />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={90}
        />
      </FormControl>

      <div className="filterClass">
        <div className="filterHead">
          <Typography variant="h6" component="h6">
            Search By Brand
          </Typography>
          <IconButton
            size="small"
            className="collapsed"
            onClick={() => toggleFilter("State0")}
          >
            {filterstate.State0 ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={filterstate.State0}>
          <div className={classes.expandedFilter} id="BrandNames">
            {Object.keys(brands).map((item, index) => {
              return (
                <label htmlFor={item} key={index} className="carMakes">
                  <span>{item}</span>
                  <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    name={item}
                    id={item}
                    checked={brands[item]}
                    onClick={handleMakerList}
                    className="MakeCheck"
                  />
                </label>
              );
            })}
          </div>
        </Collapse>
      </div>

      <div className="filterClass">
        <div className="filterHead">
          <Typography variant="h6" component="h6">
            Search by Model
          </Typography>
          <IconButton
            size="small"
            className="collapsed"
            onClick={() => toggleFilter("State1")}
          >
            {filterstate.State1 ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={filterstate.State1}>
          <div className={classes.expandedFilter}>
            {Object.keys(bodies).map((item, index) => {
              return (
                <label htmlFor={item} key={index} className="carMakes">
                  <span>{item}</span>
                  <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    checked={bodies[item]}
                    onClick={handleModelList}
                    name={item}
                    id={item}
                    className="MakeCheck"
                  />
                </label>
              );
            })}
          </div>
        </Collapse>
      </div>

      <div className="filterClass">
        <div className="filterHead">
          <Typography variant="h6" component="h6">
            Model Year
          </Typography>
        </div>
        <Slider
          value={yearRange}
          onChange={handleYearChange}
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
          <Typography variant="h6" component="h6">
            Price Range
          </Typography>
        </div>
        <Slider
          value={priceRange}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          valueLabelFormat={(value) => <div>{numFormatter(value)}</div>}
          getAriaValueText={rangetextSet}
          step={1000}
          className="rangeSlider"
          min={5000}
          max={100000}
        />
      </div>

      <div className="filterClass">
        <div className="filterHead">
          <Typography variant="h6" component="h6">
            Kilometers Driven
          </Typography>
        </div>
        <Slider
          value={kmsDriven}
          onChange={handlekmsDrivenChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={kilometerstextSet}
          valueLabelFormat={(value) => <div>{numFormatter(value)}</div>}
          className="rangeSlider"
          min={0}
          max={100000}
        />
      </div>

      <div className="filterClass">
        <div className="filterHead">
          <Typography variant="h6" component="h6">
            Fuel Type
          </Typography>
          <IconButton
            size="small"
            className="collapsed"
            onClick={() => toggleFilter("State2")}
          >
            {filterstate.State2 ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={filterstate.State2}>
          <div className={classes.expandedFilter}>
          {Object.keys(fuelTypes).map((item, index) => {
              return (
                <label htmlFor={item} key={index} className="carMakes">
                  <span>{item}</span>
                  <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    checked={fuelTypes[item]}
                    onClick={handleFuelList}
                    name={item}
                    id={item}
                    className="MakeCheck"
                  />
                </label>
              );
            })}
          </div>
        </Collapse>
      </div>

      <div className="filterClass">
        <div className="filterHead">
          <Typography variant="h6" component="h6">
            Type
          </Typography>
          <IconButton
            size="small"
            className="collapsed"
            onClick={() => toggleFilter("State3")}
          >
            {filterstate.State3 ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={filterstate.State3}>
          <div className={classes.expandedFilter}>
          {Object.keys(bodyTypes).map((item, index) => {
              return (
                <label htmlFor={item} key={index} className="carMakes">
                  <span>{item}</span>
                  <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    checked={bodyTypes[item]}
                    onClick={handleBodyList}
                    name={item}
                    id={item}
                    className="MakeCheck"
                  />
                </label>
              );
            })}
          </div>
        </Collapse>
      </div>

      <div className="filterClass">
        <div className="filterHead">
          <Typography variant="h6" component="h6">
            Transmission
          </Typography>
          <IconButton
            size="small"
            className="collapsed"
            onClick={() => toggleFilter("State4")}
          >
            {filterstate.State4 ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={filterstate.State4}>
          <div className={classes.expandedFilter}>
          {Object.keys(transmissions).map((item, index) => {
              return (
                <label htmlFor={item} key={index} className="carMakes">
                  <span>{item}</span>
                  <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    checked={transmissions[item]}
                    onClick={handleTransmissionList}
                    name={item}
                    id={item}
                    className="MakeCheck"
                  />
                </label>
              );
            })}
          </div>
        </Collapse>
      </div>

      <div className="filterClass">
        <div className="filterHead">
          <Typography variant="h6" component="h6">
            Color
          </Typography>
          <IconButton
            size="small"
            className="collapsed"
            onClick={() => toggleFilter("State5")}
          >
            {filterstate.State5 ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={filterstate.State5}>
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

export default withStyles(styles, { withTheme: true })(filterComponent);
