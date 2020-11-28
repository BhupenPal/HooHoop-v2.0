import React from "react";
// import { hashHistory } from 'react-router';
import { Redirect } from "react-router-dom";
import { GetLSWithExpiry } from "../utils/validations";

// import Layout from '../Layout/Layout';
const CheckAuth = (OriginalComponent) => {
  class NewComponent extends React.Component {
   
    render = () => {
        if(GetLSWithExpiry('isAuthenticated')){
            return <OriginalComponent {...this.props} />;
        }else{

          return <Redirect to={`/login?redirect=${window.location.pathname}`} />;

        }

      
    };
  }
  return NewComponent;
};

export default CheckAuth;
