import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { states } from "../assets/data/states";
import styles from "../assets/material/LoginResgister";
import { validPassword } from "../utils/validations";

function MoreDetailsDialog({ visible, type, handleClose }) {
  const classes = makeStyles(styles);
  const [user, setUser] = useState({
    Password: "",
    cPassword: "",
    Phone: "",
    State: "",
    isDealer: false,
    dealerName: "",
    dealerEmail: "",
    dealerPhone: "",
    dealerNZBN: "",
  });
  const {
    Password,
    cPassword,
    Phone,
    State,
    isDealer,
    dealerName,
    dealerEmail,
    dealerPhone,
    dealerNZBN,
  } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleDealerChange = (e) => {
    setUser({
      ...user,
      isDealer: !isDealer,
    });
  };
  const handleSubmit = () => {
    
  }
  const renderDealerForm = () => {
    if (isDealer) {
      return (
        <>
          <TextField
            required
            error={!!dealerName && dealerName.length !== 10}
            type="number"
            name="dealerName"
            label="Dealership Name"
            value={dealerName}
            onChange={handleChange}
          />
          <TextField
            required
            error={!!dealerPhone && dealerPhone.length !== 10}
            type="number"
            name="dealerPhone"
            label="Dealership Phone"
            value={dealerPhone}
            onChange={handleChange}
          />
          <TextField
            required
            error={!!dealerEmail && dealerEmail.length !== 10}
            type="number"
            name="dealerEmail"
            label="Dealership Email"
            value={dealerEmail}
            onChange={handleChange}
          />
          <TextField
            required
            error={!!dealerNZBN && dealerNZBN.length !== 10}
            type="number"
            name="dealerNZBN"
            label="Dealership NZBN"
            value={dealerNZBN}
            onChange={handleChange}
          />
        </>
      );
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={visible}
    >
      <Typography variant={"h2"} id="simple-dialog-title" style={{textAlign:"center",padding:"1rem",fontSize:"2rem"}}>
        Last Step!
      </Typography>
      <div
      style={{padding:"1rem 10%"}}

      >
      <TextField
        required
        error={!!Phone && Phone.length !== 10}
        type="number"
        name="Phone"
        label="Phone Number"
        value={Phone}
        onChange={handleChange}
      />
      <FormControl className={classes.controller}>
        <InputLabel id="NZ-province">Province</InputLabel>
        <Select
          required
          labelId="NZ-province"
          id="demo-simple-select-outlined"
          label="Province"
          name="State"
          value={State}
          onChange={handleChange}
        >
          <MenuItem>
            <em>Select Province</em>
          </MenuItem>
          {states.map((state, index) => (
            <MenuItem key={index} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        required
        error={!!Password && !validPassword(Password)}
        name="Password"
        label="Password"
        type="password"
        value={Password}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        error={!!cPassword && cPassword !== Password}
        required
        name="cPassword"
        label="Confirm Password"
        type="password"
        value={cPassword}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Switch
            checked={isDealer}
            onChange={handleDealerChange}
            name="isDealer"
            color="primary"
          />
        }
        label="Are you a dealer?"
      />
      {renderDealerForm()}
      <Button>Submit</Button>
      </div>
    </Dialog>
  );
}

export default MoreDetailsDialog;
