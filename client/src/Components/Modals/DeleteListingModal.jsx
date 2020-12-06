import { Button, Dialog, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import React, { useStyles } from "react";

function DeleteDialog(props) {
  // const classes = useStyles();
  const { onClose, message, open,handleConfirm } = props;

  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        {message}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={"2"} style={{display:"flex"}}>
          <Grid item xs={6}>
          <Button onClick={handleClose}>No</Button>
          </Grid>
          <Grid item xs={6}>
          <Button onClick={handleConfirm}>Yes</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
