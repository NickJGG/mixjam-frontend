import axios from "axios";
import { useState } from "react";

import '../assets/css/base.css';
import '../assets/css/unauth/login.css';

import imgLogo from '../assets/img/logo/logo-red.png';

const Login = (props) => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const onSubmit = (e) => {
        console.log('login submitted', username, password);

        axios.defaults.headers.common = {
            
        };

        axios.post('http://localhost:8000/auth/', { 
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
        <div id = "login">
            <div className = "auth-box">
                <div className = "auth-showcase">

                </div>
                <div className = "auth-body">
                    <img id = "auth-logo" src = { imgLogo } />
                    <p className = "body-title">Login</p>
                    <form onSubmit = { onSubmit }>
                        <div className = "input-wrapper">
                            <p>Username</p>
                            <input type = "username" value = { username } onChange = { e => setUsername(e.target.value) } />
                        </div>
                        <div className = "input-wrapper">
                            <p>Password</p>
                            <input type = "password" value = { password } onChange = { e => setPassword(e.target.value) } />
                        </div>
                        <div className = "input-wrapper">
                            <input type = "submit"  value = "Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;