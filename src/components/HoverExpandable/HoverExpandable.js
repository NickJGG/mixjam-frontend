import { useState } from "react";

import cssFromArray from "utils/cssFromArray";

import HoverExpandableCSS from "./HoverExpandable.module.css";
import cssGradientBg from "assets/css/gradient-bg.module.css";

const HoverExpandable = (props) => {
    const [hoverExpanded, setHoverExpanded] = useState(false);

    const cssWrapper = () => {
        if (props.gradientBg)
            return cssFromArray([
                HoverExpandableCSS["wrapper"],
                cssGradientBg["gradient-bg"],
                cssGradientBg["gradient-bg--no-pressing"],
                cssGradientBg[`gradient-bg--${ props.color }`],
                cssGradientBg[props.expanded ? "gradient-bg--active" : "gradient-bg--default"],
                props.wrapperClasses || ""
            ].concat(props.wrapperClasses || []))
        
        return cssFromArray([
            HoverExpandableCSS["wrapper"],
            props.wrapperClasses || ""
        ]);
    }

    return (
        <div 
            className = { cssFromArray([
                HoverExpandableCSS["container"],
                props.expanded || hoverExpanded ? HoverExpandableCSS["container--expanded"] : ""
            ].concat(props.classes || [])) }
            onMouseEnter = { () => setHoverExpanded(true) }
            onMouseLeave = { () => setHoverExpanded(false) }
        >
            <div 
                className = { cssWrapper() }
            >
                { props.body }

                <div className = { HoverExpandableCSS["expandable-element"] }>
                    { props.expandableElement }
                </div>
            </div>
        </div>
    );
}

export default HoverExpandable;
