import React, { Component } from "react";
//import { Link } from "react-router-dom";
import CompanyCard from './CompanyCard';
import Search from './Search';
//import "./Companies.css";

class Companies extends Component {
  render() {
    return (
      <div className="Companies">
        <Search />
        <CompanyCard />
      </div>
    );
  }
}

export default Companies;