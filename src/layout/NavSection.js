import NavSectionCollection from "./NavSectionCollection";

import cssNav from "../assets/css/auth/nav.module.css";

const NavSection = (props) => {
    return (
        <div className = { cssNav["nav__section"] }>
            { props.section.collections?.map(collection => (
                <NavSectionCollection
                    key = { collection.name }
                    collection = { collection }
                />
            )) }
        </div>
    );
}

export default NavSection;