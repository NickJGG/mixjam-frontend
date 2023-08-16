import cssFromArray from "utils/cssFromArray";

import LayoutButton from "components/LayoutButton/LayoutButton";

import PopupCSS from "./Popup.module.css";
import PopupContainerCSS from "layout/Auth/PopupContainer/PopupContainer.module.css";

import imgClose from "assets/img/icons/cancel-white-outline-96.png";
import imgPrevious from "assets/img/icons/back-white-outline-96.png";
import imgNext from "assets/img/icons/circleright-white-outline-96.png";
import { useContext } from "react";
import PageContext from "contexts/PageContext";

const Popup = (props) => {
    const {
        previousPopup,
        nextPopup,
        closePopupContainer,
        popupContainerRef,
    } = useContext(PageContext);

    return (
        <div 
            className = { cssFromArray([
                PopupCSS["popup"],
                PopupContainerCSS["popup"],
                props.size ? PopupCSS[`popup--${ props.size }`] : "",
                props.classes || "",
            ])}
        >
            <div className = { PopupCSS["popup__titlebar"] }>
                <p className = { PopupCSS["popup__title"] }>{ props.title }</p>
                <div className = { PopupCSS["popup__actions"] }>
                    <LayoutButton 
                        name = "Previous"
                        defaultImagePath = { imgPrevious }
                        disabled = { popupContainerRef.current.currentElementIndex <= 0 }

                        onClick = { previousPopup }
                    />
                    <LayoutButton 
                        name = "Next"
                        defaultImagePath = { imgNext }
                        disabled = { popupContainerRef.current.currentElementIndex >= popupContainerRef.current.elements.length - 1 }

                        onClick = { nextPopup }
                    />
                    <LayoutButton 
                        name = "Close"
                        defaultImagePath = { imgClose }

                        onClick = { closePopupContainer }
                    />
                </div>
            </div>
            { props.header || null }
            { props.body || null }
        </div>
    );
}

export default Popup;
