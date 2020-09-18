import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import SideBar from "../Components/Sidebar.jsx";
class Dashboard extends Component {
  Logout = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <main>
        <SideBar>
          Dashboard
          <button onClick={this.Logout}>Logout</button>
        </SideBar>
      </main>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
