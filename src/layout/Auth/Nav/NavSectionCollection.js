import cssFromArray from "utils/cssFromArray";

import NavCSS from "./Nav.module.css";

const NavSectionCollection = (props) => {
    const cssCollection = () => {
        let classes = [
            NavCSS["nav__section__collection"],
        ].concat(props.classes || []);

        if (props.right) classes.push(NavCSS["nav__section__collection--right"]);
        if (props.row) classes.push(NavCSS["nav__section__collection--row"]);

        return cssFromArray(classes);
    }

    const cssElements = () => {
        let classes = [
            NavCSS["nav__section__collection__elements"],
        ];

        if (props.short) classes.push(NavCSS["nav__section__collection__elements--short"]);

        return cssFromArray(classes);
    }

    return (
        <div className = { cssCollection() }>
            { props.hideLabel ? <></> : <p className = { NavCSS["nav__section__collection__name"] }>{ props.name }</p> }

            <div className = { cssElements() } >
                { props.children }
            </div>
        </div>
    );
}

export default NavSectionCollection;
