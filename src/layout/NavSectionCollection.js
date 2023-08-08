import cssFromArray from "utils/cssFromArray";

import NavSectionCollectionButtons from "./NavSectionCollectionButtons";

import cssNav from "../assets/css/auth/nav.module.css";

const NavSectionCollection = (props) => {
    return (
        <div 
            className = { cssFromArray([
                cssNav["nav__section__collection"],
                props.collection.classes || ""
            ]) }
        >
            <p className = { cssNav["nav__section__collection__name"] }>{ props.collection.name }</p>

            <NavSectionCollectionButtons 
                buttons = { props.collection.buttons }
                classes = { props.collection.elements_classes }
                onPageSelect = { props.onPageSelect }
            />
        </div>
    );
}

export default NavSectionCollection;