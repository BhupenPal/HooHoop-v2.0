import React, { Component } from "react"
import { logoutUser } from "../actions/authActions"
import store from "../store"

class Dashboard extends Component {
  constructor(props){
    super(props)
  }

  handleLogout = e => {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
  

  render() {
    return ( 
        <main>
            <button onClick={this.handleLogout}>Logout</button>
        </main>
    )
  }
}

export default Dashboard