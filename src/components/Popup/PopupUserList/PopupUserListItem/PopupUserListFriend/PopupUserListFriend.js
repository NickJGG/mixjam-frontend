import { useState } from "react";

import PopupUserListItem from "components/Popup/PopupUserList/PopupUserListItem/PopupUserListItem";
import ListingButton from "components/Listing/ListingButton/ListingButton";

import imgInvite from "assets/img/icons/musicrecordinvite-white-outline-96.png";
import imgRemove from "assets/img/icons/removeuser-white-outline-96.png";

const PopupUserListFriend = (props) => {
    const [color, setColor] = useState(props.defaultColor);

    const changeColor = (newColor) => {
        setTimeout(() => setColor(newColor), 20);
    }

    return (
        <PopupUserListItem
            key = { props.friend?.username }
            user = { props.friend }
            color = { color }

            onPartyInvite = { props.onPartyInvite }
        >
            <ListingButton
                label = "Invite"
                image = { imgInvite }

                centered = { true }
                default = { true }

                onClick = { () => props.onPartyInvite(props.friend?.id) }
                onMouseEnter = { () => changeColor("green") }
                onMouseLeave = { () => changeColor(props.defaultColor) }
            />
            <ListingButton
                label = "Remove"
                image = { imgRemove }

                centered = { true }
                default = { true }

                // onClick = { () => props.onAccept(props.notification?.notification.id) }
                onMouseEnter = { () => changeColor("red") }
                onMouseLeave = { () => changeColor(props.defaultColor) }
            />
        </PopupUserListItem>
    );
}

export default PopupUserListFriend;
