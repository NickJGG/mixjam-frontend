import { useState } from "react";

import cssFromArray from "utils/cssFromArray";

import UserPopupListItem from "components/popups/UserPopupListItem";
import ListingButton from "components/buttons/ListingButton";

import imgRemove from "../../assets/img/icons/removeuser-white-outline-96.png";

import cssListingButton from "assets/css/auth/buttons/listing-button.module.css";

const PartyPopupListItem = (props) => {
    const [color, setColor] = useState(props.defaultColor);

    const changeColor = (newColor) => {
        setTimeout(() => setColor(newColor), 20);
    }

    return (
        <UserPopupListItem
            key = { props.user?.username }
            user = { props.user }
            color = { color }

            onPartyInvite = { props.onPartyInvite }
        >
            <ListingButton 
                classes = {cssListingButton["listing__button--default"]}

                label = "Kick"
                image = { imgRemove }

                // onClick = { () => props.onAccept(props.notification?.notification.id) }
                onMouseEnter = { () => changeColor("red") }
                onMouseLeave = { () => changeColor(props.defaultColor) }
            />
        </UserPopupListItem>
    );
}

export default PartyPopupListItem;