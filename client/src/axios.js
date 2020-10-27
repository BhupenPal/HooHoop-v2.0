import axios from "axios";
import store from "./store";
import { refreshUserToken } from "./actions/authActions";
import jwt_decode from "jwt-decode";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log("hi")

  //console.log(config,store.getState().auth?.token)
  // if(error.response.status === 401){
  //   store.dispatch(refreshUserToken());
  //  }
 // const state = store.getState();

  const user = jwt_decode(localStorage.getItem("accessToken"));
  console.log()
  // if(accessToken){
  //   const decoded = jwt_decode
  // }
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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 4xx cause this function to trigger
    // Do something with response error
   // console.log(error.message,error.response.status);
   
    return Promise.reject(error);
  }
)

export default axios;