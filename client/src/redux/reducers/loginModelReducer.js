import { OPEN_LOGIN_MODEL,CLOSE_LOGIN_MODEL } from "../actions/types";

const initialState = {
  active:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN_MODEL:
      return {
        active:true
      };

    case CLOSE_LOGIN_MODEL:
      return {
        active:false
      };

    default:
      return state;
  }
}