import cssFromArray from "utils/cssFromArray";

import NavButton from "./NavButton";

import cssNav from "../assets/css/auth/nav.module.css";

const NavSectionCollectionButtons = (props) => {
    return (
        <div 
            className = { cssFromArray([
                cssNav["nav__section__collection__elements"],
                props.classes || ""
            ]) }
        >
            { props.buttons.map(button => (
                <NavButton 
                    key = { `nav-${button.name}` } 
                    button = { button } 
                    onClick = { props.onPageSelect }
                />
            )) }
        </div>
    );
}

export default NavSectionCollectionButtons;