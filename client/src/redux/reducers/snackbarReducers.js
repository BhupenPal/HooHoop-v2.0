import { OPEN_SNACKBAR,CLOSE_SNACKBAR } from "../actions/types";

const initialState = {
  message:"",  
  open:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        message:action.payload,
        open:true
      };

    case CLOSE_SNACKBAR:
      return {
        message:"",
        open:false
      };

    default:
      return state;
  }
}