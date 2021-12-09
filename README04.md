## 233 Login Credentials Part1

+ `src/router`ディレクトリを作成<br>

+ `src/router/HeaderRouter.jsx`コンポーネントを作成<br>

```
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from '../common/Nav'
import Forget from '../components/Forget'
import Home from '../components/Home'
import Login from '../components/Login'
import Profile from '../components/Profile'
import Register from '../components/Register'

export const HeaderRouter = () => {
  return (
    <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/forget" component={ Forget } />
            <Route exact path="/profile" component={ Profile } />
          </Switch>
        </div>
      </Router>
  )
}
```

+ `src/common/Header.jsx`を編集<br>

```
import { Component } from 'react'
import { HeaderRouter } from '../router/HeaderRouter'

class Header extends Component {
  render() {
    return (
      <HeaderRouter />
    )
  }
}

export default Header
```

+ `src/components/Login.jsx`を編集<br>

```
import axios from 'axios'
import { Component } from 'react'
import { Link } from 'react-router-dom'

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
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  render() {
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
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
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

## 234 Login Credentials Part1

+ `src/components/atoms`ディレクトリを作成<br>

+ `src/components/atoms/button`ディレクトリを作成<br>

+ `src/components/atoms/button/PrimaryButton.jsx`コンポーネントを作成<br>

+ `src/components/Login.jsx`を編集<br>

```
import axios from 'axios'
import { Component } from 'react'
import { Link } from 'react-router-dom'
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
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  render() {
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
```

+ `src/index.js`を編集<br>

```
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './common/Header';
import './index.css';
import reportWebVitals from './reportWebVitals';

// set main base url
axios.defaults.baseURL = 'http://localhost/api'; // 追記

ReactDOM.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```