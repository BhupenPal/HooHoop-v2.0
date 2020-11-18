import {
  Avatar,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../redux/actions/authActions";
import { states } from "../../assets/data/carTypes";
import styles from "../../assets/material/LoginResgister";
import { validateEmail, validPassword } from "../../utils/validations";

function MoreDetailsDialog({ visible, type, handleClose, userDetails, GoogleID, FacebookID }) {
 
  const classes = makeStyles(styles);
  const [user, setUser] = useState({
    FirstName: userDetails?.FirstName,
    LastName: userDetails?.LastName,
    Email: userDetails?.Email,
    Gender:userDetails?.Gender,
    DOB:userDetails?.DOB,
    DOB:userDetails?.DOB,
    GoogleID,
    FacebookID,
    Phone: "",
    State: "",
    Password: "",
    cPassword: "",
    isDealer: false,
    dealerName: "",
    dealerEmail: "",
    dealerPhone: "",
    dealerNZBN: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [showError,setError] = useState(false)
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
  useEffect(() => {
    setUser({...user,...userDetails})
  },[userDetails])
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
  const validateForm = () => {
    if (!State || State.length < 1) {
      return false;
    } else if (!Password || !validPassword(Password)) {
      return false;
    } else if (cPassword !== Password) {
      return false;
    } else if (!Phone || Phone.length !== 10) {
      return false;
    } else if (!states.includes(State)) {
      return false;
    } else if (isDealer && (!dealerName || dealerName.length == 0)) {
      return false;
    } else if (isDealer && (!dealerEmail || !validateEmail(dealerEmail))) {
      return false;
    } else if (isDealer && (!dealerPhone || dealerPhone.length !== 10)) {
      return false;
    } else if (isDealer && (!dealerNZBN || dealerNZBN === 0)) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    if (validateForm()) {
      dispatch(registerUser(user, setError, history));
    }
  };
  const renderDealerForm = () => {
    if (isDealer) {
      return (
        <>
          <TextField
            required
            error={!!dealerName && dealerName.length === 0}
            type="text"
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
            error={!!dealerEmail && !validateEmail(dealerEmail)}
            type="email"
            name="dealerEmail"
            label="Dealership Email"
            value={dealerEmail}
            onChange={handleChange}
          />
          <TextField
            required
            error={!!dealerNZBN && dealerNZBN.length === 0}
            type="text"
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
      <Typography
        variant={"h2"}
        id="simple-dialog-title"
        style={{ textAlign: "center", padding: "1rem", fontSize: "2rem" }}
      >
        Last Step!
      </Typography>
      <div style={{ padding: "1rem 10%" }}>
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
            error={!!State && !states.includes(State)}

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
        <Button disabled={!validateForm()} onClick={handleSubmit}>Submit</Button>
      </div>
    </Dialog>
  );
}

export default MoreDetailsDialog;
