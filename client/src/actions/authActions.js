import axios from "../axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  USER_LOADING,
  SET_CURRENT_USER,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  REGISTER_FAIL
} from "./types";
import { returnErrors, clearErrors } from './errorActions'

// Register User
export const registerUser = (userData, setError , history) => dispatch => {
  dispatch({ type: USER_LOADING })
  axios
    .post("/api/user/register", userData)
    .then(res => {
      if(res.status === 200) {
        history.push("/login")
      }
    })
    .catch(err => {
      const message = err.response?.data?.error?.message || err.message;
      setError(message)
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR
      })
      
    });
}

// Login - get user token
export const loginUser = (userData,setError) => dispatch => {
  axios
    .post("/api/user/login", userData)
    .then(res => {
      if (res.status === 200) {
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setAuthToken(accessToken);
        const decoded = jwt_decode(accessToken);
        dispatch(setCurrentUser(decoded));
      }
    })
    .catch(err => {
      const message = err.response?.data?.error?.message || err.message;
      setError(message)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}


export const refreshUserToken = () => dispatch => {
  const oldRefreshToken = localStorage.getItem("refreshToken");

  axios
    .post("/api/user/refresh-token",{refreshToken: "Bearer " + oldRefreshToken})
    .then(res => {
      if (res.status === 200) {

        const { accessToken, refreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setAuthToken(accessToken);
        const decoded = jwt_decode(accessToken);
        dispatch(setCurrentUser(decoded));
      }
    })
    .catch(err => {
      const message = err.response?.data?.error?.message || err.message;
      dispatch({
        type: LOGIN_FAIL,
      })
    });
}
export const socialLogin = (tokens) => dispatch => {
  
        const { accessToken, refreshToken } = tokens;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setAuthToken(accessToken);
        const decoded = jwt_decode(accessToken);
        dispatch(setCurrentUser(decoded));
  
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
}

// Log user out
export const logoutUser = () => dispatch => {
  axios
  .post("/api/user/logout", { refreshToken: localStorage.refreshToken})
  .then(res => {
    dispatch({ type: LOGOUT_SUCCESS })
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  });
}