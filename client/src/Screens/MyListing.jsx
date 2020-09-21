import { makeStyles } from '@material-ui/core';
import React from 'react';
import SideBar from '../Components/Sidebar.jsx';
import Table from '../Components/Table.jsx';


const useStyles = makeStyles((theme) => ({
    root:{
        padding:"2rem"
    },
    header:{
        padding:"2rem",
        display:"flex",
        alignItems:"baseline"
    },
    heading:{
        margin:"0 1rem"
    }

  }));
function MyListing(props) {
    const classes = useStyles();
    const header = [
        {
            title:"S No.",
            key:"id"
        },
        {
            title:"Date",
            key:"id"
        },
        {
            title:"Vehicle",
            key:"id"
        },
        {
            title:"Views",
            key:"id"
        },

        {
            title:"Clicks",
            key:"id"
        },

        {
            title:"Unique ID",
            key:"id"
        },

        {
            title:"Price",
            key:"id"
        },

        {
            title:"Manage",
            key:"id"
        },
    ]
    const rows = [
        {
            "id":"Hello"
        },
        {
            "id":"Hello"
        }
    ]
    return (
        <SideBar>
        <div className={classes.root}>
            <div className={classes.header}>
                <h1 className={classes.heading}>My Listings</h1>
                <p className={classes.heading}>144 Total</p>
                <p className={classes.heading}>Sort by :</p>
            </div>
            <Table header={header} rows={rows}/>
        </div>
        </SideBar>
    );
}

export default MyListing;