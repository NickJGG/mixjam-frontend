import { useState } from "react";

import PopupUserListItem from "components/Popup/PopupUserList/PopupUserListItem/PopupUserListItem";
import ListingButton from "components/Listing/ListingButton/ListingButton";

import imgRemove from "assets/img/icons/removeuser-white-outline-96.png";

const PopupUserListPartyUser = (props) => {
    const [color, setColor] = useState(props.defaultColor);

    const changeColor = (newColor) => {
        setTimeout(() => setColor(newColor), 20);
    }

    return (
        <PopupUserListItem
            key = { props.user?.username }
            user = { props.user }
            color = { color }

            onPartyInvite = { props.onPartyInvite }
        >
            <ListingButton
                label = "Kick"
                image = { imgRemove }

                default = { true }

                // onClick = { () => props.onAccept(props.notification?.notification.id) }
                onMouseEnter = { () => changeColor("red") }
                onMouseLeave = { () => changeColor(props.defaultColor) }
            />
        </PopupUserListItem>
    );
}

export default PopupUserListPartyUser;
