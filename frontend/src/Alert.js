import React, { Component } from "react";
//import { Link } from "react-router-dom";
//import "./Alert.css";

class Alert extends Component {
  render() {
    return (
      <div className="Alert">
          <p>{this.props.error}</p>
      </div>
    );
  }
}

export default Alert;