import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Link } from "react-router-dom";

import cssFromArray from 'utils/cssFromArray';

import imgCollapse from "../assets/img/icons/collapse-white-outline-96.png";

import cssNav from "../assets/css/auth/nav.module.css";
import cssGradientBg from "../assets/css/gradient-bg.module.css";

const NavButton = (props) => {
    const [expanded, setExpanded] = useState(props.button.expanded);
    const location = useLocation();

    useEffect(() => {
        if (props.button.updatePopupContainer != null)
            props.button.updatePopupContainer(props.button.popupElement);
    }, [props.button.popupElement]);

    const getButton = () => {
        let buttonElement = (
            <div 
                className = { cssFromArray([
                    cssNav["nav__button"],
                    cssGradientBg["gradient-bg"],
                    props.button.color ? cssGradientBg[`gradient-bg--${ props.button.color }`] : "",
                    isActive() ? cssGradientBg["gradient-bg--active"] : "",
                    isActive() ? cssGradientBg["gradient-bg--red"] : "",
                    isActive() ? cssNav["nav__button--active"] : "",
                    props.button.buttons != null ? cssNav["nav__button--expando"] : "",
                    props.button.classes ? props.button.classes : "",
                ]) }
            >
                <img src = { props.button.image_path } />
                <p>{ props.button.name }</p>
                <img src = { imgCollapse } />
            </div>
        );

        if (props.button.url == null){
            return buttonElement;
        }
        
        return (
            <Link 
                key = { `link-${ props.button.name }` } 
                to = { props.button.url }
                state = { props.button.params }
            >   
                { buttonElement }
            </Link>
        );
    }

    const getExpandoButtons = () => {
        if (props.button.buttons == null)
            return (null);

        return (
            <div className = { cssNav["nav__button__wrapper__buttons"] }>
                { props.button.buttons?.map(button => (
                    <NavButton 
                        key = { button.name }
                        button = { button }
                    />
                )) }
            </div>
        );
    }

    const isActive = () => {
        if (props.button.activeCondition) return props.button.activeCondition;
        if (props.button.params) return location.pathname == props.button.url && location.state.type == props.button.params.type;
        
        return location.pathname == props.button.url;
    }

    const onClick = (e) => {
        e.stopPropagation();

        if (props.button.buttons != null)
            setExpanded(!expanded);

        if (props.button.popupElement)
            return props.button.onClick(props.button.popupElement);

        if (props.button.onClick != null)
            props.button.onClick();
    }

    return (
        <div 
            className = { cssFromArray([
                cssNav["nav__button__wrapper"],
                expanded ? cssNav["nav__button__wrapper--expanded"] : "",
                props.button.double ? cssNav["nav__button__wrapper--double"] : "",
                props.button.reverse ? cssNav["nav__button__wrapper--reverse"] : "",
            ]) }
            onClick = { onClick }
            title = { props.button.name }
        >
            { getButton() }
            { getExpandoButtons() }
            
        </div>
    );
}

export default NavButton;