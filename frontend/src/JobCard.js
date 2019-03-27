import React, { Component } from "react";
//import { Link } from "react-router-dom";
//import "./JobCard.css";

class JobCard extends Component {
  render() {
    return (
      <div className="JobCard">
        <p><b>{ this.props.title }</b></p>
        <p>{ this.props.salary }</p>
        <p>{ this.props.equity }</p>
        <button>Apply</button>
      </div>
    );
  }
}

export default JobCard;