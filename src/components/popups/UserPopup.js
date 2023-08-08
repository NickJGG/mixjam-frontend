import { useEffect } from "react";

import ProfilePicture from "../ProfilePicture";
import LayoutButton from "../buttons/LayoutButton";

import imgAddFriend from "../../assets/img/icons/peopleinvite-white-outline-96.png";
import imgInvite from "../../assets/img/icons/musicrecordinvite-white-outline-96.png";

import PopupElement from "./PopupElement";

const UserPopup = (props) => {
    useEffect(() => {
                
    }, []);

    return (
        <PopupElement 
            title = { props.user?.username }
            size = "small"
            header = {(
                <div className = "popup__element__header">
                    <div className = "popup__element__header__image">
                        <ProfilePicture user = { props.user } width = "100%" height = "100%" />
                    </div>
                    <div className = "popup__element__header">
                        <div className = "popup__element__header__details">
                            <p className = "popup__element__header__details__name">{ props.user?.username }</p>
                        </div>
                        <div className = "popup__element__header__actions">
                            <LayoutButton 
                                button = {{
                                    name: "Add Friend",
                                    label: "Add",
                                    defaultImagePath: imgAddFriend
                                }}
                            />
                            <LayoutButton 
                                button = {{
                                    name: "Invite",
                                    label: "Invite",
                                    defaultImagePath: imgInvite
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        />
    );
}

export default UserPopup;