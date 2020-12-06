import React, { useEffect, useState } from "react";
import { getMyListing } from "../../services/listings.js";
import Listing from "../../Components/Listing.jsx";

function MyListing(props) {
  const [myListing, setMyListing] = useState([]);
  const [listLoader, setListLoader] = useState(false);
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
 
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className={"dashboard__heading"}>My Listings</h1>
        <p className={"dashboard__heading"}>{myListing.length} Total</p>
        <p className={"dashboard__heading"}>Sort by :</p>
      </div>
      <Listing listLoader={listLoader} listings={myListing} setListing={setMyListing}/>
    </div>
  );
}

export default MyListing;
