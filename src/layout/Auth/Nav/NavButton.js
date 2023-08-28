import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Link } from "react-router-dom";

import PageContext from 'contexts/PageContext';

import cssFromArray from 'utils/cssFromArray';

import NavCSS from "./Nav.module.css";
import cssGradientBg from "assets/css/gradient-bg.module.css";

import imgCollapse from "assets/img/icons/collapse-white-outline-96.png";

const NavButton = (props) => {
    const {
        updatePopupContainer,
    } = useContext(PageContext);

    const [expanded, setExpanded] = useState(props.expanded);
    const location = useLocation();

    useEffect(() => {
        if (props.popupDependencies == undefined) return;

        updatePopupContainer(props.popupElement);
    }, [props.popupDependencies]);

    const cssButton = () => {
        let classes = [
            NavCSS["nav__button"],
            cssGradientBg["gradient-bg"],
        ].concat(props.classes || []);

        if (isActive())
            classes = classes.concat([
                cssGradientBg["gradient-bg--active"],
                cssGradientBg["gradient-bg--red"],
                NavCSS["nav__button--active"],
            ]);
        
        if (props.children != null) classes.push(NavCSS["nav__button--expando"]);
        if (props.color != null) classes.push(cssGradientBg[`gradient-bg--${ props.color }`]);
        if (props.short) classes.push(NavCSS["nav__button--short"]);
        if (props.default) classes.push(cssGradientBg["gradient-bg--default"]);

        return cssFromArray(classes);
    }

    const cssWrapper = () => {
        let classes = [ NavCSS["nav__button__wrapper"] ];

        if (expanded) classes.push(NavCSS["nav__button__wrapper--expanded"]);
        if (props.double) classes.push(NavCSS["nav__button__wrapper--double"]);
        if (props.reverse) classes.push(NavCSS["nav__button__wrapper--reverse"]);

        return cssFromArray(classes);
    }

    const getButton = () => {
        let buttonElement = (
            <div className = { cssButton() }>
                <div className = { NavCSS["nav__button__image__wrapper"] }>
                    <img src = { props.image } />

                    { 
                        props.badge == undefined || props.badge < 1 ?
                        <></> : 
                        <div className = { NavCSS["nav__button__image__badge"] }>{ props.badge }</div> 
                    }
                </div>
                { props.hideLabel ? <></> : <p>{ props.label }</p> }
                <img src = { imgCollapse } />
            </div>
        );

        if (props.url == null) return buttonElement;
        
        return (
            <Link 
                key = { `link-${ props.name }` } 
                to = { props.url }
                state = { props.params }
            >   
                { buttonElement }
            </Link>
        );
    }

    const getExpandoButtons = () => {
        if (props.children == null)
            return (null);

        return (
            <div className = { NavCSS["nav__button__wrapper__buttons"] }>
                { props.children }
            </div>
        );
    }

    const isActive = () => {
        if (props.children != null)
            console.log(props.children);

        if (props.activeCondition) return props.activeCondition;
        if (props.params) return location.pathname == props.url && location.state.type == props.params.type;

        if (props.children != null) {
            let eligibleChildren = props.children?.filter(child => child.props.url == location.pathname);

            if (eligibleChildren.length > 0) return !expanded;
        }
        
        return location.pathname == props.url;
    }

    const onClick = (e) => {
        e.stopPropagation();

        if (props.children != null)
            setExpanded(!expanded);

        if (props.popupElement)
            return props.onClick(props.popupElement);

        if (props.onClick != null)
            props.onClick();
    }

    return (
        <div 
            className = { cssWrapper() }
            onClick = { onClick }
            title = { props.label }
        >
            { getButton() }
            { getExpandoButtons() }
        </div>
    );
}

export default NavButton;
