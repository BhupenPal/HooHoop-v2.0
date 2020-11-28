import {
  SET_FILTER_BRANDS,
  SET_FILTER_BODY,
  SET_FILTER_YEAR_RANGE,
  SET_FILTER_PRICE_RANGE,
  SET_FILTER_KM_RANGE,
  SET_FILTER_FUEL_TYPE,
  SET_FILTER_BODY_TYPE,
  SET_FILTER_TRANSMISSION,
  SET_FILTER_COLOR,
  SET__FILTER_STATE,
} from "../actions/types";
import {bodyTypes,transmissionTypes,fuelTypes,colors} from "../../assets/data/carTypes.js";
import MakeModel from "../../assets/data/MakeModel.js";

const arrayToObject = (array) => {
    const obj = {};
    array.forEach(item => obj[item] = false);
    return obj
}


const initialState = {
    brands:arrayToObject(MakeModel.map(item => item.Make)),
    bodies:{},
    yearRange:[new Date().getFullYear() - 35, new Date().getFullYear()],
    priceRange:[0, 100000],
    kmsDriven:[0, 200000],
    bodyTypes:arrayToObject(bodyTypes),
    transmissions:arrayToObject(transmissionTypes),
    fuelTypes:arrayToObject(fuelTypes),
    colors:arrayToObject(colors),
    state:"",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_BRANDS:
        return {
            ...state,
            brands:action.payload
        }
    case SET_FILTER_BODY:
        return {
            ...state,
            bodies:action.payload
        }
    case SET_FILTER_YEAR_RANGE:
        return {
            ...state,
            yearRange:action.payload
        }
    case SET_FILTER_PRICE_RANGE:
        return {
            ...state,
            priceRange:action.payload
        }
    case SET_FILTER_KM_RANGE:
        return {
            ...state,
            kmsDriven:action.payload
        }
    case SET_FILTER_BODY_TYPE:
        return {
            ...state,
            bodyTypes:action.payload,
        }
    case SET_FILTER_TRANSMISSION:
        return {
            ...state,
            transmissions:action.payload,
        }
    case SET_FILTER_FUEL_TYPE:
        return {
            ...state,
            fuelTypes:action.payload
        }
    case SET_FILTER_COLOR:
        return {
            ...state,
            colors:action.payload
        }
    case SET__FILTER_STATE: 
        return {
            ...state,
            state:action.payload
        }
    default:
      return state;
  }
}
