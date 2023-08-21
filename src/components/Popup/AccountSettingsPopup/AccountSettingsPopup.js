import { Cookies, withCookies } from "react-cookie";

import cssFromArray from "utils/cssFromArray";
import setCookie from "utils/setCookie";
import getCookie from "utils/getCookie";

import { instanceOf } from 'prop-types';

import Popup from "../Popup";
import Toggle from "./Setting/Toggle/Toggle";
import LayoutButton from "components/LayoutButton/LayoutButton";

import SettingsPopupCSS from "./AccountSettingsPopup.module.css";
import Setting from "./Setting/Setting";
import SettingGroup from "./SettingGroup/SettingGroup";

const AccountSettingsPopup = (props) => {
    return (
        <Popup 
            title = "Settings"
            size = "medium"
            classes = { SettingsPopupCSS["popup__element"] }
            body = {(
                <div className = { SettingsPopupCSS["settings__container"] }>
                    <SettingGroup>
                        <Setting label = "Spotify Access"
                                 description = "Required for MixJam's functionality."

                                 action = {(
                                    <Toggle 
                                        activated = { props.user?.profile?.authorized }
                                        activeCondition = { props.user?.profile?.authorized }
                                        
                                        onActivate = { () => window.open(`https://accounts.spotify.com/authorize?response_type=code&client_id=e6a99e3eb8a348f9a4b03d7b106ce150&scope=user-library-modify+user-follow-read+streaming+app-remote-control+user-modify-playback-state+user-read-currently-playing+playlist-read-private+playlist-read-collaborative+user-read-playback-state+user-read-recently-played+user-top-read+user-library-read&redirect_uri=${encodeURIComponent(process.env.REACT_APP_SPOTIFY_REDIRECT_BASE_URL)}%2Fcallback%2F&state=null`, '_blank') }
                                    />
                                 )}
                        />
                    </SettingGroup>

                    <SettingGroup>
                        <Setting label = "Text-to-Speech"
                                 description = "Narration of various actions."
                                 disabled = { getCookie(props.cookies, "tts") === "false" }
                                 action = {(
                                    <Toggle 
                                        activated = { getCookie(props.cookies, "tts") === "true" }

                                        onActivate = { () => setCookie(props.cookies, "tts", true) }
                                        onDeactivate = { () => setCookie(props.cookies, "tts", false) }
                                    />
                                 )}
                        >
                            <SettingGroup>
                                <Setting label = "Playback"
                                        description = "Track change, player updates, and queue additions."
                                        action = {(
                                            <Toggle 
                                                activated = { getCookie(props.cookies, "tts_playback") === "true" }

                                                onActivate = { () => setCookie(props.cookies, "tts_playback", true) }
                                                onDeactivate = { () => setCookie(props.cookies, "tts_playback", false) }
                                            />
                                        )}
                                />
                                <Setting label = "Party"
                                        description = "Joining and leaving."
                                        action = {(
                                            <Toggle 
                                                activated = { getCookie(props.cookies, "tts_party") === "true" }

                                                onActivate = { () => setCookie(props.cookies, "tts_party", true) }
                                                onDeactivate = { () => setCookie(props.cookies, "tts_party", false) }
                                            />
                                        )}
                                />
                            </SettingGroup>
                        </Setting>
                    </SettingGroup>
                </div>
            )}
        />
    );
}

AccountSettingsPopup.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(AccountSettingsPopup);
