import { useEffect, useState } from "react";

import cssFromArray from "utils/cssFromArray";
import timeSince from "utils/timeSince";

import HoverExpandable from "components/HoverExpandable/HoverExpandable";
import ProfilePicture from "components/ProfilePicture";
import ListingButton from "components/Listing/ListingButton/ListingButton";

import imgCheck from "assets/img/icons/check-white-outline-96.png";
import imgDeny from "assets/img/icons/cancel-white-outline-96.png";
import imgParty from "assets/img/icons/musicrecord-white-outline-96.png";

import NotificationCSS from "./Notification.module.css";

const Notification = (props) => {
    const [color, setColor] = useState(props.defaultColor);

    const changeColor = (newColor) => {
        setTimeout(() => setColor(newColor), 20);
    }

    return (
        <HoverExpandable 
            classes = { 
                NotificationCSS["container"]
            }
            wrapperClasses = { cssFromArray([
                NotificationCSS["wrapper"],
                
            ]) }
            gradientBg = { true }
            color = { color }
            expanded = { props.expanded }
            body = {(
                <>
                    <div className = { NotificationCSS["header"] }>
                        <div className = { NotificationCSS["tags"] }>
                            <div className = { NotificationCSS["tag"] }>
                                <div className = { NotificationCSS["tag__image"] }>
                                    <img src = { imgParty } />
                                </div>
                                <p className = { NotificationCSS["tag__name"] }>Party</p>
                            </div>
                        </div>
                        <p className = { NotificationCSS["time"] }>{ timeSince(props.notification?.notification.time_sent) }</p>
                    </div>
                    
                    <div className = { NotificationCSS["sender"] }>
                        <ProfilePicture 
                            user = { props.notification?.notification.sender } 

                            width = "2rem"
                            height = "2rem"
                        />
                        <p className = { NotificationCSS["message"] }>
                            <span className = { NotificationCSS["sender__username"] }>{ props.notification.notification.sender.username }</span>
                            wants you to join
                        </p>
                    </div>
                </>
            )}
            expandableElement = {(
                <div className = { NotificationCSS["actions"] }>
                    <ListingButton
                        label = "Accept"
                        image = { imgCheck }

                        default = { true }

                        onClick = { () => props.onAccept(props.notification?.notification.id) }
                        onMouseEnter = { () => changeColor("green") }
                        onMouseLeave = { () => changeColor(props.defaultColor) }
                    />
                    <ListingButton
                        label = "Ignore"
                        image = { imgDeny }

                        default = { true }

                        onClick = { () => props.onIgnore(props.notification?.notification.id) }
                        onMouseEnter = { () => changeColor("red") }
                        onMouseLeave = { () => changeColor(props.defaultColor) }
                    />
                </div>
            )}
        />
    );
}

export default Notification;
