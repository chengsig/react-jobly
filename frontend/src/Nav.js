import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import './Nav.css';

class Nav extends Component {
    render() {
        const activeStyle = {
            fontWeight: "bold",
            color: "tomato"
        }

        //if user is not logged in, render nav bar for login only
        if (this.props.user === null) {
            return (
                <nav>
                    <p><NavLink exact to="/" activeStyle={activeStyle}>Jobly</NavLink></p>
                    <p><NavLink exact to="/login" activeStyle={activeStyle}>Login</NavLink></p>
                </nav>
            );
        }
        // else render full nav bar
        return (
            <nav>
                <p><NavLink exact to="/" activeStyle={activeStyle}>Jobly</NavLink></p>
                <p><NavLink to="/companies" activeStyle={activeStyle}>Companies</NavLink></p>
                <p><NavLink exact to="/jobs" activeStyle={activeStyle}>Jobs</NavLink></p>
                <p><NavLink exact to="/profile" activeStyle={activeStyle}>Profile</NavLink></p>
                <p><button onClick={this.props.handleLogout}>Log out</button></p>
            </nav>
        );
    }
}

export default Nav;