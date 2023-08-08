import { useEffect, useState } from "react";

import cssFromArray from "utils/cssFromArray";

import ProfilePicture from "../ProfilePicture";
import LayoutButton from "../buttons/LayoutButton";

import imgCheck from "../../assets/img/icons/check-white-outline-96.png";
import imgDeny from "../../assets/img/icons/cancel-white-outline-96.png";
import imgParty from "../../assets/img/icons/musicrecord-white-outline-96.png";

import cssNotification from "../../assets/css/auth/notification.module.css";
import cssListing from "../../assets/css/auth/listings/listing.module.css";
import HoverExpandable from "components/HoverExpandable";

const Notification = (props) => {
    const [color, setColor] = useState(props.defaultColor);

    let actions = {
        accept: (
            <div 
                key = "accept"
                className = { cssFromArray([
                    cssListing["listing__button"],
                    cssListing["listing__button--default"]
,                ]) }
                title = "Accept"
                onClick = { () => props.onAccept(props.notification?.notification.id) }
                onMouseEnter = { () => changeColor("green") }
                onMouseLeave = { () => changeColor(props.defaultColor) }
            >
                <img src = { imgCheck } />
            </div>
        ),
        ignore: (
            <div 
                key = "ignore"
                className = { cssFromArray([
                    cssListing["listing__button"],
                    cssListing["listing__button--default"]
,                ]) }
                title = "Ignore"
                onClick = { () => props.onIgnore(props.notification?.notification.id) }
                onMouseEnter = { () => changeColor("red") }
                onMouseLeave = { () => changeColor(props.defaultColor) }
            >
                <img src = { imgDeny } />
            </div>
        )
    };

    const changeColor = (newColor) => {
        setTimeout(() => setColor(newColor), 20);
    }

    return (
        <HoverExpandable 
            classes = { 
                cssNotification["container"] 
            }
            wrapperClasses = { cssFromArray([
                cssNotification["wrapper"],
                
            ]) }
            gradientBg = { true }
            color = { color }
            expanded = { props.expanded }
            body = {(
                <>
                    <div className = { cssNotification["header"] }>
                        <div className = { cssNotification["tags"] }>
                            <div className = { cssNotification["tag"] }>
                                <div className = { cssNotification["tag__image"] }>
                                    <img src = { imgParty } />
                                </div>
                                <p className = { cssNotification["tag__name"] }>Party</p>
                            </div>
                        </div>
                        <p className = { cssNotification["time"] }>5m</p>
                    </div>
                    
                    <div className = { cssNotification["sender"] }>
                        <ProfilePicture 
                            user = { props.notification?.notification.sender } 

                            width = "2rem"
                            height = "2rem"
                        />
                        <p className = { cssNotification["message"] }>
                            <span className = { cssNotification["sender__username"] }>{ props.notification.notification.sender.username }</span>
                            wants you to join
                        </p>
                    </div>
                </>
            )}
            expandableElement = {(
                <div 
                    className = { cssNotification["actions"] }
                >
                    { props.notification.available_actions.map(action => actions[action]) }
                </div>
            )}
        />
    );
}

export default Notification;