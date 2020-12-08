import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useEffect, useState, useStyles } from "react";
import { deleteListing } from "../../services/listings";
import RichTextEditor from "../Inputs/RichTextEditor.jsx";
import DateFnsUtils from "@date-io/date-fns";

function EditCarModal(props) {
  // const classes = useStyles();
  const { onClose, car, open } = props;
  const [currentCar,setCar] = useState({
    Price:0,
    KMSDriven:0,
    WOFExpiry: new Date(),
    Description:"",
  });
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {};
  useEffect(() => {
    console.log("car" ,car);
    if(car){
    setCar({
      Price:car?.Price,
      KMSDriven:car?.KMSDriven,
      WOFExpiry: new Date(car?.WOFExpiry),
      Description:car?.Description,
    });
  }
  })
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Edit Car</DialogTitle>
      <DialogContent>
        <TextField
          id={"selling-price"}
          required
          value={currentCar?.Price}
          type="number"
          label="Selling Price"
          variant="outlined"
        />
{/* 
        <TextField
          id={"min-price"}
          required
          type="number"
          label="Min Price"
          variant="outlined"
        /> */}

        <TextField
          id={"kilometers"}
          required
          value={currentCar?.KMSDriven}
          type="number"
          label="Kilometers"
          variant="outlined"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            format="MM/dd/yyyy"
            margin="normal"
            id="wof"
            label="WOF Expiry"
            name="WOFExpiry"
            value={currentCar?.WOFExpiry}
            //value={dataobject.WOFExpiry}
            //onChange={(date) => changedata({ ...dataobject, WOFExpiry: date })}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <RichTextEditor handleEditorChange={console.log} />
        <Box mt={2}>
          <Button>Submit</Button>
        </Box>
      </DialogContent>
      
    </Dialog>
  );
}

export default EditCarModal;
