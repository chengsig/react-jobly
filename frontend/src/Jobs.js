import React, { Component } from "react";
//import { Link } from "react-router-dom";
import JobCard from './JobCard';
import Search from './Search';
//import "./Jobs.css";

class Jobs extends Component {
  render() {
    return (
      <div className="Jobs">
        <Search />
        <JobCard />
      </div>
    );
  }
}

export default Jobs;