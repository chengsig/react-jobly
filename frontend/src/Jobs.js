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

    this.search = this.search.bind(this);
  }

  // retrieves all jobs from database, adds to state
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

  // searches jobs by form input, updates state with all jobs that match query string
  async search(query) {
    try {
        let jobs = await JoblyApi.searchJobs(query);
        this.setState({
            jobList: jobs //should make a copy here?
        })
    } catch (err) {
        this.setState({
            error: "bad request"
        })
    }
}

  render() {
    return (
      <div className="Jobs">
        <Search handleSearch={query => this.search(query)}/>
          {this.state.jobList.map(j => (
            <JobCard key={j.id}
              title={j.title}
              salary={j.salary}
              equity={j.equity} />
          ))}
        </div>
    );
  }
}

export default Jobs;