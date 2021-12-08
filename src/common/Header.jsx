import { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Forget from '../components/Forget'
import Home from '../components/Home'
import Login from '../components/Login'
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
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Header
