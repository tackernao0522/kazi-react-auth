## 231 Other Components

+ `src/components/Register.jsx`を編集<br>

```
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Register extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <div className="row">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">Register Account</h3>
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
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

+ `src/components/Forget.jsx`を編集<br>

```
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Forget extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <div className="row">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">Forget Password</h3>
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
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

## User Profile Page

+ `src/common/Nav.jsx`を編集<br>

```
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">
            Easy Learning
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/profile"> // 編集
                  Profile
                </Link>
              </li>
            </ul>
            <span class="navbar-text">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <Link class="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            </span>
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav
```

+ `src/common/Header.jsx`を編集<br>

```
import { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Forget from '../components/Forget'
import Home from '../components/Home'
import Login from '../components/Login'
import Profile from '../components/Profile' // 追記
import Register from '../components/Register'
import Nav from './Nav'

class Header extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/forget" component={ Forget } />
            <Route exact path="/profile" component={ Profile } /> // 追記
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Header
```

+ `src/components/Profile.jsx`を編集<br>

```
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Profile extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <div className="row">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">User Profile</h3>
            <ul className="list-group">
              <li className="list-group-item">Name : name</li>
              <li className="list-group-item">Email : Eamil</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
```

+ `src/common/Nav.jsx`を編集<br>

```
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/"> // 編集
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
                <Link className="nav-link" to="/"> // 編集
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
            <span className="navbar-text">
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
            </span>
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav
```