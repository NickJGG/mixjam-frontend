import Popup from "../Popup";
import Notification from "components/Notification/Notification";

import NotificationsPopupCSS from "./NotificationsPopup.module.css";

const NotificationsPopup = (props) => {
    return (
        <Popup 
            title = "Notifications"
            size = "small"
            classes = { NotificationsPopupCSS["popup__element"] }
            body = {(
                <div className = { NotificationsPopupCSS["popup__element__body"] }>
                    { props.notifications?.map(notification => (
                        <Notification 
                            key = { notification.id }
                            defaultColor = "red"
                            notification = { notification }
                            onAccept = { props.onNotificationAccept }
                            onIgnore = { props.onNotificationIgnore }
                        />
                    )) }
                </div>
            )}

            closePopupContainer = { props.closePopupContainer }
        />
    );
}

export default NotificationsPopup;
