import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Login from './Login';
import Profile from './Profile';

class Routes extends Component {

    render() {
        return (
            <div className="Routes">
                <Switch>
                    <Route exact path="/" render={() => <Homepage user={this.props.user} />} />
                    <Route exact path="/companies/:handle" render={(rtProps) => <Company handle={rtProps.match.params.handle} />} />
                    <Route exact path="/companies" render={() => <Companies />} />
                    <Route exact path="/jobs" render={() => <Jobs />} />
                    <Route exact path="/login" render={(rtProps) => <Login {...rtProps}
                        user={this.props.user}
                        handleUserUpdate={this.props.handleUserUpdate} />} />
                    <Route exact path="/profile" render={() => <Profile />} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;