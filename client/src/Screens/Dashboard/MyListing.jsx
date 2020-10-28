import { Icon, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar.jsx";
import Table from "../../Components/Table.jsx";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { getMyListing } from "../../services/listings.js";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({

  vehicle: {
    display: "flex",
    alignItems: "center",
  },
  vehicleImg: {
    borderRadius: "200rem",
    marginRight: "0.5rem",
  },
}));
function MyListing(props) {
  const classes = useStyles();
  const [myListing,setMyListing] = useState([]);
  const [listLoader,setListLoader] = useState(false);

  useEffect(() => {
    setListLoader(true);
    getMyListing()
    .then(listing => {
      setListLoader(false);
      setMyListing(listing);
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
      <div className="dashboard">
        <div className="dashboard__header">
          <h1 className={"dashboard__heading"}>My Listings</h1>
          <p className={"dashboard__heading"}>{myListing.length} Total</p>
          <p className={"dashboard__heading"}>Sort by :</p>
        </div>
        <Table header={header} rows={makeData(myListing)} />
        {listLoader ? <Skeleton variant="rect" width={"100%"} height={60} /> : null}

      </div>
  );
}

export default MyListing;
