import { useEffect } from "react";
import cssFromArray from "utils/cssFromArray";

import cssGradientBg from "assets/css/gradient-bg.module.css";
import LayoutButtonCSS from "./LayoutButton.module.css";

const LayoutButton = (props) => {
    useEffect(() => {
        if (props.updatePopupContainer != null)
            props.updatePopupContainer(props.popupElement);
    }, [props.popupElement]);

    const getClasses = () => {
        let classes = [
            LayoutButtonCSS["layout__button"],
        ].concat(props.classes || []);

        if (props.label) classes.push(LayoutButtonCSS["layout__button--label"]);

        if (props.disabled) 
            classes.push(LayoutButtonCSS["layout__button--disabled"]);
        else {
            classes.push(cssGradientBg["gradient-bg"]);
            classes.push(cssGradientBg[`gradient-bg--${ props.color }`]);

            if (props.default) classes.push(cssGradientBg["gradient-bg--default"]);
            if (props.active || props.toggle != null) classes.push(cssGradientBg["gradient-bg--active"]);
        }
        
        return cssFromArray(classes);
    }

    const getImagePath = () => {
        if (props.toggle != null)
            return props.toggle ? props.toggledImagePath : props.defaultImagePath;
        
        return props.defaultImagePath;
    }

    const onClick = (e) => {
        e.stopPropagation();

        if (props.disabled) return;

        if (props.popupElement)
            return props.onClick(props.popupElement);

        if (props.onClick != null)
            props.onClick();
    }

    const getButton = () => {
        let buttonElement = (
            <div 
                id = { props.id } 
                className = { getClasses() } 
                onClick = { onClick }
            >
                <img src = { getImagePath() } ></img>
                {
                    props.label != null ? <p>{ props.label }</p> : null
                }
            </div>
        );

        if (props.url == null) return buttonElement;
        
        return (
            <a href = { props.url }>{ buttonElement }</a>
        );
    }

    return (
        getButton()
    );
}

export default LayoutButton;