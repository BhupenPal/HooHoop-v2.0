import { combineReducers } from "redux"

import authReducer from "./authReducers"
import errorReducer from "./errorReducers"
import filterReducer from "./filterReducer"
import sideBarReducers from "./sideBarReducers"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  sideBar: sideBarReducers,
  filter: filterReducer
})