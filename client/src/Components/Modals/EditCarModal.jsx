import { Button, Dialog, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import React, { useStyles } from "react";
import { deleteListing } from "../../services/listings";


function EditCarModal(props) {
  // const classes = useStyles();
  const { onClose, car, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
 
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Edit User

      </DialogTitle>
      {/* <DialogContent>
        <Grid container spacing={"2"} style={{display:"flex"}}>
          <Grid item xs={6}>
          <Button onClick={handleClose}>No</Button>
          </Grid>
          <Grid item xs={6}>
          <Button onClick={handleConfirm}>Yes</Button>
          </Grid>
        </Grid>
      </DialogContent> */}
    </Dialog>
  );
}

export default EditCarModal;
