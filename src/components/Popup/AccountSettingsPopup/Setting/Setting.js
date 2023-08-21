import React, { useEffect, useState } from "react";

import cssFromArray from "utils/cssFromArray";

import SettingCSS from "./Setting.module.css";

const Setting = (props) => {
    const [disabled, setDisabled] = useState(props.disabled);

    const cssSetting = () => {
        let classes = [
            SettingCSS["setting"],
        ];

        return cssFromArray(classes);
    }

    return (
        <div className = { cssSetting() }>
            <div className = { SettingCSS["setting__info"] }>
                <p className = { SettingCSS["setting__info__label"] }>{ props.label }</p>
                <p className = { SettingCSS["setting__info__desc"] }>{ props.description }</p>
            </div>
            <div className = { SettingCSS["setting__actions"] }>
                { React.cloneElement(props.action, { onDisable: () => setDisabled(true), onEnable: () => setDisabled(false) }) }
            </div>
            
            {/* { props.children } */}
            { props.children ? React.cloneElement(props.children, { disabled: disabled }) : <></> }
        </div>
    );
}

export default Setting;
