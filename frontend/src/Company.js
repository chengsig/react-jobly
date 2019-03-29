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

    // gets specific company data by handle 
    async componentDidMount(){
        try {
            let handle = this.props.handle;
            let { name, description, jobs } = await JoblyApi.getCompany(handle);

            this.setState({
                name,
                description,
                jobs
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
                    <JobCard key={ j.id } 
                             id={ j.id }
                             title={ j.title } 
                             salary={ j.salary } 
                             equity={ j.equity }
                             isApplied={(this.props.appliedJobsIds.has(j.id))}
                             handleApply={this.props.handleApply}
                             />
                ))}
            </div>
        </div>
        );
    }
}

export default Company;