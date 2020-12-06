import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useState } from "react";
import { deleteListing } from "../services/listings.js";
import ListingOptions from "./Buttons/ListingOptions.jsx";
import DeleteDialog from "./Modals/DeleteListingModal.jsx";
import EditCarModal from "./Modals/EditCarModal.jsx";
import CustomTable from "./Table.jsx";


const useStyles = makeStyles((theme) => ({

  vehicle: {
    display: "flex",
    alignItems: "center",
  },
  vehicleImg: {
    borderRadius: "200rem",
    marginRight: "0.5rem",
  },
}));

function Listing({listings,listLoader,setListing}) {
  const classes = useStyles();
  const [currentVINum, setVINum] = useState("");
  const [currentCar, setCar] = useState(null);
  const [openEditDialog, setEditDialog] = useState(false);
  const [openDialog, setDialog] = useState(false);

  const header = [
    {
      title: "S No.",
      key: "sno",
    },
    {
      title: "Date",
      key: "date",
    },
    {
      title: "Vehicle",
      key: "Make",
    },
    {
      title: "Views",
      key: "ViewsCount",
    },
  
    {
      title: "Unique ID",
      key: "VINum",
    },
  
    {
      title: "Price",
      key: "Price",
    },
    {
      title: "Author Email",
      key: "Email",
    },
    {
      title: "Manage",
      key: "manage",
    },
  ];
  
  const makeData = (rows) => {
    return rows.map((row, index) => ({
      sno: index + 1,
      date: row.date,
      Make: row.Make,
      ViewsCount: row.ViewsCount,
      VINum: row.VINum,
      Price: row.Price,
      Email: row.Author.Email || "Not Available",
      manage: renderOptions(index,row),
    }));
  };


  const showEditDialog = (car) => {
    setEditDialog(true);
    setCar(car);
  };
  const closeEditDialog = () => {
    setEditDialog(false);
    setCar(null);
  };
  const showDialog = (VINum) => {
    setDialog(true);
    setVINum(VINum);
  };
  const closeDialog = () => {
    setDialog(false);
    setVINum("");
  };
  const deleteCarFromList = (VINum) => {
    setListing((cars) => {
      return cars.filter((car) => car.VINum !== VINum);
    });
  };


  const handleDeleteCar = (VINum) => {
    if (VINum && VINum.length > 0) {
      deleteListing(VINum).then((isSuccess) => {
        if (isSuccess) {
          deleteCarFromList(VINum);
        }
        closeDialog();
      });
    }
  };
  const renderOptions = (index, car) => {
    return (
      <ListingOptions car={car} showDeleteDialog={showDialog} showEditDialog={showEditDialog} classes={classes}/>
    );
  };

  const renderVehicle = ({ imgUrl, name }) => {
    return (
      <div className={classes.vehicle}>
        <img className={classes.vehicleImg} height={"20rem"} src={imgUrl} />{" "}
        {name}
      </div>
    );
  };
  return (
    <>
      <EditCarModal
        open={openEditDialog}
        car={currentCar}
        onClose={closeEditDialog}
      />
      <DeleteDialog
        open={openDialog}
        message={`Are you sure you want to permanently remove car with VI number ${currentVINum}?`}
        handleConfirm={() => handleDeleteCar(currentVINum)}
        deleteCarFromList={deleteCarFromList}
        VINum={currentVINum}
        onClose={closeDialog}
      />
      <CustomTable header={header} rows={makeData(listings)} />
      {listLoader ? (
        <Skeleton variant="rect" width={"100%"} height={60} />
      ) : null}
    </>
  );
}

export default Listing;
