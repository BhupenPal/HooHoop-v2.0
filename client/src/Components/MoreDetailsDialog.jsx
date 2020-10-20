import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";

function MoreDetailsDialog({visible,type,handleClose}) {
  
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={visible}
    >
      <DialogTitle id="simple-dialog-title">Sign Up</DialogTitle>
     
    </Dialog>
  );
}

export default MoreDetailsDialog;
