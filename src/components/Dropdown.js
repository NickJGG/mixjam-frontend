import { useState } from "react";
import cssFromArray from "utils/cssFromArray";

import cssDropdown from "../assets/css/dropdown-container.module.css";

const Dropdown = (props) => {
    const [open, setOpen] = useState(false);

    const onClick = () => {
        setOpen(!open);
    }
    const onBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget))
            setOpen(false);
    }

    return (
        <div 
            id = { props.id } 
            className = { cssFromArray([
                cssDropdown["dropdown-container"],
                cssDropdown[`dropdown-container--${ props.orientation }`],
                cssDropdown[`dropdown-container--${ props.row ? "row" : "column" }`],
                cssDropdown[`dropdown-container--${ open ? "open" : "column" }`],
                props.classes || ""
            ]) }
            tabIndex = { 0 } 
            
            onBlur = { onBlur }
        >
            <div 
                className = { cssDropdown["dropdown-toggle"] } 
                onClick = { onClick }
            >
                { props.toggleElement }
            </div>
            <div className = { cssDropdown["dropdown-element"] }>
                { props.bodyElement }
            </div>
        </div>
    );
}

export default Dropdown;