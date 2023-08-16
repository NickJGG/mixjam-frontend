import { useEffect, useState } from "react";
import PopupContainerCSS from "./PopupContainer.module.css";

const PopupContainer = (props) => {
    useEffect(() => {
        // console.log(props.container.currentElementIndex);
        // console.log(props.container.elements);
        // console.log(getCurrentElement());
    }, [props.container.currentElementIndex]);

    const getCurrentElement = () => {
        return props.container.elements[props.container.currentElementIndex];
    }

    const onClick = (e) => {
        if (e.currentTarget == e.target)
            props.onClose();
    }

    return (
        <div id = { PopupContainerCSS["popup-container"] } className = { `${ props.container?.isOpen ? PopupContainerCSS["popup-container--open"] : "" }` } onClick = { onClick }>
            { getCurrentElement() }
        </div>
    );
}

export default PopupContainer;
