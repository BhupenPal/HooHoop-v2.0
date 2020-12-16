import Axios from "../utils/axios";
import objectToFormData from "../utils/objectToFormData.js";
import { errorSnackbar,successSnackbar } from "../utils/showSnackbar";

export const postSellCar = async (data) => {
  const body = {
    Make: data.Make,
    Model: data.Model,
    ModelYear: data.ModelYear,
    Price: data.Price,
    BodyType: data.BodyType,
    State: data.State,
    DoorCount: data.DoorCount,
    SeatCount: data.SeatCount,
    Transmission: data.Transmission,
    KMsDriven: data.KMsDriven,
    Color: data.Color,
    VINum: `${process.env.NODE_ENV == 'DEV' ? 'test_': ''}data.VINum`,
    EngineSize: data.EngineSize,
    FuelType: data.FuelType,
    WOFExpiry: data.WOFExpiry,
    REGExpiry: data.REGExpiry,
    Description: data.Description,
    Dealer: data.Dealer,
    ONRoadCost: data.ONRoadCost,
    WheelDrive4: data.WheelDrive4,
    isExteriorVideo: !!data.ExteriorVideo,
    isExteriorSlider: !!data.ExteriorSlider,
    is360Images: !!(
      (data.InteriorFront && data.InteriorFront[0]) ||
      (data.InteriorMiddle && data.InteriorMiddle[0]) ||
      (data.InteriorRear && data.InteriorRear[0])
    ),
    ExteriorVideo: data.ExteriorVideo && data.ExteriorVideo[0],
    ExteriorSlider: data.ExteriorSlider && data.ExteriorSlider,
    InteriorFront: data.InteriorFront && data.InteriorFront[0],
    InteriorMiddle: data.InteriorMiddle && data.InteriorMiddle[0],
    InteriorRear: data.InteriorRear && data.InteriorRear[0],
    Accessories: data.Accessories,
  };
  let headers = {
    "Content-Type":
      "multipart/form-data; charset=utf-8; boundary=" +
      Math.random().toString().substr(2),
  };
  try {
    const res = await Axios.post(
      `/api/user/sell-form/submit?VINum=${data.VINum}`,
      objectToFormData(body),
      { headers }
    );
    successSnackbar("Car Added Successfully");
    return res;
  } catch (err) {
    errorSnackbar("Something Went Wrong");
    return null;
  }
};
