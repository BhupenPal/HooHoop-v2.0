import React from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

function ListingOptions({car,showEditDialog,showDeleteDialog,classes}) {
  return (
    
      <div>
        <span className={classes.options}>
        <InfoOutlinedIcon />

        </span>

        <span className={classes.options} onClick={() => showEditDialog(car)}>
          <EditOutlinedIcon />
        </span>
        <span className={classes.options} onClick={() => showDeleteDialog(car.VINum)}>
          <DeleteOutlineOutlinedIcon />
        </span>
      </div>
    
  );
}

export default ListingOptions;
