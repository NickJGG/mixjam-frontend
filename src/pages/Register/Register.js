import axios from "axios";
import { useState } from "react";

import useTitle from "hooks/useTitle";

import imgLogo from 'assets/img/logo/logo-red.png';
import LayoutButton from "components/LayoutButton/LayoutButton";

import LoginCSS from "pages/Login/Login.module.css";

const Register = (props) => {
    const [title, setTitle] = useTitle("Register");

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const onSubmit = () => {
        axios.defaults.headers.common = {
            
        };

        axios.post('http://localhost:8000/register/', { 
            username: username, 
            password: password 
        })
            .then(data => {
                console.log(data);

                if (data.status == 201){
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
                }
            }).catch(e => {
                console.log('error', e);
            });

        // e.preventDefault();
    }

    return (
        <div id = { LoginCSS["login__container"] }>
            <div id = { LoginCSS[ "login__box"] }>
                <div id = { LoginCSS["login__box__header"] }>
                    <img id = { LoginCSS["login__box__logo"] } src = { imgLogo } />
                    <p id = { LoginCSS[ "login__box__title"] }>Register</p>
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
                    <div className = { LoginCSS[ "input-wrapper"] }>
                        <p>Confirm Password</p>
                        <input type = "password" value = { password } onChange = { e => setPassword(e.target.value) } />
                    </div>
                    <LayoutButton 
                        label = "Register"
                        color = "red"

                        active = { true }

                        onClick = { onSubmit }
                    />
                </form>
            </div>
        </div>
    );
}

export default Register;
