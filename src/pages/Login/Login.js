import { useState } from "react";

import axios from "axios";

import useTitle from "hooks/useTitle";

import LayoutButton from "components/LayoutButton/LayoutButton";

import LoginCSS from "./Login.module.css";

import imgLogo from 'assets/img/logo/logo-red.png';

const Login = (props) => {
    const [title, setTitle] = useTitle("Login");

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        axios.defaults.headers.common = {
            
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/`, { 
            username: username, 
            password: password 
        })
            .then(data => {
                console.log(data);
                props.onAuth(data.data.token);
            }).catch(e => {
                console.log('error', e);
            });

        e.preventDefault();
    }

    return (
        <div id = { LoginCSS["login__container"] }>
            <div id = { LoginCSS[ "login__box"] }>
                <div id = { LoginCSS["login__box__header"] }>
                    <img id = { LoginCSS["login__box__logo"] } src = { imgLogo } />
                    <p id = { LoginCSS[ "login__box__title"] }>Login</p>
                </div>
                <form id = { LoginCSS["login__box__form"] } onSubmit = { onSubmit }>
                    <div className = { LoginCSS[ "input-wrapper"] }>
                        <p>Username</p>
                        <input type = "username" value = { username } onChange = { e => setUsername(e.target.value) } />
                    </div>
                    <div className = { LoginCSS[ "input-wrapper"] }>
                        <p>Password</p>
                        <input type = "password" value = { password } onChange = { e => setPassword(e.target.value) } />
                    </div>
                    <LayoutButton 
                        label = "Login"
                        color = "red"

                        active = { true }

                        onClick = { onSubmit }
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;