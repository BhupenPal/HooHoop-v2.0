import { makeStyles } from '@material-ui/core';
import React from 'react';
import { getSmallThumbnailLink } from '../utils/getImagesUrl.js';
import Table from "./Table.jsx";



const useStyles = makeStyles((theme) => ({
  vehicle: {
    display: "flex",
    alignItems: "center",
    ["& a"]:{
      display:"flex",
    }
  },
  vehicleImg: {
    borderRadius: "200rem",
    marginRight: "0.5rem",
  },
  options:{
    color:"#999999",
    cursor:"pointer",
    margin:"0 0.1rem",
  }
}));

function TestDrives({testDriveUsers,header}) {
    const classes = useStyles();
  const renderVehicle = ({ VINum, name }) => {
    return (
      <div className={classes.vehicle}>
       <a target="_blank"  href={`/car/${VINum}`}> <img
          className={classes.vehicleImg}
          height={"30px"}
          src={getSmallThumbnailLink(VINum)}
        /></a>{" "}
        {name}
      </div>
    );
  };
      const makeData = (rows) => {
        return rows.map((row, index) => ({
          sno: index + 1,
          Date: row.Date,
          FullName: row.FullName,
          Email: row.Email,
          Phone: row.Phone,
          MakeModel:renderVehicle({VINum: row.VINum, name: row.MakeModel}),
          VINum:row.VINum,
          AuthorName:row.Author ? row.Author?.FirstName + " " + row.Author?.LastName : "Not Available",
          //manage: renderOptions(index),
        }));
      };
    
    return (
        <div>
            <Table header={header} rows={makeData(testDriveUsers)} />
        </div>
    );
}

export default TestDrives;