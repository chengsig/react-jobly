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
      loading: true,
      error: ""
    };

    this.hydrate= this.hydrate.bind(this);
    this.logout = this.logout.bind(this);
    this.update = this.update.bind(this);
    this.apply = this.apply.bind(this);
  }

  // logout a current user from app state and clear localStorage token
  // redirect to home
  logout() {
    this.setState({ currUser: null });
    localStorage.removeItem("_token");
    this.props.history.push('/'); //rtProps given by withRouter
  }

  // hydrate the current user in state with login information
  async hydrate(username) {
    let token = localStorage._token;
    try {
      if (token !== undefined) {
        let user = await JoblyApi.getUser(username);
        let hasApplied = new Set(user.jobs.map(job => job.id));
        this.setState({
          currUser: {...user, hasApplied},
          loading: false
        });
      } else {
        this.setState({ loading: false });
        this.props.history.push("/login");
      }
    } catch (err) {
      this.setState({
        error: err[0]
      })
    }
  }

  //update the current user data with profile updates
  async update(username, userInfo){
    try {
      let updatedUserInfo = await JoblyApi.updateUser(username, userInfo);
      this.setState({
        currUser: { updatedUserInfo },
        loading: false
      });
    } catch (err){
      this.setState({
        error: "unable to update"
      })
    }
  }

  //apply a job for the user
  async apply(jobId) {
    try {
      await JoblyApi.applyJob(jobId);
      let updatedUserInfo = await JoblyApi.getUser(this.state.currUser.username);
      this.setState({
        currUser: { updatedUserInfo },
        loading: false
      });

    } catch (err) {
      this.setState({
        error:"unable to apply"
      })
    }
  }

  //if client has logged in, keeps client logged in when page is refreshed. if client 
  // has not logged in, redirects to login page.
  async componentDidMount(){
    let token = localStorage._token
    try {
      if (token !== undefined) {
        let payload = jwt_decode(token);
        let username = payload.username;
  
        let user = await JoblyApi.getUser(username, token);
        this.setState({
          currUser: user,
          loading: false
        });

      } else {
        this.setState({ loading: false });
        this.props.history.push("/login");
      }
    } catch (err) {
      this.setState({
        error: err[0]
      })
    }
  }

  render() {
    if (this.state.loading === true) {
      return <p>Loading...</p>
    }
    
    return (
      <div className="App">
        <Nav user={this.state.currUser}
          handleLogout={this.logout} />
        <Routes user={this.state.currUser}
          handleLogin={this.hydrate} 
          handleApply={this.apply}
          handleUpdate={this.update}/>
      </div>
    );
  }
}

export default withRouter(App); // gives App its own routeProps
