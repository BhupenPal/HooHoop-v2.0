import axios from "../utils/axios";

export const fetchCar = async (id) => {
  const res = await axios.get(`/api/car/${id}`);
  const car = res.data;
  return {
    Featured: {
      value: car.Featured?.value,
      Time: car.Featured?.Time,
    },
    Dealer: {
      value: car.Dealer.value,
      Name: car.Dealer.Name,
      Phone: car.Dealer.Phone,
      Email: car.Dealer.Email,
      Location: car.Dealer.Location,
    },
    FuelStar: car.FuelStar,
    SafetyStar: car.SafetyStar,
    DriveWheel4: car.DriveWheel4,
    ONRoadCost: car.ONRoadCost,
    ViewsCount: car.ViewsCount,
    isActive: car.isActive,
    isNewCar: car.isNewCar,
    _id: car._id,
    Make: car.Make,
    Model: car.Model,
    ModelYear: car.ModelYear,
    Price: car.Price,
    MinPrice: car.MinPrice,
    BodyType: car.BodyType,
    DoorCount: car.DoorCount,
    SeatCount: car.SeatCount,
    VINum: car.VINum,
    KMsDriven: car.KMsDriven,
    Color: car.Color,
    EngineSize: car.EngineSize,
    Transmission: car.Transmission,
    FuelType: car.FuelType,
    WOFExpiry: car.WOFExpiry,
    REGExpiry: car.REGExpiry,
    Description: car.Description,
    Author: car.Author,
    Visitors: car.Visitors,
    DetailEnquiry: car.DetailEnquiry,
    TotalFrames: car.TotalFrames,
    State: car.State,
    updatedAt: car.updatedAt,
    createdAt: car.createdAt,
  };
};

export const fetchRecommendedCar = async (price) => {
  const res = await axios.get(`/api/recommended-cars/${price}`);
  return res.data;
};

export const fetchBuyCar = async (PageNo = 1, query = "") => {
  const res = await axios.get(`/api/buy-car/${PageNo}?${query}`);
  const cars = res.data.docs.map((car) => ({
    BodyType: car.BodyType,
    FuelType: car.FuelType,
    KMsDriven: car.KMsDriven,
    Make: car.Make,
    Model: car.Model,
    ModelYear: car.ModelYear,
    Price: car.Price,
    LikedBy:Array.isArray(car.LikedBy) ? false : car.LikedBy,
    State: car.State,
    VINum: car.VINum,
    _id: car._id,
  }));
  return {
    featured: {},
    cars: {
      docs: cars,
      hasNextPage: res.data.hasNextPage,
      hasPrevPage: res.data.hasPrevPage,
      limit: res.data.limit,
      nextPage: res.data.nextPage,
      page: res.data.page,
      pagingCounter: res.data.pagingCounter,
      prevPage: res.data.prevPage,
      totalDocs: res.data.totalDocs,
      totalPages: res.data.totalPages,
    },
  };
};
