import axios from 'axios'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { PrimaryButton } from './atoms/button/PrimaryButton'

class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
  }

  // Login Form Submit
  formSubmit = (e) => {
    e.preventDefault()

    const data = {
      email: this.state.email,
      password: this.state.password,
    }

    axios
      .post('/login', data)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
          this.setState({
            loggedIn: true,
          })
          this.props.setUser(response.data.user);
      })
      .catch((error) => console.log(error))
  }

  render() {
    // After Login Redirect to Profile
    if (this.state.loggedIn) {
      return <Redirect to={'/profile'} />
    }

    return (
      <div>
        <br />
        <br />
        <div className="row">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">Login Account</h3>
            <form onSubmit={this.formSubmit}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  aria-describedby="emailHelp"
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
              <PrimaryButton>Login</PrimaryButton>
              <br />
              Forget My Password <Link to="/forget">Click Here</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
