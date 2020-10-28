import {
  USER_LOADING,
  SET_CURRENT_USER,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR
} from '../actions/types'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null
}

export default function (state = initialState, action) {

  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }

    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }

    default:
      return state
  }

}