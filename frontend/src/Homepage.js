import React, { Component } from "react";
import { Link } from "react-router-dom";
//import "./HomePage.css";


class HomePage extends Component {
  render() {
    let loginBtn = <div><Link to="/login">Login</Link></div>
    let message = "Welcome back!"
    let display = this.props.user !== null ? message : loginBtn

    return (
      <div className="HomePage">
        <b>Jobly</b>
        <h2>All the jobs in one, convenient place.</h2>
        { display } 
      </div>
    );
  }
}

export default HomePage;