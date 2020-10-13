import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    boxContainer:{
        backgroundColor:"#fff",
        width:"-webkit-fill-available",
        padding:"1rem",
        margin:"1rem",
        height:"fit-content",
        [theme.breakpoints.down('md')]: {
            padding:"1rem",
            margin:"1rem 0",
          }
    },
    options:{
        border: "1px solid #708DC7",
        color:"#708DC7",
        padding:"0.5rem 1rem",
        borderRadius:"5px",
        marginTop:"1rem",

    },
    optionLabel:{
        display:"block",
        width:"100%",
        padding: "0.3rem 0.8rem",
    },
    checked:{
        backgroundColor:"#708DC7",
        color:"#fff"
    },
}))
function LeadForm({handleChange,handleCheckboxChange,user,handleSubmit}) {
    const classes = useStyles();
    return (
        <>
        <div className={classes.boxContainer}>Share This Deal</div>
        <div className={classes.boxContainer}>
          <div>Interested in this Car?</div>
          <div>Share your details and make offer!</div>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              name={"FullName"}
              value={user.FullName}
              label="Enter Name"
            />
            <TextField
              onChange={handleChange}
              name={"Phone"}
              value={user.Phone}
              label="Enter Phone No."
            />
            <Box mt={5}>
              <div className={`${classes.options} ${user.CallbackQuery ? classes.checked : ""}`}>
                <input
                  type="checkbox"
                  id="Contact Seller"
                  style={{ display: "none" }}
                  name="CallbackQuery"
                  onChange={handleCheckboxChange}

                />
                <label className={classes.optionLabel} htmlFor="Contact Seller">Contact Seller</label>
              </div>
              <div className={`${classes.options} ${user.TestDriveQuery ? classes.checked : ""}`}>
                <input
                  type="checkbox"
                  id="Book A Test Drive"
                  style={{ display: "none" }}
                  name="TestDriveQuery"
                  onChange={handleCheckboxChange}

                />
                <label className={classes.optionLabel} htmlFor="Book A Test Drive">Book A Test Drive</label>
              </div>
              <div className={`${classes.options} ${user.ShipmentQuery ? classes.checked : ""}`}>
                <input
                  type="checkbox"
                  id="Shipping Query"
                  style={{ display: "none" }}
                  name="ShipmentQuery"
                  onChange={handleCheckboxChange}
                />
                <label className={classes.optionLabel} htmlFor="Shipping Query">Shipping Quote</label>
              </div>
            </Box>
            <Box mt={5}>
              <Button onClick={handleSubmit}>Submit</Button>
            </Box>
          </form>
        </div>
        </>
    );
}

export default LeadForm;