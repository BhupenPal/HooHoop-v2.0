import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

function OpenSnackBar({visible,setVisible,message,severity}) {
    const hideError = () => {
        setVisible(false);
    }
  return (
    <Snackbar
      open={visible}
      autoHideDuration={6000}
      onClose={hideError}
    >
      <Alert onClose={hideError} severity={severity || "error"}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default OpenSnackBar;
