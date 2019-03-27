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
        this.search = this.search.bind(this);
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

    async search(query) {
        try {
            let companies = await JoblyApi.searchCompanies(query);
            console.log(query)
            console.log(companies)
            this.setState(st => ({
                companyList: companies //should make a copy here?
            }))
        } catch (err) {
            this.setState({
                error: "bad request"
            })
        }
    }

    render() {
        return (
            <div className="Companies">
                <Search handleSearch={query => this.search(query)}/>
                {this.state.companyList.map(c => (
                    <CompanyCard handle={c.handle} 
                                 name={c.name}
                                 key={c.handle}
                                 description={c.description}
                                 logo_url={c.logo_url} />
                ))}
            </div>
        );
    }
}

export default Companies;