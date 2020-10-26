import Axios from "../axios";
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
    VINum,
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
        VINum,
        EngineSize,
        FuelType,
        WOFExpiry,
        REGExpiry,
        Description,
        Dealer,
        !!ExteriorVideo,
        !!ExteriorSlider,
        is360Images,
        ExteriorVideo && ExteriorVideo[0],
        ExteriorSlider && ExteriorSlider[0],
        InteriorFront && InteriorFront[0],
        InteriorMiddle && InteriorMiddle[0],
        InteriorRear && InteriorRear[0]
    
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
    VINum = required('VINum'),

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
        VINum,
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