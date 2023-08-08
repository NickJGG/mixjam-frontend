import { useState } from "react";

import cssFromArray from "utils/cssFromArray";

import cssHoverExpandable from "../assets/css/hover-expandable.module.css";
import cssGradientBg from "../assets/css/gradient-bg.module.css";

const HoverExpandable = (props) => {
    const [hoverExpanded, setHoverExpanded] = useState(false);

    const cssWrapper = () => {
        if (props.gradientBg)
            return cssFromArray([
                cssHoverExpandable["wrapper"],
                cssGradientBg["gradient-bg"],
                cssGradientBg["gradient-bg--no-pressing"],
                cssGradientBg[`gradient-bg--${ props.color }`],
                cssGradientBg[props.expanded ? "gradient-bg--active" : "gradient-bg--default"],
                props.wrapperClasses || ""
            ])
        
        return cssFromArray([
            cssHoverExpandable["wrapper"],
            props.wrapperClasses || ""
        ]);
    }

    return (
        <div 
            className = { cssFromArray([
                cssHoverExpandable["container"],
                props.expanded || hoverExpanded ? cssHoverExpandable["container--expanded"] : "",
                props.classes || ""
            ]) }
            onMouseEnter = { () => setHoverExpanded(true) }
            onMouseLeave = { () => setHoverExpanded(false) }
        >
            <div 
                className = { cssWrapper() }
            >
                { props.body }

                <div className = { cssHoverExpandable["expandable-element"] }>
                    { props.expandableElement }
                </div>
            </div>
        </div>
    );
}

export default HoverExpandable;