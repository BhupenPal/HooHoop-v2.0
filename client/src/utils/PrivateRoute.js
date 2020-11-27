import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { GetLSWithExpiry } from "./validations"

const PrivateRoute = ({ component: Component, auth, path, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        GetLSWithExpiry('isAuthenticated')
          ?
          <Route path={path} component={() => <Component {...props} />} />
          :
          <Redirect to={`/login?redirect=${window.location.pathname}`} />
      }
    />
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)