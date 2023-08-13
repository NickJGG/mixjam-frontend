import Popup from "../Popup";
import PopupUserListPartyUser from "components/Popup/PopupUserList/PopupUserListItem/PopupUserListPartyUser/PopupUserListPartyUser";
import PopupUserList from "components/Popup/PopupUserList/PopupUserList";

const PartyPopup = (props) => {
    return (
        <Popup 
            title = "Party"
            size = "small"
            body = {(
                <PopupUserList>
                    { props.party?.users?.map(user => (
                        <PopupUserListPartyUser 
                            key = { user.username }
                            user = { user }
                            defaultColor = "red"

                            onPartyInvite = { props.onPartyInvite }
                        />
                        )) }
                </PopupUserList>
            )}

            closePopupContainer = { props.closePopupContainer }
        />
    );
}

export default PartyPopup;
