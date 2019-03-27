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
            let handle = this.props.match.params.handle;
            let res = await JoblyApi.getCompany(handle);

            // let {name, description, jobs} = await ...
            //     {name, description, jobs}


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

export default Company;