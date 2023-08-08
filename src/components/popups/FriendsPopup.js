import FriendListItem from "components/FriendListItem";
import PopupElement from "./PopupElement";

const FriendsPopup = (props) => {
    console.log(props.user);

    return (
        <PopupElement 
            title = "Friends"
            size = "small"
            body = {(
                <div className = "popup__element__body">
                    { props.user?.profile?.friends.map(friend => (
                        <FriendListItem 
                            key = { friend.username }
                            friend = { friend }
                            defaultColor = "red"

                            onPartyInvite = { props.onPartyInvite }
                        />
                    )) }
                </div>
            )}

            closePopupContainer = { props.closePopupContainer }
        />
    );
}

export default FriendsPopup;