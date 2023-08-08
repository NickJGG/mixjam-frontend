import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router';
import React from 'react';

import Login from './Login';
import Landing from './Landing';

import '../assets/css/auth/base.css';

import NavUnauth from '../layout/NavUnauth';

class Authorized extends React.Component {
    render(){
        return (
            <div id = "unauthorized-app">
                <NavUnauth />
                <Routes>
                    <Route exact path = "/" element = { <Landing /> } />
                    <Route path = "/login" element = { <Login onAuth = { token => this.props.onAuth(token) } /> } />
                    <Route path = "*" element = {<Navigate to = "/" />} />
                </Routes>
            </div>
        );
    }
}

export default Authorized;