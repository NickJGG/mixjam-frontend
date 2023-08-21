import { useEffect, useState } from "react";

import cssFromArray from "utils/cssFromArray";

import ToggleCSS from "./Toggle.module.css";
import SettingCSS from "../Setting.module.css";
import cssGradientBg from "assets/css/gradient-bg.module.css";

const Toggle = (props) => {
    const [initialActivated, setInitialActivated] = useState(props.activated ?? false);
    const [activated, setActivated] = useState(props.activated ?? false);

    const cssSettingAction = () => {
        let classes = [
            SettingCSS["setting__action"],
            ToggleCSS["toggle"],
            cssGradientBg["gradient-bg"],
        ];

        if (activated) { 
            classes.push(ToggleCSS["toggle--activated"]);
            classes.push(cssGradientBg["gradient-bg--green"]);
            classes.push(cssGradientBg["gradient-bg--active"]);
        } else 
            classes.push(cssGradientBg["gradient-bg--red"]);

        return cssFromArray(classes);
    }

    const onClick = () => {
        if (props.activeCondition) return;

        let newActivated = !activated;

        if (newActivated && props.onActivate) {
            props.onActivate();
            props.onEnable();
        }
        if (!newActivated && props.onDeactivate) {
            props.onDeactivate();
            props.onDisable();
        }

        setActivated(newActivated);
    }

    return (
        <div className = { cssSettingAction() } onClick = { onClick }>
            <div className = { ToggleCSS["toggle__thumb"] }>
                
            </div>
        </div>
    );
}

export default Toggle;
