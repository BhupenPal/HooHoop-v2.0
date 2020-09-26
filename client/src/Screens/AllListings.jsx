import { Icon, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SideBar from "../Components/Sidebar.jsx";
import Table from "../Components/Table.jsx";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { getAllListings } from "../services/listings.js";

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
  useEffect(() => {
    getAllListings()
    .then(listing => {
      console.log(listing)
      setAllListing(listing);
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
      title: "Clicks",
      key: "clicks",
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
      sno: index,
      date: row.date,
      Make: row.Make,
      ViewsCount: row.ViewsCount,
      clicks: row.clicks,
      VINum: row.VINum,
      Price: row.Price,
      Email: row.Author.Email,
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
      <div className={classes.root}>
        <div className={classes.header}>
          <h1 className={classes.heading}>My Listings</h1>
          <p className={classes.heading}>144 Total</p>
          <p className={classes.heading}>Sort by :</p>
        </div>
        <Table header={header} rows={makeData(allListings)} />
      </div>
  );
}

export default AllListings;
