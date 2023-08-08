import cssFromArray from "utils/cssFromArray";

import HoverExpandable from "../HoverExpandable";
import ProfilePicture from "../ProfilePicture";

import cssUserPopupListItem from "../../assets/css/auth/popup-elements/user-popup-list-item.module.css";

const UserPopupListItem = (props) => {
    return (
        <HoverExpandable 
            classes = { cssUserPopupListItem["container"] }
            wrapperClasses = { cssUserPopupListItem["wrapper"] }
            expanded = { props.expanded }
            gradientBg = { true }
            color = { props.color }
            body = {(
                <div className = { cssUserPopupListItem["user"] }>
                    <ProfilePicture 
                        user = { props.user } 

                        width = "2rem"
                        height = "2rem"
                    />
                    <p className = { cssUserPopupListItem["user__username"] }>{ props.user.username }</p>
                </div>
            )}
            expandableElement = {(
                <div 
                    className = { cssUserPopupListItem["actions"] }
                >
                    { props.children }
                </div>
            )}
        />
    );
}

export default UserPopupListItem;