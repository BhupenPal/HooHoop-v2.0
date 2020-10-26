import axios from "axios";
import getNewToken from "./services/getNewToken";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.message,error.response.status);
    if(error.response.status === 401){
      getNewToken()
    }
    return Promise.reject(error);
  }
);

export default axios;   
