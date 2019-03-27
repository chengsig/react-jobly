import React, { Component } from "react";
//import { Link } from "react-router-dom";
//import "./Search.css";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",//[{},...]
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // updates state when form input changes
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    // calls handleSearch when form is submitted 
    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSearch(this.state.searchTerm);
        this.setState({ searchTerm: "" });
    }
    
    render() {
        return (
            <div className="Search">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="searchTerm"/>
                    <input name="searchTerm"
                           placeholder="Enter search term.."
                           value={this.state.searchTerm}
                           onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default Search;