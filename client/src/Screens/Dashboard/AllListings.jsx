import { Icon, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAllListings } from "../../services/listings.js";
import Listing from "../../Components/Listing.jsx";
function AllListings(props) {
  const [allListings,setAllListing] = useState([])
  const [listLoader,setListLoader] = useState(false);

  useEffect(() => {
    setListLoader(true);
    getAllListings()
    .then(listing => {
      setListLoader(false);
      setAllListing(listing);
    })
    .catch(() => {
      setListLoader(false);
    })
  },[])
  
  return (
      <div className={"dashboard"}>
        <div className={"dashboard__header"}>
          <h1 className={"dashboard__heading"}>All Listings</h1>
          <p className={"dashboard__heading"}>{allListings.length} Total</p>
          <p className={"dashboard__heading"}>Sort by :</p>
        </div>
        <Listing listLoader={listLoader} listings={allListings} setListing={setAllListing}/>
      </div>
  );
}

export default AllListings;
