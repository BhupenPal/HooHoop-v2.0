import { combineReducers } from "redux"

import authReducer from "./authReducers"
import csrfReducer from "./csrfReducer"
import errorReducer from "./errorReducers"
import filterReducer from "./filterReducer"
import loginModelReducer from "./loginModelReducer"
import sideBarReducers from "./sideBarReducers"
import snackbarReducers from "./snackbarReducers"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  sideBar: sideBarReducers,
  filter: filterReducer,
  csrf: csrfReducer,
  snackBar:snackbarReducers,
  loginModel: loginModelReducer,
})
