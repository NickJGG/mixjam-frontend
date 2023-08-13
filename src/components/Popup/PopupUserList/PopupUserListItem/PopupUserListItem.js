import HoverExpandable from "components/HoverExpandable/HoverExpandable";
import ProfilePicture from "components/ProfilePicture";

import PopupUserListItemCSS from "./PopupUserListItem.module.css";

const PopupUserListItem = (props) => {
    return (
        <HoverExpandable 
            classes = { PopupUserListItemCSS["container"] }
            wrapperClasses = { PopupUserListItemCSS["wrapper"] }
            expanded = { props.expanded }
            gradientBg = { true }
            color = { props.color }
            body = {(
                <div className = { PopupUserListItemCSS["user"] }>
                    <ProfilePicture 
                        user = { props.user } 

                        width = "2rem"
                        height = "2rem"
                    />
                    <p className = { PopupUserListItemCSS["user__username"] }>{ props.user.username }</p>
                </div>
            )}
            expandableElement = {(
                <div 
                    className = { PopupUserListItemCSS["actions"] }
                >
                    { props.children }
                </div>
            )}
        />
    );
}

export default PopupUserListItem;
