import { Link } from "react-router-dom";
import LayoutButton from "components/LayoutButton/LayoutButton";

import NavCSS from "./Nav.module.css";

import imgLogo from "assets/img/logo/logo-red.png";

const NavUnauth = (props) => {
    return (
        <div id = { NavCSS["nav"] }>
            <div className = { NavCSS["nav__group"] }>
                <LayoutButton
                    defaultImagePath = { imgLogo }
                    url = "/"
                    orientation = "bottom"
                />
            </div>
            <div className = { NavCSS["nav__group"] }>
                <LayoutButton
                    label = "About"
                    image = { imgLogo }
                    url = "/about/"
                    orientation = "bottom"
                />
            </div>
        </div>
    );
}

export default NavUnauth;