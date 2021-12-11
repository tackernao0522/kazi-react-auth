## Authentication : Forgot Password Option

+ `src/components/Reset.jsx`コンポーネントを作成<br>

```
import React, { Component } from 'react'

class Reset extends Component {
  render() {
    return (
      <div>
        <h1>Reset Page</h1>
      </div>
    )
  }
}

export default Reset
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
import Reset from '../components/Reset'

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
            <Route exact path="/reset/:id" component={Reset} /> // 追記
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

+ `src/components/Forget.jsx`を編集<br>

```
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
```

## 242 Authentication : Error Showing

+ `src/components/Forget.jsx`を編集<br>

```
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class Forget extends Component {
  state = {
    email: '',
    message: '',
  }

  // Forget Form Submit
  formSubmit = (e) => {
    e.preventDefault()

    const data = {
      email: this.state.email,
    }

    axios
      .post('/forgetpassword', data)
      .then((response) => {
        this.setState({ message: response.data.message })
        document.getElementById('forgetform').reset()
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
            <h3 className="text-center">Forget Password</h3>
            <form onSubmit={this.formSubmit} id="forgetform">
              {error}
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
```

+ `src/components/Login.jsx`を編集<br>

```
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
        this.props.setUser(response.data.user)
      })
      .catch((error) => this.setState({ message: error.response.data.message }))
  }

  render() {
    // After Login Redirect to Profile
    if (this.state.loggedIn) {
      return <Redirect to={'/profile'} />
    }

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
            <h3 className="text-center">Login Account</h3>
            <form onSubmit={this.formSubmit}>
              {error}
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
```

## 243 Authentication : Reset Password

+ `src/components/Register.jsx`を修正<br>

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
      name: this.state.name, // 修正
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

+ `src/components/Reset.jsx`を編集<br>

```
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
```

## 244 Authentication : Protect Url

+ `src/components/Profile.jsx`を編集<br>

```
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Profile extends Component {
  render() {
    let name
    let email

    if (this.props.user) {
      name = this.props.user.name
      email = this.props.user.email
    }

    if (!localStorage.getItem('token')) {
      return <Redirect to={'/login'} />
    }

    return (
      <div>
        <br />
        <br />
        <div className="row">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">User Profile</h3>
            <ul className="list-group">
              <li className="list-group-item">Name : {name}</li>
              <li className="list-group-item">Email : {email}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
```

+ `src/components/Login.jsx`を編集<br>

```
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
        this.props.setUser(response.data.user)
      })
      .catch((error) => this.setState({ message: error.response.data.message }))
  }

  render() {
    // After Login Redirect to Profile
    if (this.state.loggedIn) {
      return <Redirect to={'/profile'} />
    }

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

    if (localStorage.getItem('token')) {
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
              {error}
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
```

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

    if (localStorage.getItem('token')) {
      return <Redirect to={'/'} />
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
