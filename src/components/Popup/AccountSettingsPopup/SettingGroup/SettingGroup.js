import { useEffect, useState } from "react";

import cssFromArray from "utils/cssFromArray";

import SettingGroupCSS from "./SettingGroup.module.css";

const SettingGroup = (props) => {
    const cssSettingGroup = () => {
        let classes = [
            SettingGroupCSS["setting__group"],
        ];

        if (props.disabled) classes.push(SettingGroupCSS["setting__group--disabled"]);

        return cssFromArray(classes);
    }

    return (
        <div className = { cssSettingGroup() }>
            {/* <p className = { SettingsPopupCSS["settings__group__label"] }>Spotify</p> */}
            <div className = { SettingGroupCSS["setting__group__settings"] }>
                { props.children }
            </div>
        </div>
    );
}

export default SettingGroup;
