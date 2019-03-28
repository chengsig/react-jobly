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
            firstname: "",
            lastname: "",
            email: "",
            loginOrSignup: "login",
            error: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleFormState = this.toggleFormState.bind(this);
    }

    // on form input change, updates state Login
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // when given valid credentials, will login or signup user. Saves JWT to localStorage and 
    // redirects to /jobs. Resets state of Login.
    async handleSubmit(e) {
        e.preventDefault();
        try {
            let token;
            if (this.state.loginOrSignup === "login") {
                token = await JoblyApi.userLogin(this.state.username, this.state.password);
            }
            else if (this.state.loginOrSignup === "signup") {
                token = await JoblyApi.userSignup(this.state.username, 
                                                  this.state.password, 
                                                  this.state.firstname, 
                                                  this.state.lastname, 
                                                  this.state.email);
            }

            // update currUser state with logged in user info 
            // calling up to app for the update method
            this.props.handleLogin(this.state.username);
            localStorage.setItem("_token", token);

            this.setState({
                username: "",
                password: ""
            });

            this.props.history.push("/jobs");

        } catch (err) {
            console.log(err);
            this.setState({
                error: err[0]
            })
        }
    }

    // toggles login or signup form
    toggleFormState(e) {
        if (e.target.name !== this.state.loginOrSignup) {
            this.setState({ loginOrSignup: e.target.name });
        }
    }

    // if signup button is clicked, renders signup form. else, renders login form.
    render() {
        let errorMsg;

        if (this.state.error !== "") {
            errorMsg = <Alert error={this.state.error}/>
        }

        let signUpPortion = null;
        if (this.state.loginOrSignup === "signup") {
            signUpPortion = (
                <div className="Signup">
                    <div className="Signup-firstname">
                        <label htmlFor="firstname">First name:</label>
                        <input
                            name="firstname"
                            id="firstname"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className="Signup-lastname">
                        <label htmlFor="lastname">Last name:</label>
                        <input
                            name="lastname"
                            id="lastname"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className="Signup-email">
                        <label htmlFor="email">Email:</label>
                        <input
                            name="email"
                            id="email"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                </div>
            )
        }
        return (
            <div className="Login">
                <button className="Login-btn" name="login" key="login" onClick={this.toggleFormState}>Login</button>
                <button className="Signup-btn" name="signup" key="signup" onClick={this.toggleFormState}>Sign up</button>
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
                            type="password"
                            placeholder="Enter password"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                    {signUpPortion}
                    {errorMsg}
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;
