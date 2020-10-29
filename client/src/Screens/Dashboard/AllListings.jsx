import { Icon, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Table from "../../Components/Table.jsx";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { getAllListings } from "../../services/listings.js";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem",
  },
  header: {
    padding: "2rem",
    display: "flex",
    alignItems: "baseline",
  },
  heading: {
    margin: "0 1rem",
  },
  vehicle: {
    display: "flex",
    alignItems: "center",
  },
  vehicleImg: {
    borderRadius: "200rem",
    marginRight: "0.5rem",
  },
}));
function AllListings(props) {
  const classes = useStyles();
  const [allListings,setAllListing] = useState([])
  const [listLoader,setListLoader] = useState(false);
  useEffect(() => {
    setListLoader(true);
    getAllListings()
    .then(listing => {
      console.log(listing)
      setListLoader(false);
      setAllListing(listing);
    })
    .catch(() => {
      setListLoader(false);
    })
  },[])
  const header = [
    {
      title: "S No.",
      key: "sno",
    },
    {
      title: "Date",
      key: "date",
    },
    {
      title: "Vehicle",
      key: "Make",
    },
    {
      title: "Views",
      key: "ViewsCount",
    },

    {
      title: "Unique ID",
      key: "VINum",
    },

    {
      title: "Price",
      key: "Price",
    },
    {
      title: "Author Email",
      key: "Email",
    },
    {
      title: "Manage",
      key: "manage",
    },
  ];
  
  const makeData = (rows) => {
    return rows.map((row, index) => ({
      sno: index + 1,
      date: row.date,
      Make: row.Make,
      ViewsCount: row.ViewsCount,
      VINum: row.VINum,
      Price: row.Price,
      Email: row.Author.Email || "Not Available",
      manage: renderOptions(index),
    }));
  };


  const renderOptions = (index) => {
    return (
      <div>
        <InfoOutlinedIcon />
        <EditOutlinedIcon />
        <DeleteOutlineOutlinedIcon />
      </div>
    );
  };
  const renderVehicle = ({ imgUrl, name }) => {
    return (
      <div className={classes.vehicle}>
        <img className={classes.vehicleImg} height={"20rem"} src={imgUrl} />{" "}
        {name}
      </div>
    );
  };
  return (
      <div className={"dashboard"}>
        <div className={"dashboard__header"}>
          <h1 className={"dashboard__heading"}>All Listings</h1>
          <p className={"dashboard__heading"}>{allListings.length} Total</p>
          <p className={"dashboard__heading"}>Sort by :</p>
        </div>
        <Table header={header} rows={makeData(allListings)} />
        {listLoader ? <Skeleton variant="rect" width={"100%"} height={60} /> : null}
      </div>
  );
}

export default AllListings;
