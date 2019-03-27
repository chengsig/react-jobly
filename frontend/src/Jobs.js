import React, { Component } from "react";
//import { Link } from "react-router-dom";
import JobCard from './JobCard';
import Search from './Search';
import JoblyApi from './JoblyApi';
//import "./Jobs.css";

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
        jobList: [],//[{},...]
        error: ""
    }

    // this.search = this.search.bind(this);
}

async componentDidMount() {
    try {
        let jobs = await JoblyApi.getAllJobs(); //[{},...]
        this.setState({
            jobList: jobs
        });
    } catch (err) {
        this.setState({
            error: "bad request"
        })
    }
}

  render() {
    return (
      <div className="Jobs">
        <Search />
        <div className="Jobs-joblist">
          {this.state.jobList.map(j => (
            <JobCard key={ j.id } 
                     title={ j.title } 
                     salary={ j.salary } 
                     equity={ j.equity }/>
          ))}
        </div>
      </div>
    );
  }
}

export default Jobs;