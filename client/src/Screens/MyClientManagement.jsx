import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TestDrives from "../Components/TestDrives.jsx";
import { getMyClientTestDrives,getMyClientCallBackRequests,getMyClientShipments } from "../services/clientManagement";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  appBar: {
    backgroundColor: "transparent",
    color: "#000",
  },
  tabBody: {
    background: "#EEEEEE",
    minHeight: "80vh",
  },
}));
function MyClientManagement(props) {
  const classes = useStyles();
  const [testDriveUsers, setTestDriveUsers] = useState([]);
  const [callbackRequests, setCallbackRequests] = useState([]);
  const [shipments, setShipments] = useState([]);

  const [activeTab, setActiveTab] = useState(0);

  const header = [
    {
      title: "S No.",
      key: "sno",
    },
    {
      title: "Date",
      key: "Date",
    },
    {
      title: "Client Name",
      key: "FullName",
    },
    {
      title: "Vehicle",
      key: "MakeModel",
    },
    {
      title: "Unique ID",
      key: "VINum",
    },
    {
      title: "Client Phone",
      key: "Phone",
    },
  ];

  const getActiveClasses = (index) => {
    if (index == activeTab) {
      return { backgroundColor: "#EEEEEE" };
    }
  };
  const handleChange = (e, i) => {
    setActiveTab(i);
  };
  const fetchTestDrivesData = () => {
    getMyClientTestDrives()
      .then((testDriveUsers) => {
        setTestDriveUsers(testDriveUsers);
      })
      .catch((err) => {});
  }
  const fetchMyClientCallBackRequests = () => {
      getMyClientCallBackRequests()
      .then(callbacks => {
        setCallbackRequests(callbacks);
      })
      .catch(err => {

      })
  }
  const fetchMyClientShipments = () => {
    getMyClientShipments()
    .then(shipments => {
        setShipments(shipments);
    })
    .catch(err => {

    })
}

  useEffect(() => {
      fetchTestDrivesData();
      fetchMyClientCallBackRequests();
      fetchMyClientShipments();
  },[]);


  const renderTable = () => {
      switch(activeTab){
          case 0:
              return <TestDrives header={header} testDriveUsers={testDriveUsers} />
          case 1:
              return <TestDrives header={header} testDriveUsers={callbackRequests} />
          case 2:
              return <TestDrives header={header} testDriveUsers={shipments} />  
      }
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Test Drive" index={0} style={getActiveClasses(0)} />
          <Tab
            label="Call Back Requests"
            index={1}
            style={getActiveClasses(1)}
          />
          <Tab label="Shipping" index={2} style={getActiveClasses(2)} />
        </Tabs>
      </AppBar>
      <div className={classes.tabBody}>
          {/* <TestDrives testDriveUsers={testDriveUsers} /> */}
          {renderTable()}
      </div>
    </div>
  );
}

export default MyClientManagement;
