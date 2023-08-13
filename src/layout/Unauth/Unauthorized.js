import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import React from "react";

import Login from "pages/Login/Login";
import Nav from "layout/Unauth/Nav/Nav";
import Landing from "pages/Landing/Landing";
import Footer from "./Footer/Footer";

import UnauthorizedCSS from "./Unauthorized.module.css";
import Register from "pages/Register/Register";

class Unauthorized extends React.Component {
    render(){
        return (
            <div id = { UnauthorizedCSS["unauthorized-app"] }>
                <Nav />
                <Routes>
                    <Route exact path = "/" element = { <Landing /> } />
                    <Route path = "/login" element = { <Login onAuth = { token => this.props.onAuth(token) } /> } />
                    <Route path = "/register" element = { <Register onAuth = { token => this.props.onAuth(token) } /> } />
                    <Route path = "*" element = {<Navigate to = "/" />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Unauthorized;
