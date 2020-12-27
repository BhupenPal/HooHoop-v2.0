import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState, useStyles } from "react";
import PaypalPaymentButton from "../../Components/Buttons/PaypalPaymentButton.jsx";

function AddMoneyModal({ open, setModal }) {
  const [amount, setAmount] = useState(50);
  const handleClose = () => {
    // onClose();
    setModal(false)
  };
  const onSuccess = (data) => {
    alert("Success");
    setModal(false)
    console.log(data);
    const payload = {};
  };
  const handleChange = (e) => {
    setAmount(e.target.value)
  }
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add Money</DialogTitle>
      <DialogContent>
        <TextField type="number" label="Enter Amount" value={amount}  onChange={handleChange}/>
        <PaypalPaymentButton
          toPay={amount}
          onSuccess={onSuccess}
          transactionError={console.log}
          transactionCancelled={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddMoneyModal;
