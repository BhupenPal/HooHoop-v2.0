import Axios from "axios";
import objectToFormData from "../utils/objectToFormData.js";

const required = name => {
    throw new Error(`Parameter ${name} is required`);
};
export const postSellCar = async ({
    Make,
    Model,
    ModelYear,
    Price,
    BodyType,
    DoorCount,
    SeatCount,
    Transmission,
    KMsDriven,
    Color,
    EngineSize,
    FuelType,
    WOFExpiry,
    REGExpiry,
    Description,
    Dealer,
    isExteriorVideo,
    isExteriorSlider,
    is360Images,
    ExteriorVideo,
    ExteriorSlider,
    InteriorFront,
    InteriorMiddle,
    InteriorRear

}) => {
    return postCarDetails(
        Make,
        Model,
        ModelYear,
        Price,
        BodyType,
        DoorCount,
        SeatCount,
        Transmission,
        KMsDriven,
        Color,
        EngineSize,
        FuelType,
        WOFExpiry,
        REGExpiry,
        Description,
        Dealer,
        !!ExteriorVideo,
        !!ExteriorSlider,
        is360Images,
        ExteriorVideo,
        ExteriorSlider,
        InteriorFront,
        InteriorMiddle,
        InteriorRear
    
    )
}
 const postCarDetails = async (
    Make = required('Make'),
    Model = required('Model'),
    ModelYear = required('ModelYear'),
    Price = required('Price'),
    BodyType = required('BodyType'),
    DoorCount = required('DoorCount'),
    SeatCount = required('SeatCount'),
    Transmission = required('Transmission'),
    KMsDriven = required('KMsDriven'),
    Color = required('Color'),
    EngineSize = required('EngineSize'),
    FuelType = required('FuelType'),
    WOFExpiry = required('WOFExpiry'),
    REGExpiry = required('REGExpiry'),
    Description = required('Description'),
    Dealer,
    isExteriorVideo = required('isExteriorVideo'),
    isExteriorSlider = required('isExteriorSlider'),
    is360Images,
    ExteriorVideo,
    ExteriorSlider,
    InteriorFront,
    InteriorMiddle,
    InteriorRear
) => {
    const body = {
        Make ,
        Model,
        ModelYear,
        Price,
        BodyType,
        DoorCount,
        SeatCount,
        Transmission,
        KMsDriven,
        Color,
        EngineSize,
        FuelType,
        WOFExpiry,
        REGExpiry,
        Description,
        Dealer,
        isExteriorVideo,
        isExteriorSlider,
        is360Images,
        ExteriorVideo,
        ExteriorSlider,
        InteriorFront,
        InteriorMiddle,
        InteriorRear
    }
    const res = await Axios.post('/api/user/sell-form/submit',objectToFormData(body));
    return res;
}