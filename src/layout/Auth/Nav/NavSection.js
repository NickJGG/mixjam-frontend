import NavCSS from "./Nav.module.css";

const NavSection = (props) => {
    return (
        <div className = { NavCSS["nav__section"] }>
            { props.children }
        </div>
    );
}

export default NavSection;
