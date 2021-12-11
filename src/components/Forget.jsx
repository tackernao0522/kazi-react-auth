import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class Forget extends Component {
  state = {
    email: '',
    message: ''
  }

  // Forget Form Submit
  formSubmit = (e) => {
    e.preventDefault()

    const data = {
      email: this.state.email,
    }

    axios.post('/forgetpassword', data)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  render() {
    return (
      <div>
        <br />
        <br />
        <div className="row">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">Forget Password</h3>
            <form onSubmit={this.formSubmit}>
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
              <button type="submit" className="btn btn-primary btn-block">
                Forget Password
              </button>
              <br />
              Have an Account? <Link to="/login">Login Here</Link>
              <br />
              Don't have Account? <Link to="/register">Register</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Forget
