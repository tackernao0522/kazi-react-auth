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
