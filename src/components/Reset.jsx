import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from './atoms/button/PrimaryButton'

class Reset extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    message: '',
  }

  // Rest Form Submit
  formSubmit = (e) => {
    e.preventDefault()

    const data = {
      token: this.state.token,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    }

    axios
      .post('/resetpassword', data)
      .then((response) => {
        this.setState({ message: response.data.message })
        document.getElementById('formsubmit').reset()
      })
      .catch((error) => {
        this.setState({ message: error.response.data.message })
      })
  }

  render() {
    // Show Error Message
    let error = ''
    if (this.state.message) {
      error = (
        <div>
          <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        </div>
      )
    }
    return (
      <div>
        <br />
        <br />
        <div className="row">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">Reset Password</h3>
            <form onSubmit={this.formSubmit} id="formsubmit">
              {error}
              <div className="form-group">
                <label for="exampleInputEmail1">Pin Code</label>
                <input
                  type="text"
                  name="token"
                  className="form-control"
                  placeholder="Enter Pin Code"
                  required
                  onChange={(e) => {
                    this.setState({ token: e.target.value })
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
                <label for="exampleInputPassword1">New Password</label>
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
              <PrimaryButton>Reset Password</PrimaryButton>
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

export default Reset
