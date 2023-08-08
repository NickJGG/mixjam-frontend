import { useEffect } from "react";
import cssFromArray from "utils/cssFromArray";

import cssListingButton from "assets/css/auth/buttons/listing-button.module.css";

const ListingButton = (props) => {
    return (
        <div className = { cssFromArray([
                cssListingButton["listing__button"],
                cssListingButton["listing__button--left"],
            ].concat(props.classes || [])) }

            onClick = { props.onClick }
            onMouseEnter = { props.onMouseEnter }
            onMouseLeave = { props.onMouseLeave }
        >
            <img src = { props.image } />
            <p alt = { props.label }>{ props.label }</p>
        </div>
    );
}

export default ListingButton;
