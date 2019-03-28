import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import './Nav.css';

class Nav extends Component {
    render(){
        console.log("is nav rendering?", Math.random())
        const activeStyle = {
            fontWeight: "bold",
            color: "tomato"
        }

        if (this.props.loggedInUsername === null){
            return (
                <nav>
                    <p><NavLink exact to="/" activeStyle={activeStyle}>Jobly</NavLink></p>
                    <p><NavLink exact to="/login" activeStyle={activeStyle}>Login</NavLink></p>
                </nav>
            );
        }
        return (
            <nav>
                <p><NavLink exact to="/" activeStyle={activeStyle}>Jobly</NavLink></p>
                <p><NavLink  to="/companies" activeStyle={activeStyle}>Companies</NavLink></p>
                <p><NavLink exact to="/jobs" activeStyle={activeStyle}>Jobs</NavLink></p>
                <p><NavLink exact to="/profile" activeStyle={activeStyle}>Profile</NavLink></p>
                <p><NavLink exact to="/logout" activeStyle={activeStyle}>Log out</NavLink></p>
            </nav>
        );
    }
}

export default Nav;