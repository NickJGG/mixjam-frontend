import LayoutButton from "components/buttons/LayoutButton";

import imgClose from "../../assets/img/icons/cancel-white-outline-96.png";
import imgMore from "../../assets/img/icons/morevertical-white-96.png";

import cssPopup from "../../assets/css/auth/popup-elements/popup-container.module.css";
import cssFromArray from "utils/cssFromArray";

const PopupElement = (props) => {
    return (
        <div 
            className = { cssFromArray([
                cssPopup["popup__element"],
                props.size ? cssPopup[`popup__element--${ props.size }`] : "",
                props.classes || "",
            ])}
        >
            <div className = { cssPopup["popup__element__titlebar"] }>
                <p className = { cssPopup["popup__element__title"] }>{ props.title }</p>
                <div className = { cssPopup["popup__element__actions"] }>
                    <LayoutButton 
                        button = {{
                            name: "More",
                            defaultImagePath: imgMore,
                        }}
                    />
                    <LayoutButton 
                        button = {{
                            name: "Close",
                            defaultImagePath: imgClose,
                            onClick: props.closePopupContainer,
                        }}
                    />
                </div>
            </div>
            { props.header || null }
            { props.body || null }
        </div>
    );
}

export default PopupElement;