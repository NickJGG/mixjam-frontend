import { useEffect, useState } from "react";
import PopupContainerCSS from "./PopupContainer.module.css";

const PopupContainer = (props) => {
    const [elements, setElements] = useState(props.container.elements);

    useEffect(() => {
        console.log(props.container.elements.map(element => element.props.children.props.artist.id));
    }, [props.container.elements]);

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
