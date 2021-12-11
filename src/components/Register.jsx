import axios from 'axios'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { PrimaryButton } from './atoms/button/PrimaryButton'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    message: '',
  }

  // Register Form Submit
  formSubmit = (e) => {
    e.preventDefault()

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    }

    axios
      .post('/register', data)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        this.setState({
          loggedIn: true,
        })
        this.props.setUser(response.data.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    // After Register Redirect to Profile
    if (this.state.loggedIn) {
      return <Redirect to={'/profile'} />
    }

    return (
      <div>
        <br />
        <br />
        <div className="row">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">Register Account</h3>
            <form onSubmit={this.formSubmit}>
              <div className="form-group">
                <label for="exampleInputEmail1">User Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                  required
                  onChange={(e) => {
                    this.setState({ name: e.target.value })
                  }}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                  onChange={(e) => {
                    this.setState({ email: e.target.value })
                  }}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    this.setState({ password: e.target.value })
                  }}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => {
                    this.setState({ password_confirmation: e.target.value })
                  }}
                />
              </div>
              <PrimaryButton>Register</PrimaryButton>
              <br />
              Have an Accout? <Link to="/login">Login Here</Link>
              <br />
              Forget My Password <Link to="/forget">Click Here</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
