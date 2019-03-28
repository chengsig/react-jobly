import React, { Component } from "react";
import JoblyApi from "./JoblyApi";
import Alert from "./Alert";

//import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      let token = await JoblyApi.userLogin(this.state.username, this.state.password);

      localStorage.setItem("_token", token);

      this.props.history.push("/jobs")

      this.setState({
        username: "",
        password: ""
      });
      
    } catch (err){
      console.log("error")
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <div className="Login-username">
            <label htmlFor="username">Username: </label>
            <input
              name="username"
              id="username"
              placeholder="Enter username"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>

          <div className="Login-pwd">
            <label htmlFor="password">Password: </label>
            <input
              name="password"
              id="password"
              placeholder="Enter password"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
