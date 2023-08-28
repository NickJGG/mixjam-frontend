import { useEffect, useState } from "react";

import Notification from "./Notification";

import cssNotificationContainer from "../../assets/css/auth/notification-container.module.css";

const NotificationContainer = (props) => {
    let initialSeconds = 3 * 1000,
        additionalSeconds = 1 * 1000;

    const [count, setCount] = useState(props.notifications?.length ?? 0);
    const [notification, setNotification] = useState(null);
    const [markedForRemoval, setMarkedForRemoval] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [removing, setRemoving] = useState(false);

    useEffect(() => {
        let newCount = props.notifications?.length ?? 0;

        // console.log(count, "->", newCount);

        setNotification(newCount > count ? props.notifications[0] : null);
        setCount(newCount);
    }, [props.notifications]);

    useEffect(() => {
        setTimeout(() => {
            if (notification != null)
                setMarkedForRemoval(true)
        }, initialSeconds);
    }, [notification]);

    useEffect(() => {
        if (markedForRemoval && !hovering) {
            setTimeout(() => {
                if (notification != null){
                    setRemoving(true);

                    setTimeout(() => {
                        setNotification(null);
                        setMarkedForRemoval(false);
                        setRemoving(false);
                    }, 1000);
                }
            }, additionalSeconds);
        }
    }, [markedForRemoval, hovering]);

    return (
        <div id = { cssNotificationContainer["notification-container"]}
            className = { removing ? cssNotificationContainer["notification-container--removing"] : "" }
            onMouseEnter = { () => setHovering(true) } 
            onMouseLeave = { () => setHovering(false) }
        >
            {
                notification == null ? (null) :
                <Notification 
                    key = { notification.id }
                    classes = { cssNotificationContainer["notification"] }
                    wrapperClasses = { cssNotificationContainer["notification__wrapper"] }
                    defaultColor = "blue"
                    active = { true }
                    // expanded = { true }
                    notification = { notification }
                    onAccept = { props.onNotificationAccept }
                    onIgnore = { props.onNotificationIgnore }
                />
            }
        </div>
    );
}

export default NotificationContainer;