import React, { Component } from "react";
//import { Link } from "react-router-dom";
import JoblyApi from "./JoblyApi"
import JobCard from "./JobCard";
//import "./Company.css";

class Company extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: "",
            jobs: [],
            error: ""
        }
    }
    // have handle in this.props.match.params.handle
    // make get request to jobs using handle
    // map over jobs 
        // for each create JobCard instance
    async componentDidMount(){
        try {
            let handle = this.props.match.params.handle;
            let res = await JoblyApi.getCompany(handle);

            this.setState({
                name: res.name,
                description: res.description,
                jobs: res.jobs
            })
        } catch(err) {
            this.setState({
                error: "bad company handle"
            })
        }
    }
    render() {
        return (
        <div className="Company">
            <h2>{ this.state.name }</h2>
            <p>{ this.state.description }</p>
            <div className="Company-jobs">
                {this.state.jobs.map(j => (
                    <JobCard />
                ))}
            </div>
        </div>
        );
    }
}

export default Company;