import { useState } from "react";

import cssFromArray from "utils/cssFromArray";

import UserPopupListItem from "components/popups/UserPopupListItem";

import imgInvite from "../assets/img/icons/musicrecordinvite-white-outline-96.png";
import imgRemove from "../assets/img/icons/removeuser-white-outline-96.png";

import ListingButton from "components/buttons/ListingButton";

import cssListingButton from "assets/css/auth/buttons/listing-button.module.css";

const FriendListItem = (props) => {
    const [color, setColor] = useState(props.defaultColor);

    const changeColor = (newColor) => {
        setTimeout(() => setColor(newColor), 20);
    }

    return (
        <UserPopupListItem
            key = { props.friend?.username }
            user = { props.friend }
            color = { color }

            onPartyInvite = { props.onPartyInvite }
        >
            <ListingButton
                classes = {cssListingButton["listing__button--default"]}
                
                label = "Invite"
                image = { imgInvite }

                onClick = { () => props.onPartyInvite(props.friend?.id) }
                onMouseEnter = { () => changeColor("green") }
                onMouseLeave = { () => changeColor(props.defaultColor) }
            />
            <ListingButton 
                classes = {cssListingButton["listing__button--default"]}

                label = "Remove"
                image = { imgRemove }

                // onClick = { () => props.onAccept(props.notification?.notification.id) }
                onMouseEnter = { () => changeColor("red") }
                onMouseLeave = { () => changeColor(props.defaultColor) }
            />
        </UserPopupListItem>
    );
}

export default FriendListItem;