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
    this.setState({user: user})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forget" component={Forget} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default HeaderRouter
