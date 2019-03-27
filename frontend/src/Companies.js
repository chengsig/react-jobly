import React, { Component } from "react";
//import { Link } from "react-router-dom";
import CompanyCard from './CompanyCard';
import Search from './Search';
import JoblyApi from "./JoblyApi";
//import "./Companies.css";

class Companies extends Component {
    constructor(props){
        super(props);
        this.state = {
            companyList: [],
            error: ""
        }
    }
    
    async componentDidMount(){
        try {
            let companies = await JoblyApi.getCompany("arnold-berger-and-townsend");
            this.setState({
                companyList: companies
            });
        } catch(err){
            this.setState({
                error: "company not found"
            })
        }   
    }

    render() {
        console.log(this.state.companyList);
    return (
      <div className="Companies">
        <Search />
        {/* map over companyList */}
        <CompanyCard />
      </div>
    );
  }
}

export default Companies;