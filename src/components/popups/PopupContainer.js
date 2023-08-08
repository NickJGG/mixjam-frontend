import { useState } from "react";

import cssPopup from "../../assets/css/auth/popup-elements/popup-container.module.css";

const PopupContainer = (props) => {
    const onClick = (e) => {
        if (e.currentTarget == e.target)
            props.onClose();
    }

    return (
        <div id = { cssPopup["popup-container"] } className = { `${ props.container?.isOpen ? cssPopup["popup-container--open"] : "" }` } onClick = { onClick }>
            { props.container?.element }
        </div>
    );
}

export default PopupContainer;