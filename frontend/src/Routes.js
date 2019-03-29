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
                    
                    <Route exact 
                           path="/" 
                           render={() => 
                                <Homepage user={this.props.user} />} />
                    
                    <Route exact 
                           path="/companies/:handle" 
                           render={(rtProps) => 
                                <Company handle={rtProps.match.params.handle}
                                         appliedJobsIds={this.props.user.appliedJobsIds}
                                         handleApply={this.props.handleApply} />} />


                    <Route exact 
                           path="/companies" 
                           render={() => 
                                <Companies />} />

                    <Route exact 
                           path="/jobs" 
                           render={() => 
                                <Jobs handleApply={this.props.handleApply} 
                                      appliedJobsIds={this.props.user.appliedJobsIds} />} /> 

                    <Route exact 
                           path="/login" 
                           render={(rtProps) => 
                                <Login {...rtProps}
                                       user={this.props.user}
                                       handleLogin={this.props.handleLogin} />} />

                    <Route exact 
                           path="/profile" 
                           render={() => 
                                <Profile user={this.props.user} 
                                         handleUpdate={this.props.handleUpdate} />} />
                                         
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;