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

export const setFilterBrands = (data) => {
    return {
        type: SET_FILTER_BRANDS,
        payload:data
    }
}
export const setFilterBody = (data) => {
    return {
        type: SET_FILTER_BODY,
        payload:data
    }
}
export const setFilterYearRange = (data) => {
    return {
        type: SET_FILTER_YEAR_RANGE,
        payload:data
    }
}
export const setFilterPriceRange = (data) => {
    return {
        type: SET_FILTER_PRICE_RANGE,
        payload:data
    }
}
export const setFilterKMRange = (data) => {
    return {
        type: SET_FILTER_KM_RANGE,
        payload:data
    }
}
export const setFilterFuelType = (data) => {
    return {
        type: SET_FILTER_FUEL_TYPE,
        payload:data
    }
}
export const setFilterBodyType = (data) => {
    return {
        type: SET_FILTER_BODY_TYPE,
        payload:data
    }
}
export const setFilterTransmission = (data) => {
    return {
        type: SET_FILTER_TRANSMISSION,
        payload:data
    }
}
export const setFilterColor = (data) => {
    return {
        type: SET_FILTER_COLOR,
        payload:data
    }
}

export const setFilterState = (data) => ({
    type:SET__FILTER_STATE,
    payload:data
})