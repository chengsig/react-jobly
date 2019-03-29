import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./JobCard.css";

class JobCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnText: "APPLY"
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({ btnText: "APPLIED"});
        this.props.handleApply(this.props.id);
    }

  render() {
      let btn = <button id="JobCard-btn-apply" onClick={this.handleClick}>{this.state.btnText}</button>
      if (this.props.isApplied) {
          btn = <button id="JobCard-btn-apply" onClick={this.handleClick}>APPLIED</button>
      }
    return (
      <div className="JobCard">
        <p>{this.props.isApplied}</p>
        <p><b>{ this.props.title }</b></p>
        <p>Salary: { this.props.salary }</p>
        <p>Equity: { this.props.equity }</p>
        {btn}
      </div>
    );
  }
}

export default JobCard;