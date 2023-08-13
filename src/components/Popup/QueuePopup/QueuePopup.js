import Popup from "../Popup";
import PopupUserList from "../PopupUserList/PopupUserList";
import PopupUserListPlayable from "../PopupUserList/PopupUserListItem/PopupUserListPlayable/PopupUserListPlayable";

import QueuePopupCSS from "./QueuePopup.module.css";

const QueuePopup = (props) => {
    return (
        <Popup 
            title = "Queue"
            size = "small"
            classes = { QueuePopupCSS["popup__element"] }
            body = {(
                <PopupUserList>
                    <PopupUserListPlayable 
                        playable = {{
                            title: "Gemini Feed",
                            image: "https://i.scdn.co/image/ab67616d0000485114a2349a77ade285c5afffed",
                            artists: [
                                {
                                    name: "BANKS",
                                }
                            ]
                        }}
                        defaultColor = "gray"

                        onPartyInvite = { props.onPartyInvite }
                    />
                    <PopupUserListPlayable 
                        playable = {{
                            title: "Gemini Feed",
                            image: "https://i.scdn.co/image/ab67616d0000485114a2349a77ade285c5afffed",
                            artists: [
                                {
                                    name: "BANKS",
                                }
                            ]
                        }}
                        defaultColor = "red"

                        onPartyInvite = { props.onPartyInvite }
                    />
                </PopupUserList>
            )}

            closePopupContainer = { props.closePopupContainer }
        />
    );
}

export default QueuePopup;
