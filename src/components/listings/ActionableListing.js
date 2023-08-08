import { useState } from "react";

import Listing from "./Listing";

import cssActionableListing from "../../assets/css/auth/listings/actionable-listing.module.css";
import cssGradientBg from "../../assets/css/gradient-bg.module.css";

const ActionableListing = (props) => {
    const [pressing, setPressing] = useState(false);

    const getListingData = () => {
        return {
            ...props.listing,
            classes: cssActionableListing["listing--actionable"],
            cssModifier: cssActionableListing,
            gradientClasses: cssGradientBg["gradient-bg--default"],
            color: "red",
            isPressing: pressing
        }
    }

    return (
        <Listing
            listing = { getListingData() }
            onMouseDown = { () => setPressing(true) }
            onMouseUp = { () => setPressing(false) }
            onMouseLeave = { () => setPressing(false) }
        >
            <div 
                className = { cssActionableListing["listing__icon" ] }
                onClick = { props.onClick }
            >
                <img src = { props.actionable.imagePath } />
            </div>
            <div className = { cssActionableListing["listing__details"] }>
                <p>{ props.actionable.name }</p>
            </div>
        </Listing>
    );
}

export default ActionableListing;