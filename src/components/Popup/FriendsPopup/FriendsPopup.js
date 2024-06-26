import PopupUserListFriend from "components/Popup/PopupUserList/PopupUserListItem/PopupUserListFriend/PopupUserListFriend";
import Popup from "../Popup";
import PopupUserList from "components/Popup/PopupUserList/PopupUserList";

const FriendsPopup = (props) => {
    return (
        <Popup 
            title = "Friends"
            size = "small"
            body = {(
                <PopupUserList>
                    { props.user?.profile?.friends.map(friend => (
                        <PopupUserListFriend 
                            key = { friend.username }
                            friend = { friend }
                            defaultColor = "blue"

                            onPartyInvite = { props.onPartyInvite }
                        />
                    )) }
                </PopupUserList>
            )}
        />
    );
}

export default FriendsPopup;
