import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//import './Nav.css';

class Nav extends Component {
    render(){
        const activeStyle = {
            fontWeight: "bold",
            color: "tomato"
        }
        return(
            <nav>
                <p><NavLink exact to="/" activeStyle={activeStyle}>Jobly</NavLink></p>
                <p><NavLink  to="/companies" activeStyle={activeStyle}>Companies</NavLink></p>
                <p><NavLink exact to="/jobs" activeStyle={activeStyle}>Jobs</NavLink></p>
                <p><NavLink exact to="/profile" activeStyle={activeStyle}>Profile</NavLink></p>
                {/* log out button? */}
                <p><NavLink exact to="/" activeStyle={activeStyle}>Log out WEIRD ONE BE AWARE</NavLink></p>
            </nav>
        );
    }
}

export default Nav;