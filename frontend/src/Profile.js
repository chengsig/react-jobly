import React, { Component } from "react";
import Alert from './Alert';
//import { Link } from "react-router-dom";
//import "./Profile.css";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            firstname: "",
            lastname: "",
            email: "",
            photo_url: "",
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // on form input change, updates profile states
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // on form submit, send updated data to backend update user route
    handleSubmit(e) {
        e.preventDefault();
        try {
            if (this.state.password.length === 0) {
                this.setState({ error: "must enter password" });
            }

            else {
                let updateData = {
                    "first_name": this.state.firstname,
                    "last_name": this.state.lastname,
                    "email": this.state.email,
                    "photo_url": this.state.photo_url,
                    "_token": localStorage._token
                }
                for (let key in updateData) {
                    if (updateData[key].length === 0){
                        delete updateData[key];
                    }
                }

                this.props.handleUpdate(this.props.user.username,
                                    updateData)
            }
        } catch (err) {
           this.setState({ error: err });
        }
    }

    render() {
        let alertMsg;
        if (this.state.error.length !== 0) {
            alertMsg = (<Alert error={this.state.error}/>)
        }
        return (
            <div className="Profile">
                <p>Profile</p>
                <form onSubmit={this.handleSubmit}>
                    <h3>{this.props.user.username}</h3>
                    <h4>{this.props.user.username}</h4>
                    <div className="Profile-firstname">
                        <label htmlFor="firstname">First name: </label>
                        <input name="firstname"
                            id="firstname"
                            placeholder={this.props.user.first_name}
                            onChange={this.handleChange}
                            value={this.state.first_name} />
                    </div>
                    <div className="Profile-lastname">
                        <label htmlFor="lastname">Last name: </label>
                        <input name="lastname"
                            id="lastname"
                            placeholder={this.props.user.last_name}
                            onChange={this.handleChange}
                            value={this.state.last_name} />
                    </div>
                    <div className="Profile-email">
                        <label htmlFor="email">Email: </label>
                        <input name="email"
                            id="email"
                            placeholder={this.props.user.email}
                            onChange={this.handleChange}
                            value={this.state.email}
                            />
                    </div>
                    <div className="Profile-photo_url">
                        <label htmlFor="photo_url">Photo URL: </label>
                        <input name="photo_url"
                            id="photo_url"
                            type="url"
                            //placeholder={this.props.user.photo_url}
                            onChange={this.handleChange}
                            value={this.state.photo_url} />
                    </div>
                    <div className="Profile-password">
                        <label htmlFor="password">Re-enter Password: </label>
                        <input name="password"
                            id="password"
                            type="password"
                            placeholder={this.props.user.password}
                            onChange={this.handleChange}
                            value={this.state.password} />
                    </div>
                    {alertMsg}
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default Profile;