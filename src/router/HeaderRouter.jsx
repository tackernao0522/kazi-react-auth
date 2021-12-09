import { memo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from '../common/Nav'
import Forget from '../components/Forget'
import Home from '../components/Home'
import Login from '../components/Login'
import Profile from '../components/Profile'
import Register from '../components/Register'

export const HeaderRouter = memo(() => {
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
})
