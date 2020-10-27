import axios from "axios";
import store from "./store";
import { refreshUserToken } from "./actions/authActions";
import jwt_decode from "jwt-decode";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
 //   console.log("hi")
 // console.log(config)
  //console.log(config,store.getState().auth?.token)
  // if(error.response.status === 401){
  //   store.dispatch(refreshUserToken());
  //  }
 // const state = store.getState();

  //const user = jwt_decode(localStorage.getItem("accessToken"));
 // console.log()
  // if(accessToken){
  //   const decoded = jwt_decode
  // }
  console.log(config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// axios.interceptors.request.use(
//   function (request) {

//   },
//   function (error) {

//   }
// )

axios.interceptors.response.use(
  function (response) {
    console.log(store.getState())
    return response;
  },
  function (error) {
    console.log(error.message,error.response.status);
    if(error.response && error.response.status === 401){
       store.dispatch(refreshUserToken());
    }
    return Promise.reject(error);
  }
)

export default axios;