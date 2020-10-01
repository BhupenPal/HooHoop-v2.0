const { Description } = require("@material-ui/icons");
const { default: Axios } = require("axios");

const required = name => {
    throw new Error(`Parameter ${name} is required`);
};
export const postCarDetails = async (
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
    Dealer = required('Dealer'),
    isExteriorVideo = required('isExteriorVideo'),
    isExteriorSlider = required('isExteriorSlider'),
    is360Images = required('is360Images'),
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
    const res = await Axios.post('/api/user/sell-form/submit',body);
    return res;
}