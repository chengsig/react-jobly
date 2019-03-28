import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Nav from './Nav';
import Homepage from './Homepage';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';

class Routes extends Component {
    render(){
        return (
            <BrowserRouter>
                <Nav />
                <Switch>
                    <Route exact path="/" render={ () => <Homepage /> }/>
                    <Route exact path="/companies/:handle" render={ (rtProps) => <Company handle={rtProps.match.params.handle}/> }/>
                    <Route exact path="/companies" render={ () => <Companies /> }/>
                    <Route exact path="/jobs" render={ () => <Jobs /> }/>
                    <Route exact path="/login" render={ (rtProps) => <Login { ...rtProps }/> }/>
                    <Route exact path="/logout" render={ (rtProps) => <Logout { ...rtProps }/> }/>
                    <Route exact path="/profile" render={ () => <Profile /> }/>
                    <Redirect to="/"/>
                </Switch>
            </BrowserRouter>
        );
    }   
}

export default Routes;