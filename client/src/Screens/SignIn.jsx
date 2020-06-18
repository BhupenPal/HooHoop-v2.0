import React, { Component } from "react"
import '../assets/css/login.scss'

class Home extends Component {
  constructor(props) {
    super (props)

    this.state = {
      Email: '',
      Password: '',
      Errors: []
    }
  }

  handleChange = e => {
    const isCheckbox = e.target.type === 'checkbox'
    this.setState({
      [e.target.name]: isCheckbox
      ? e.target.checked
      : e.target.value
    })
  }

  validate = () => {
    return true
  }

  handleSubmit = e => {
    e.preventDefault()
    const isValid = this.validate()
    if(isValid){
      console.log(this.state)
    } else {
      console.log(this.state.Errors)
    }
  }

  render() {
    return ( 
      <form onSubmit={this.handleSubmit}>
        <input 
          type="email"
          name="Email"
          placeholder="Email"
          value={this.state.Email}
          onChange={this.handleChange}
        />
        <input 
          type="password"
          name="Password"
          placeholder="Password"
          value={this.state.Password}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default Home