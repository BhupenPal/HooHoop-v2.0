import Axios from "../utils/axios";
import { errorSnackbar, successSnackbar } from "../utils/showSnackbar";

export const getMyListing = async () => {
  let myListing = await Axios.get("/api/user/dashboard/listings");
  return myListing.data.docs.map((listing) => {
    return {
      FuelStar: listing.FuelStar,
      SafetyStar: listing.SafetyStar,
      ViewsCount: listing.ViewsCount,
      DetailEnquiry: listing.DealershipEmail,
      isActive: listing.isActive,
      isNewCar: listing.isNewCar,
      _id: listing._id,
      Make: listing.Make,
      Model: listing.Model,
      ModelYear: listing.ModelYear,
      Price: listing.Price,
      MinPrice: listing.MinPrice,
      BodyType: listing.BodyType,
      DoorCount: listing.DoorCount,
      SeatCount: listing.SeatCount,
      VINum: listing.VINum,
      KMsDriven: listing.KMsDriven,
      Color: listing.Color,
      EngineSize: listing.EngineSize,
      Transmission: listing.Transmission,
      FuelType: listing.FuelStar,
      WOFExpiry: listing.WOFExpiry,
      REGExpiry: listing.REGExpiry,
      DriveWheel4: listing.DriveWheel4,
      ONRoadCost: listing.ONRoadCost,
      Description: listing.Description,
      Visitors: listing.Visitors,
      LeadsGenerated:listing.LeadsGenerated,
      createdAt:listing.createdAt,
      Author: {
        Role: listing.Author?.Role,
        DealershipEmail: listing.Author?.DealershipEmail,
        _id: listing.Author?._id,
        FirstName: listing.Author?.FirstName,
        LastName: listing.Author?.LastName,
        Email: listing.Author?.Email,
        Phone: listing.Author?.Phone,
      },
      TotalFrames: listing.TotalFrames,
      State: listing.State,
      updatedAt: listing.updatedAt,
    };
  });
};

export const getAllListings = async () => {
  let allListing = await Axios.get("/api/user/dashboard/admin/listings");
  return allListing.data.docs.map((listing) => ({
    Featured: {
      value: listing.Featured?.value,
      Time: listing.Featured?.Time,
    },
    ViewsCount: listing.ViewsCount,
    isNewCar: listing.isNewCar,
    _id: listing._id,
    createdAt:listing.createdAt,
    Make: listing.Make,
    Model: listing.Model,
    Price: listing.Price,
    VINum: listing.VINum,
    LeadsGenerated: listing.LeadsGenerated,
    Author: {
      Role: listing.Author?.Role,
      DealershipEmail: listing.Author?.DealershipEmail,
      _id: listing.Author?._id,
      FirstName: listing.Author?.FirstName,
      LastName: listing.Author?.LastName,
      Email: listing.Author?.Email,
      Phone: listing.Author?.Phone,
    },
  }));
};

export const deleteListing = async (VINum) => {
  return Axios.delete("/api/user/dashboard/delete/listing", {
    data: { value: VINum },
  })
    .then(() => {
      successSnackbar("Car Deleted successfully");
      return true;
    })
    .catch((err) => {
      errorSnackbar(err?.message || "Something Went Wrong");
      return false;
    });
};

export const editListing = async (VINum, body) => {
  return Axios.post("/api/user/dashboard/edit/listing", { VINum, ...body })
    .then(() => {
      successSnackbar("Car Edited successfully");
      return true;
    })
    .catch((err) => {
      errorSnackbar(err?.message || "Something Went Wrong");
      return false;
    });
};
