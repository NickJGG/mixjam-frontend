import { useEffect } from "react";
import cssFromArray from "utils/cssFromArray";

import cssGradientBg from "../../assets/css/gradient-bg.module.css";
import cssLayoutButton from "../../assets/css/layout-button.module.css";

const LayoutButton = (props) => {
    useEffect(() => {
        if (props.button.updatePopupContainer != null)
            props.button.updatePopupContainer(props.button.popupElement);
    }, [props.button.popupElement]);

    const getImagePath = () => {
        if (props.button.toggle != null)
            return props.button.toggle ? props.button.toggledImagePath : props.button.defaultImagePath;
        
        return props.button.defaultImagePath;
    }

    const cssActive = () => {
        return props.button.active || props.button.toggle != null ? cssGradientBg["gradient-bg--active"] : "";
    }

    const onClick = (e) => {
        e.stopPropagation();

        if (props.button.popupElement)
            return props.button.onClick(props.button.popupElement);

        if (props.button.onClick != null)
            props.button.onClick();
    }

    return (
        <div 
            id = { props.button.id } 
            className = { cssFromArray([
                cssLayoutButton["layout__button"],
                props.button.label ? cssLayoutButton["layout__button--label"] : "",
                cssGradientBg["gradient-bg"],
                cssGradientBg[`gradient-bg--${ props.button.color }`],
                props.button.classes ? props.button.classes : "",
                cssActive()
            ]) } 
            onClick = { onClick }>
            <img src = { getImagePath() } ></img>
            {
                props.button.label != null ? <p>{ props.button.label }</p> : null
            }
        </div>
    );
}

export default LayoutButton;