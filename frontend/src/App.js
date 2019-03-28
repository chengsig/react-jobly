import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Nav from './Nav';
import Routes from './Routes';
import JoblyApi from './JoblyApi';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null //{username: "", ... }
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

  //componentdidmount ??
  async componentDidMount(){
    let token = localStorage._token
    if (token !== undefined) {
      let user = await JoblyApi.getUser(username, token);
      this.setState({
        currUser: user
      });
    }
  }

  render() {
    console.log(this.state.currUser)
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
