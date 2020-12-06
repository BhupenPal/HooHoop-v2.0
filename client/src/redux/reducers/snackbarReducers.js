import { OPEN_SNACKBAR,CLOSE_SNACKBAR } from "../actions/types";

const initialState = {
  message:"",  
  severity:null,
  open:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        message:action.payload.message,
        severity:action.payload.severity,
        open:true
      };

    case CLOSE_SNACKBAR:
      return {
        message:"",
        severity: state.severity,
        open:false
      };

    default:
      return state;
  }
}