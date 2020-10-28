import { Icon, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar.jsx";
import Table from "../../Components/Table.jsx";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { Skeleton } from "@material-ui/lab";
import { getUsers } from "../../services/userManagement.js";

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
function UserManagement(props) {
  const classes = useStyles();
  const [allUsers,setAllUsers] = useState([]);
  const [listLoader,setListLoader] = useState(false);

  useEffect(() => {
    setListLoader(true);
    getUsers()
    .then(listing => {
      setListLoader(false);
      console.log(listing)
      setAllUsers(listing);
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
      title: "Name",
      key: "FullName",
    },
    {
      title: "Email",
      key: "Email",
    },
    {
      title: "Phone Number",
      key: "Phone",
    },


    {
      title: "Status",
      key: "Status",
    },
    {
      title: "Manage",
      key: "manage",
    },
  ];
  
  const makeData = (rows) => {
    return rows.map((row, index) => ({
      sno: index + 1,
      FullName: row.FirstName + " " + row.LastName,
      Email: row.Email,
      Phone: row.Phone,
      Status: row.Status,
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
  return (
      <div className="dashboard">
        <div className="dashboard__header">
          <h1 className={"dashboard__heading"}>All Users</h1>
          <p className={"dashboard__heading"}>{allUsers.length} Total</p>
          <p className={"dashboard__heading"}>Sort by :</p>
        </div>
        <Table header={header} rows={makeData(allUsers)} />
        {listLoader ? <Skeleton variant="rect" width={"100%"} height={60} /> : null}

      </div>
  );
}

export default UserManagement;
