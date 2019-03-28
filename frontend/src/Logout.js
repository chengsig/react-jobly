import React, { Component } from "react";
import JoblyApi from "./JoblyApi";
// import Alert from "./Alert";

class Logout extends Component {
    // clear localStorage
    // push history "/"
    logout(){
        localStorage.clear();
        this.props.history.push("/")
    }

    render(){
        this.logout();
        return null;
    }
}

export default Logout;