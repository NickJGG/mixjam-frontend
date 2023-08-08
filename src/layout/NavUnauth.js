import { Link } from "react-router-dom";
import LayoutButton from "../components/buttons/LayoutButton";

import imgLogo from '../assets/img/logo/logo-red.png';

const NavUnauth = (props) => {
    let links = [
        {
            name: 'About',
            url: '/about/',
            orientation: 'bottom'
        },
        {
            name: 'Login',
            url: '/login/',
            orientation: 'bottom'
        },
        {
            name: 'Sign Up',
            url: '/register/',
            orientation: 'bottom'
        },
    ];

    return (
        <div id = "nav">
            <div className = "nav-section">
                <Link to = "/">
                    <LayoutButton button = {{
                        name: 'Home',
                        image_path: imgLogo,
                        orientation: 'bottom'
                    }} />
                </Link>
            </div>
            <div className = "nav-section">
                { links.map(link => (
                    <Link key = { link.name } to = { link.url }>
                        {/* <TextLayoutButton button = { link } /> */}
                    </Link>
                )) }
            </div>
        </div>
    );
}

export default NavUnauth;