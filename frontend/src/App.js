import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import Nav from './Nav';
import Routes from './Routes';
import JoblyApi from './JoblyApi';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null, //{username: "", ... }
      error: ""
    };

    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  // logout a current user from app state and clear localStorage token
  // redirect to home
  logout() {
    this.setState({ currUser: null });
    localStorage.clear();
    this.props.history.push('/'); //rtProps given by withRouter
  }

  //update the current user in state with log in information
  updateUser(username) {
    this.setState({
      currUser: { username }
    });

  }

  //if user has logged, keeps user logged in when page is refreshed.
  async componentDidMount(){
    let token = localStorage._token
    try {
      if (token !== undefined) {
        let payload = jwt_decode(token);
        let username = payload.username;
  
        let user = await JoblyApi.getUser(username, token);
  
        this.setState({
          currUser: user
        });
      }
    } catch (err) {
      this.setState({
        error: err[0]
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Nav user={this.state.currUser}
          handleLogout={this.logout} />
        <Routes user={this.state.currUser}
          handleUserUpdate={this.updateUser} />
      </div>
    );
  }
}

export default withRouter(App); // gives App its own routeProps
