import React, { useEffect, useState } from "react"
import { getAllListings } from "../../services/listings.js"
import Listing from "../../Components/Listing.jsx"
import SortBy from "../../Components/Inputs/SortBy.jsx"

const sortingOptions = ["Date", "Views", "Price", "Leads"]

function AllListings(props) {
	const [allListings, setAllListing] = useState([])
	const [listLoader, setListLoader] = useState(false)
	const [sortBy, setSortBy] = useState("Date")
	useEffect(() => {
		setListLoader(true)
		getAllListings()
			.then(listing => {
				setListLoader(false)
				setAllListing(listing)
			})
			.catch(() => {
				setListLoader(false)
			})
	}, [])
	const handleChange = (e) => {
		setSortBy(e.target.value)
	}
	return (
		<div className={"dashboard"}>
			<div className={"dashboard__header"}>
				<h2 className={"dashboard__heading"}>All Listings</h2>
				<p className={"dashboard__heading"}>{allListings.length} Total</p>
				<div className={"dashboard__heading dashboard__sort"}>
					<SortBy options={sortingOptions} handleChange={handleChange} sortBy={sortBy} />
				</div>
			</div>
			<Listing listLoader={listLoader} listings={allListings} setListing={setAllListing} />
		</div>
	)
}

export default AllListings