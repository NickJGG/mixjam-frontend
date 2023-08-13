import cssFromArray from "utils/cssFromArray";

import ListingButtonCSS from "./ListingButton.module.css";

const ListingButton = (props) => {
    const getClasses = () => {
        let classes = [
            ListingButtonCSS["listing__button"],
            ListingButtonCSS["listing__button--left"],
        ].concat(props.classes || []);

        if (props.centered)
            classes.push(ListingButtonCSS["listing__button--centered"]);
        
        if (props.default)
            classes.push(ListingButtonCSS["listing__button--default"]);

        return cssFromArray(classes);
    }

    return (
        <div className = { getClasses() }

            onClick = { props.onClick }
            onMouseEnter = { props.onMouseEnter }
            onMouseLeave = { props.onMouseLeave }
        >
            { props.image ? <img src = { props.image } /> : <></> }
            { props.label ? <p alt = { props.label }>{ props.label }</p> : <></> }
        </div>
    );
}

export default ListingButton;
