import { useState } from "react";

import cssFromArray from "utils/cssFromArray";

import ListingCSS from "./Listing.module.css";
import cssGradientBg from "assets/css/gradient-bg.module.css";

const Listing = (props) => {
    const [pressing, setPressing] = useState(false);

    const cssElement = (selector) => {
        if (props.listing.cssModifier) 
            return cssFromArray([
                ListingCSS[selector],
                props.listing.cssModifier[selector]
            ]);
        
        return ListingCSS[selector];
    }

    const getPressing = () => {
        if (props.isPressing == null){
            return pressing ? cssElement("listing--pressing") : "";
        }

        return props.isPressing ? cssElement("listing--pressing") : "";
    }

    return (
        <div 
            className = { cssFromArray([
                cssElement("listing"),
                props.listing.classes || null,
                props.listing.active ? cssElement("listing--active") : "",
                getPressing()
            ]) }
            onMouseDown = { () => setPressing(true) }
            onMouseUp = { () => setPressing(false) }
            onMouseLeave = { () => setPressing(false) }
        >
            <div 
                className = { cssFromArray([
                    cssElement("listing__body"),
                    cssGradientBg["gradient-bg"],
                    cssGradientBg["gradient-bg--no-pressing"],
                    props.listing.gradientClasses || "",
                    props.listing.active ? cssGradientBg["gradient-bg--active"] : "",
                    props.listing.color ? cssGradientBg[`gradient-bg--${ props.listing.color }`] : ""
                ]) }
            >
                { props.children && props.children }
            </div>
        </div>
    );
}

export default Listing;