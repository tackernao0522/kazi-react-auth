## Authentication Registration

+ `src/components/Register.jsx`を編集<br>

```
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
      name: this.state.email,
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
```

+ `src/router/HeaderRouter.jsx`を編集<br>

```
import axios from 'axios'
import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Nav from '../common/Nav'
import Forget from '../components/Forget'
import Home from '../components/Home'
import Login from '../components/Login'
import Profile from '../components/Profile'
import Register from '../components/Register'

class HeaderRouter extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    // Login User Credentials
    axios
      .get('/user')
      .then((response) => {
        this.setUser(response.data)
      })
      .catch((error) => {
        return console.log(error)
      })
  }

  setUser = (user) => {
    this.setState({ user: user })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav user={this.state.user} setUser={this.setUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              component={() => (
                <Login user={this.state.user} setUser={this.setUser} />
              )}
            />
            <Route
              exact
              path="/register"
              component={() => (
                <Register user={this.state.user} setUser={this.setUser} />
              )}
            />
            <Route exact path="/forget" component={Forget} />
            <Route
              exact
              path="/profile"
              component={() => <Profile user={this.state.user} />}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default HeaderRouter
```

## 239 Authentication : Logout

+ `src/common/Nav.jsx`を編集<br>

```
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  state = {
    loggedout: '',
  }

  logout = () => {
    localStorage.clear()
    this.props.setUser(null)
  }

  render() {
    let buttons
    let profile

    if (localStorage.getItem('token')) {
      buttons = (
        <div>
          <Link className="nav-link" to="/" onClick={this.logout}>
            Logout
          </Link>
        </div>
      )
      profile = (
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
      )
    } else {
      buttons = (
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      )
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            Easy Learning
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">{profile}</li>
            </ul>
            <span className="navbar-text">{buttons}</span>
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav
```
