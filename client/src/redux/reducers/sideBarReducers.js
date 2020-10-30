import { SHOW_SIDEBAR,HIDE_SIDEBAR } from "../actions/types";

const initialState = {
  active:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return {
        active:true
      };

    case HIDE_SIDEBAR:
      return {
        active:false
      };

    default:
      return state;
  }
}