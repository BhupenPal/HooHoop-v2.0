// DEPENDENCIES
import React, { useEffect, useState } from "react"
import { Grid, makeStyles, Typography } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import InfiniteScroll from "react-infinite-scroll-component"

// STYLES
import styles from "../../assets/material/Buycar"

// COMPONENTS
import CardComponent from "../../Components/Cards/CardComponent.jsx"
import FilterComponent from "../../Components/filterComponent.jsx"

// SERVICES
import { fetchBuyCar } from "../../services/fetchCar"

// HOOKS
import useDebounce from "../../Hooks/useDebounce.js"

// IMAGES
import Empty from "../../assets/img/Error Pages/empty.svg"

// Functional Component Starts Here
const BuyCar = () => {
	const classes = makeStyles(styles)()
	const [cars, setCars] = useState([])
	const [query, setQuery] = useState("")
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)

	const debouncedQuery = useDebounce(query, 1000)

	const fetchMoreCars = () => {
		if (debouncedQuery) {
			fetchBuyCar(page, debouncedQuery)
				.then((results) => {
					setHasMore(results.cars.hasNextPage)
					setCars((curCars) => [...curCars, ...results.cars.docs])
				})
				.catch((error) => {
				})
		} else {
			setCars([])
		}
	}

	useEffect(() => {
		setCars([])
		setPage(1)
		fetchMoreCars()
	}, [debouncedQuery])

	useEffect(() => {
		fetchMoreCars()
	}, [page])

	useEffect(() => {
        window.scrollTop = 0
	}, [])

	const renderSkeleton = () => {
		return (
			<Grid
				item
				container
				xs={12}
				style={{ height: "fit-content" }}
				justify="center"
			>
				{[1, 2, 3, 4, 5, 6].map((item) => (
					<Grid
						item
						xs={12}
						sm={4}
						lg={3}
						xl={2}
						key={item}
						className={classes.cardContainer}
					>
						<Skeleton
							variant="rect"
							width={"100%"}
							height={450}
							style={{ margin: "1rem" }}
						/>
					</Grid>
				))}
			</Grid>
		)
	}

	const renderCars = () => {
		if (cars.length === 0 && !hasMore) {
			return (
				<Grid item xs={8}>
					<div style={{ padding: "2rem", textAlign: "center" }}>
						<img width="100%" src={Empty} alt="Empty" />
						<Typography variant={"h3"}>0 Results Found</Typography>
					</div>
				</Grid>
			)
		}
		return cars.map((car, index) => (
			<CardComponent key={index} index={index} car={car} />
		))
	}

	return (
		<Grid
			container
			justify="center"
			component="main"
			className={`${classes.pageDefault} fadeIn`}
		>
			<Grid item container xs={12} sm={3}>
				<FilterComponent setQuery={setQuery} />
			</Grid>
			<Grid item container xs={12} sm={9} style={{ height: "fit-content" }}>
				<InfiniteScroll
					dataLength={cars.length}
					next={() => setPage(page + 1)}
					hasMore={hasMore}
					style={{ width: "100%" }}
					loader={renderSkeleton()}
				>
					<Grid
						item
						container
						xs={12}
						style={{ height: "fit-content" }}
						justify="center"
					>
						{renderCars()}
					</Grid>
				</InfiniteScroll>
			</Grid>
		</Grid>
	)
}

export default BuyCar