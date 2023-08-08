import Notification from "../notifications/Notification";

import PopupElement from "./PopupElement";
import PartyPopupListItem from "components/popups/PartyPopupListItem";

import cssPopup from "../../assets/css/auth/popup-elements/popup-container.module.css";
import cssPartyPopup from "../../assets/css/auth/popup-elements/party-popup-element.module.css";

const PartyPopup = (props) => {
    return (
        <PopupElement 
            title = "Party"
            size = "small"
            body = {(
                <div className = "popup__element__body">
                    { props.party?.users?.map(user => (
                        <PartyPopupListItem 
                            key = { user.username }
                            user = { user }
                            defaultColor = "red"

                            onPartyInvite = { props.onPartyInvite }
                        />
                        // <UserPopupListItem
                        //     key = { user.username }
                        //     friend = { user }
                        //     defaultColor = "red"

                        //     onPartyInvite = { props.onPartyInvite }
                        //     />
                        )) }
                </div>
            )}

            closePopupContainer = { props.closePopupContainer }
        />
    );
}

export default PartyPopup;
