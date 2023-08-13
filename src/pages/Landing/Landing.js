import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import LayoutButton from "components/LayoutButton/LayoutButton";

import LandingCSS from "./Landing.module.css";

const Landing = (props) => {
    useEffect(() => {
        
    }, []);

    return (
        <div id = { LandingCSS["landing__container"] }>
            <div id = { LandingCSS["landing__message"] }>
                <p id = { LandingCSS["landing__message__title"] }>MixJam</p>
                <p id = { LandingCSS["landing__message__desc"] }>Listen to your favorite music, together.</p>
                <div id = { LandingCSS["landing__message__actions"] }>
                    <LayoutButton 
                        label = "Login"
                        url = "/login/"

                        default = { true }
                        color = "red"
                    />
                    <LayoutButton 
                        label = "Register"
                        url = "/register/"

                        default = { true }
                        color = "red"
                    />
                </div>
            </div>
        </div>
    );
}

export default Landing;
