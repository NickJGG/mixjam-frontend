import Notification from "../notifications/Notification";

import cssPopup from "../../assets/css/auth/popup-elements/popup-container.module.css";
import cssNotificationPopup from "../../assets/css/auth/popup-elements/notifications-popup-element.module.css";
import PopupElement from "./PopupElement";

const NotificationsPopup = (props) => {
    return (
        <PopupElement 
            title = "Notifications"
            size = "small"
            classes = { cssNotificationPopup["popup__element"] }
            body = {(
                <div className = { cssNotificationPopup["popup__element__body"] }>
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