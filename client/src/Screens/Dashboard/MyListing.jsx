import React, { useEffect, useState } from "react";
import { getMyListing } from "../../services/listings.js";
import Listing from "../../Components/Listing.jsx";
import SortBy from "../../Components/Inputs/SortBy.jsx";

const sortingOptions = ["Date", "Views", "Price", "Leads"]

function MyListing(props) {
  const [myListing, setMyListing] = useState([]);
  const [listLoader, setListLoader] = useState(false);
  const [sortBy,setSortBy] = useState("Date");
  
  useEffect(() => {
    setListLoader(true);
    getMyListing()
      .then((listing) => {
        setListLoader(false);
        setMyListing(listing);
      })
      .catch(() => {
        setListLoader(false);
      });
  }, []);
  const handleChange = (e) =>{
    setSortBy(e.target.value);  
  }
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h2 className={"dashboard__heading"}>My Listings</h2>
        <p className={"dashboard__heading"}>{myListing.length} Total</p>
        <p className={"dashboard__heading dashboard__sort"}>
          <SortBy options={sortingOptions} handleChange={handleChange} sortBy={sortBy}/>
        </p>
      </div>
      <Listing listLoader={listLoader} listings={myListing} setListing={setMyListing}/>
    </div>
  );
}

export default MyListing;
