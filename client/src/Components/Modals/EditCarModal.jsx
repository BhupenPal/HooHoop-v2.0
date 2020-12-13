import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState, useStyles } from "react";
import { deleteListing, editListing } from "../../services/listings";
import RichTextEditor from "../Inputs/RichTextEditor.jsx";
import DateFnsUtils from "@date-io/date-fns";
import { errorSnackbar } from "../../utils/showSnackbar";

function EditCarModal(props) {
  // const classes = useStyles();
  const { onClose, car, open, editCar } = props;
  const [currentCar, setCar] = useState({
    Price: 0,
    KMSDriven: 0,
    WOFExpiry: new Date(),
    Description: "",
  });

  const handleChange = (e) => {
    const isCheckBox = e.target.type === "checkbox";
    const isRadioBox = e.target.type === "radio";
    if (isRadioBox) {
      setCar({
        ...currentCar,
        [e.target.name]: JSON.parse(e.target.value),
      });
    } else {
      setCar({
        ...currentCar,
        [e.target.name]: isCheckBox ? e.target.checked : e.target.value,
      });
    }
  };

  const handleEditorChange = (content, editor) => {
    setCar({ ...currentCar, Description: content });
  };

  const handleClose = () => {
    onClose();
  };

  const validateForm = () => {
    if (currentCar.Price < 1) {
      errorSnackbar("Price is Required");
      return false;
    } else if (!currentCar.KMSDriven || currentCar.KMSDriven <= 0) {
      errorSnackbar("Kilometers Driven is Required");
      return false;
    } else if (!currentCar.WOFExpiry || currentCar.WOFExpiry === "") {
      errorSnackbar("Please Enter Valid WOFExpiry");
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    console.log(currentCar);
    if (validateForm()) {
      editListing(car.VINum, currentCar).then(() => {
        editCar(car.VINum,currentCar);
        handleClose();
      });
    }
  };
  useEffect(() => {
    console.log("car", car);
    if (car) {
      setCar({
        Price: car?.Price,
        KMSDriven: car?.KMSDriven,
        WOFExpiry: new Date(car?.WOFExpiry || null),
        Description: car?.Description,
      });
    }
  }, [car]);
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
          name={"Price"}
          value={currentCar?.Price}
          onChange={handleChange}
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
          name={"KMSDriven"}
          value={currentCar?.KMSDriven}
          type="number"
          label="Kilometers"
          onChange={handleChange}
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
            onChange={(date) => setCar({ ...currentCar, WOFExpiry: date })}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <RichTextEditor handleEditorChange={handleEditorChange} />
        <Box mt={2}>
          <Button onClick={handleConfirm}>Submit</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditCarModal;
