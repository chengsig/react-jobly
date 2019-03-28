import React, { Component } from 'react';
import Routes from './Routes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //currUser
      loggedInUsername: null
    };

    this.updateUser = this.updateUser.bind(this);
  }

  // logout fn

  updateUser(username){
    this.setState({
      loggedInUsername: username
    }, () => console.log(this.setState.loggedInUsername))
  }

  render() {
    return (
      <div className="App">
        <Routes user={ this.state.loggedInUsername } handleUserUpdate={ this.updateUser }/>
      </div>
    );
  }
}

export default App;
