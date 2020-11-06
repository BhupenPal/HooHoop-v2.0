import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../redux/actions/snackbarActions";

function CustomSnackbar(props) {
    const dispatch = useDispatch();
    const {open,message} = useSelector(state => state.snackBar)
    const handleClose = () => {
        dispatch(closeSnackbar())
    }
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
