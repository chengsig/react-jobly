import React, { Component } from "react";
//import { Link } from "react-router-dom";
import CompanyCard from './CompanyCard';
import Search from './Search';
import JoblyApi from "./JoblyApi";
//import "./Companies.css";

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyList: [],//[{},...]
            error: ""
        }
    }

    async componentDidMount() {
        try {
            let companies = await JoblyApi.getAllCompanies(); //[{},...]
            this.setState({
                companyList: companies
            });
        } catch (err) {
            this.setState({
                error: "bad request"
            })
        }
    }

    render() {
        return (
            <div className="Companies">
                <Search />
                {this.state.companyList.map(c => (
                    <CompanyCard handle={c.handle} 
                                 name={c.name}
                                 description={c.description}
                                 logo_url={c.logo_url} />
                ))}
            </div>
        );
    }
}

export default Companies;