import { useState } from "react";

import HoverExpandable from "components/HoverExpandable/HoverExpandable";
import ListingButton from "components/Listing/ListingButton/ListingButton";

import cssPopupUserListPlayable from "./PopupUserListPlayable.module.css";

import imgCancel from 'assets/img/icons/cancel-white-outline-96.png';
import imgPlay from 'assets/img/icons/play-white-96.png';
import imgUp from 'assets/img/icons/add-white-outline-96.png';

const PopupUserListPlayable = (props) => {
    const [color, setColor] = useState(props.defaultColor);

    const changeColor = (newColor) => {
        setTimeout(() => setColor(newColor), 20);
    }

    return (
        <HoverExpandable 
            classes = { [cssPopupUserListPlayable["container"]] }
            wrapperClasses = { [cssPopupUserListPlayable["wrapper"]] }
            expanded = { props.expanded }
            gradientBg = { true }
            color = { color }
            body = {(
                <div className = { cssPopupUserListPlayable["playable__info"] }>
                    <img className = { cssPopupUserListPlayable["playable__info__track__image"] } src = { props.playable.image } />
                    <div className = { cssPopupUserListPlayable["playable__info__track__info"] }>
                        <p className = { cssPopupUserListPlayable["playable__info__track__title"] }>{ props.playable.title }</p>
                        <p className = { cssPopupUserListPlayable["playable__info__track__artist"] }>{ props.playable.artists[0].name }</p>
                    </div>
                </div>
            )}
            expandableElement = {(
                <div 
                    className = { cssPopupUserListPlayable["playable__actions"] }
                >
                    <ListingButton
                        // label = "Play"
                        image = { imgPlay }

                        centered = { true }
                        default = { true }

                        // onClick = { () => props.onPartyInvite(props.friend?.id) }
                        onMouseEnter = { () => changeColor("green") }
                        onMouseLeave = { () => changeColor(props.defaultColor) }
                    />
                    <ListingButton
                        // label = "Remove"
                        image = { imgUp }

                        centered = { true }
                        default = { true }

                        // onClick = { () => props.onPartyInvite(props.friend?.id) }
                        onMouseEnter = { () => changeColor("blue") }
                        onMouseLeave = { () => changeColor(props.defaultColor) }
                    />
                    <ListingButton
                        // label = "Remove"
                        image = { imgCancel }

                        centered = { true }
                        default = { true }

                        // onClick = { () => props.onPartyInvite(props.friend?.id) }
                        onMouseEnter = { () => changeColor("red") }
                        onMouseLeave = { () => changeColor(props.defaultColor) }
                    />
                </div>
            )}
        />
        // <PopupUserListItem
        //     user = {{
        //         username: props.playable.name
        //     }}
        //     color = { color }

        //     onPartyInvite = { props.onPartyInvite }
        // >
        //     <ListingButton 
        //         classes = {cssListingButton["listing__button--default"]}

        //         label = "Kick"
        //         image = { imgRemove }

        //         // onClick = { () => props.onAccept(props.notification?.notification.id) }
        //         onMouseEnter = { () => changeColor("red") }
        //         onMouseLeave = { () => changeColor(props.defaultColor) }
        //     />
        // </PopupUserListItem>
    );
}

export default PopupUserListPlayable;
