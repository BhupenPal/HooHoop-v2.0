import { CRSF_TOKEN_FETCHED } from "../actions/types";

const initialState = {
  crsfAvailable: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CRSF_TOKEN_FETCHED:
      return {
        ...state,
        crsfAvailable: true,
      };
    default:
      return state;
  }
}
