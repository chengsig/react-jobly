import React, { Component } from "react";
import { Link } from "react-router-dom";
//import "./CompanyCard.css";

class CompanyCard extends Component {
  render() {
    return (
      <div className="CompanyCard">
        <Link to={`/companies/${this.props.handle}`}>
            <p key={this.props.handle}>{this.props.name}</p>
            <h2>{this.props.description}</h2>
            <img src={this.props.logo_url} alt="company logo"/>
        </Link>
      </div>
    );
  }
}

export default CompanyCard;