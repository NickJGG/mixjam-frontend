import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";

import { withCookies, Cookies } from "react-cookie";

import { instanceOf } from "prop-types";

import axios from "axios";

import Unauthorized from "layout/Unauth/Unauthorized";
import Auth from "layout/Auth/Auth";

import "./App.css";

class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props){
        super(props);

        const { cookies } = props;

        this.state = {
            auth: {
                token: cookies.get("auth_token") || null
            },
            party: {}
        }
        
        this.onAuth = this.onAuth.bind(this);
        
        this.setToken = this.setToken.bind(this);
        this.removeToken = this.removeToken.bind(this);
        this.getComponents = this.getComponents.bind(this);
    }

    componentDidMount(){
        const { cookies } = this.props,
            token = cookies.get("auth_token");

        this.setHeaders(token);
        //this.setToken(token)
    }

    onAuth(token){
        this.setToken(token);
    }

    setToken(token){
        if (token == null)
            return;

        const { cookies } = this.props;
        cookies.set("auth_token", token, { path: "/", maxAge: 10 * 365 * 24 * 3600 });

        this.setState({ 
            ...this.state,
            auth: { 
                ...this.state.auth,
                token: token 
            } 
        });

        this.setHeaders(token);
    }
    setHeaders(token){
        axios.defaults.headers.common = {
            Authorization: "Token " + token
        };
    }
    removeToken(){
        const { cookies } = this.props;
        cookies.remove("auth_token", { path: "/" });

        this.setState({ auth: { } });

        axios.defaults.headers.common = {
            Authorization: null
        };
    }

    getComponents(){
        if (this.state.auth.token != null)
            return (
                <Auth 
                    auth = { this.state.auth }

                    onLogout = { this.removeToken } 
                />
            );
        else
            return (
                <Unauthorized auth = { this.state.auth } onAuth = { this.onAuth } />  
            );
    }
 
    render(){
        return (
            <Router>
                { this.getComponents() }
            </Router>
        );
    }
}

export default withCookies(App);