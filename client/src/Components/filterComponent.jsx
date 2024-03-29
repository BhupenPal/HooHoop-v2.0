// DEPENDENCIES
import React, { useEffect, useState } from "react"
import {
	Box,
	Typography,
	Button,
	IconButton,
	Collapse,
	Slider,
	Checkbox,
	makeStyles,
	withStyles
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import styles from "../assets/material/Buycar"
import "../assets/css/buypage.scss"

import Makebodies from "../assets/data/MakeModel"
import { useDispatch, useSelector } from "react-redux"

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
	setFilterState,
} from "../redux/actions/filterActions.js"
import { FilterList } from "@material-ui/icons"
import SearchState from "./Inputs/SearchState.jsx"
import { useLocation } from "react-router-dom"
import useWindowDimensions from "../Hooks/WindowDimensions"

const useStyles = makeStyles(styles)

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

// Creating a custom slider for range based filters
const CustomSlider = withStyles({
	root: {
		marginTop: '30px !important'
	},
	valueLabel: {
		left: "calc(-50%)",
		top: -22,
		fontWeight: 600,
		"& *": {
			background: "transparent",
			color: "#000"
		}
	}
})(Slider)

const filterComponent = (props) => {
	const { width, height } = useWindowDimensions()
	const searchQuery = useQuery()
	const { setQuery } = props
	const [showFilters, setShowFilters] = useState(width > 720)
	const classes = useStyles()
	const [filterstate, toggle] = React.useState({
		State0: true,
		State1: false,
		State2: false,
		State3: false,
		State4: false,
		State5: true,
	})

	const {
		brands,
		bodies,
		yearRange,
		priceRange,
		kmsDriven,
		bodyTypes,
		transmissions,
		fuelTypes,
		colors,
		state,
	} = useSelector((store) => store.filter)

	const dispatch = useDispatch()

	useEffect(() => {
		const maker = searchQuery.get("make")
		if (maker) {
			handleMakerList(maker)
		}
	}, [])

	useEffect(() => {
		const newbodies = {}

		Makebodies.forEach((item) => {
			if (brands[item.Make]) {
				item.Models.map((cur) => {
					newbodies[cur] = false
				})
			}
		})

		dispatch(setFilterBody(newbodies))
	}, [brands])

	useEffect(() => {
		let query = ""

		Object.keys(brands).forEach((maker) => {
			if (brands[maker]) {
				query += `Make=${maker}&`
			}
		})

		Object.keys(bodies).forEach((model) => {
			if (bodies[model]) {
				query += `Model=${model}&`
			}
		})

		Object.keys(bodyTypes).forEach((bodyType) => {
			if (bodyTypes[bodyType]) {
				query += `BodyType=${bodyType}&`
			}
		})

		Object.keys(transmissions).forEach((transmissionType) => {
			if (transmissions[transmissionType]) {
				query += `Transmission=${transmissionType}&`
			}
		})

		Object.keys(fuelTypes).forEach((fuelType) => {
			if (fuelTypes[fuelType]) {
				query += `FuelType=${fuelType}&`
			}
		})

		Object.keys(colors).forEach((color) => {
			if (colors[color]) {
				query += `Color=${color}&`
			}
		})

		query += `ModelYear=${yearRange[0]}-${yearRange[1]}&`
		query += `Price=${priceRange[0]}-${priceRange[1]}&`
		query += `KMsDriven=${kmsDriven[0]}-${kmsDriven[1]}&`
		query += `SearchedCar=${searchQuery.get("search") || ""}&`
		query += `State=${state}`

		setQuery(query)
	}, [
		brands,
		bodies,
		yearRange,
		priceRange,
		kmsDriven,
		fuelTypes,
		transmissions,
		bodyTypes,
		colors,
		searchQuery,
		state
	])

	const toggleFilterVisiblity = () => {
		setShowFilters((show) => !show)
	}

	function toggleFilter(getState) {
		switch (getState) {
			case "State0":
				if (filterstate.State0) toggle({ State0: false, State5: true })
				else toggle({ State0: true, State5: true })
				break
			case "State1":
				if (filterstate.State1) toggle({ State1: false, State5: true })
				else toggle({ State1: true, State5: true })
				break
			case "State2":
				if (filterstate.State2) toggle({ State2: false, State5: true })
				else toggle({ State2: true, State5: true })
				break
			case "State3":
				if (filterstate.State3) toggle({ State3: false, State5: true })
				else toggle({ State3: true, State5: true })
				break
			case "State4":
				if (filterstate.State4) toggle({ State4: false, State5: true })
				else toggle({ State4: true, State5: true })
				break
			case "State5":
				if (filterstate.State5) toggle({ State5: false })
				else toggle({ State5: true })
				break
		}

		let _icon = document.querySelectorAll(".collapsed")
		let stateElement = parseInt(getState[5])

		for (var key in filterstate) {
			if (filterstate[key]) {
				getState = true
			} else {
				getState = false
			}
		}

		if (getState) {
			_icon[stateElement].animate(
				[{ transform: "rotate(180deg)" }, { transform: "rotate(0deg)" }],
				{
					duration: 200,
					fill: "forwards",
				}
			)
		} else {
			_icon[stateElement].animate(
				[{ transform: "rotate(0deg)" }, { transform: "rotate(180deg)" }],
				{
					duration: 100,
					fill: "forwards",
				}
			)
		}
	}

	function valuetext(value) {
		return `${value}`
	}

	let currentDate = new Date()
	let currentYear = currentDate.getFullYear()

	const handleYearChange = (event, newValue) => {
		dispatch(setFilterYearRange(newValue))
	}

	function rangetextSet(priceRange) {
		return `${priceRange}`
	}

	const handleRangeChange = (event, newValue) => {
		dispatch(setFilterPriceRange(newValue))
	}

	function kilometerstextSet(kmsDriven) {
		return `${kmsDriven}`
	}

	const handlekmsDrivenChange = (event, newValue) => {
		dispatch(setFilterKMRange(newValue))
	}

	function numFormatter(num) {
		if (num > 999 && num < 1000000) {
			return (num / 1000).toFixed(0) + "K"
		} else if (num > 1000000) {
			return (num / 1000000).toFixed(0) + "M"
		} else if (num < 900) {
			return num
		}
	}

	function handleMakerList(name) {
		brands[name] = !brands[name]
		dispatch(setFilterBrands({ ...brands }))
	}

	function handleModelList(e) {
		dispatch(
			setFilterBody({ ...bodies, [e.target.name]: !bodies[e.target.name] })
		)
	}

	function handleFuelList(e) {
		dispatch(
			setFilterFuelType({
				...fuelTypes,
				[e.target.name]: !fuelTypes[e.target.name],
			})
		)
	}

	function handleTransmissionList(e) {
		dispatch(
			setFilterTransmission({
				...transmissions,
				[e.target.name]: !transmissions[e.target.name],
			})
		)
	}

	function handleStateSearch(e) {
		dispatch(setFilterState(e.target.value))
	}

	function handleBodyList(e) {
		dispatch(
			setFilterBodyType({
				...bodyTypes,
				[e.target.name]: !bodyTypes[e.target.name],
			})
		)
	}

	function handleColorList(e) {
		dispatch(
			setFilterColor({ ...colors, [e.target.name]: !colors[e.target.name] })
		)
	}

	return (
		<Box className="filterContainer fadeIn">
			<Box style={{ display: !showFilters ? "block" : "none" }}>
				<Button startIcon={<FilterList />} onClick={toggleFilterVisiblity}>
					Add Filters
          </Button>
			</Box>
			<Box
				className="fadeIn"
				style={{
					display: (showFilters ? "block" : "none"),

				}}
				display={{ md: 'block' }}
			>
				<Typography variant="h4" component="h3">
					Search by Filters
        		</Typography>
				<SearchState value={state} handleChange={handleStateSearch} label="State" width="90%" margin="0 5% 1rem 5%" />
				<div className="filterClass">
					<div className="filterHead">
						<Typography variant="h6" component="h6">
							Make
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
						<div className={`${classes.expandedFilter} custom-scroll`} id="BrandNames">
							{
								Object.keys(brands).map((item, index) => {
									return (
										<label htmlFor={item} key={index} className="carMakes">
											<span>{item}</span>
											<Checkbox
												color="primary"
												inputProps={{ "aria-label": "secondary checkbox" }}
												name={item}
												id={item}
												checked={brands[item]}
												onClick={(e) => handleMakerList(e.target.name)}
												className="MakeCheck"
											/>
										</label>
									)
								})
							}
						</div>
					</Collapse>
				</div>

				<div className="filterClass">
					<div className="filterHead">
						<Typography variant="h6" component="h6">
							Model
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
						<div className={`${classes.expandedFilter} custom-scroll`}>
							{Object.keys(bodies).length === 0 ? <div style={{ padding: "2rem", textAlign: "center" }}>Please Select Make First</div> : null}
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
								)
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
					<CustomSlider
						value={yearRange}
						onChange={handleYearChange}
						getAriaValueText={90}
						aria-labelledby="range-slider"
						getAriaValueText={valuetext}
						className="rangeSlider"
						min={currentYear - 30}
						max={currentYear}
						valueLabelDisplay="on"
					/>
				</div>

				<div className="filterClass">
					<div className="filterHead">
						<Typography variant="h6" component="h6">
							Price Range
            			</Typography>
					</div>
					<CustomSlider
						value={priceRange}
						onChange={handleRangeChange}
						valueLabelDisplay="auto"
						aria-labelledby="range-slider"
						valueLabelFormat={(value) => <div>{numFormatter(value)}</div>}
						getAriaValueText={rangetextSet}
						step={1000}
						className="rangeSlider"
						valueLabelDisplay="on"
						min={0}
						max={100000}
					/>
				</div>

				<div className="filterClass">
					<div className="filterHead">
						<Typography variant="h6" component="h6">
							Kilometers Driven
            			</Typography>
					</div>
					<CustomSlider
						value={kmsDriven}
						onChange={handlekmsDrivenChange}
						valueLabelDisplay="auto"
						aria-labelledby="range-slider"
						getAriaValueText={kilometerstextSet}
						valueLabelFormat={(value) => <div>{numFormatter(value)}</div>}
						className="rangeSlider"
						valueLabelDisplay="on"

						min={0}
						max={200000}
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
						<div className={`${classes.expandedFilter} custom-scroll`}>
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
								)
							})}
						</div>
					</Collapse>
				</div>

				<div className="filterClass">
					<div className="filterHead">
						<Typography variant="h6" component="h6">
							Body Type
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
						<div className={`${classes.expandedFilter} custom-scroll`}>
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
								)
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
						<div className={`${classes.expandedFilter} custom-scroll`}>
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
								)
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
						<div className={`${classes.expandedFilter} custom-scroll`} id="colorContainer">
							{
								Object.keys(colors).map((item, index) => {
									// Making sure the others is not visible in Filter
									return item !== "Others" && (
										<label
											key={index}
											htmlFor={item}
											className={`colorCircle ${colors[item] && "colorSelected"}`}
										>
											<Checkbox
												color="primary"
												inputProps={{ "aria-label": "secondary checkbox" }}
												checked={colors[item]}
												onClick={handleColorList}
												name={item}
												id={item}
												style={{ display: "none" }}
											/>
										</label>
									)
								})
							}
						</div>
					</Collapse>
				</div>
			</Box>
		</Box>
	)
}

export default filterComponent