import cssFromArray from "utils/cssFromArray";

import Popup from "../Popup";
import LayoutButton from "components/LayoutButton/LayoutButton";

import SettingsPopupCSS from "./AccountSettingsPopup.module.css";

const AccountSettingsPopup = (props) => {
    console.log(props.user);

    const actionConnect = () => {
        if (props.user?.profile?.authorized)
            return (
                <p className = { cssFromArray([
                    SettingsPopupCSS["setting__action__status"],
                    SettingsPopupCSS["setting__action__status--success"],
                ])}>Connected</p>
            );
        
        return (
            <LayoutButton
                label = { props.user?.profile?.authorized ? "Connected" : "Connect" }
                url = { `https://accounts.spotify.com/authorize?response_type=code&client_id=e6a99e3eb8a348f9a4b03d7b106ce150&scope=user-library-modify+user-follow-read+streaming+app-remote-control+user-modify-playback-state+user-read-currently-playing+playlist-read-private+playlist-read-collaborative+user-read-playback-state+user-read-recently-played+user-top-read+user-library-read&redirect_uri=${encodeURIComponent(process.env.REACT_APP_SPOTIFY_REDIRECT_BASE_URL)}%2Fcallback%2F&state=null` }
            />
        );
    }

    return (
        <Popup 
            title = "Settings"
            size = "medium"
            classes = { SettingsPopupCSS["popup__element"] }
            body = {(
                <div className = { SettingsPopupCSS["settings__container"] }>
                    <div className = { SettingsPopupCSS["settings__group"] }>
                        <p className = { SettingsPopupCSS["settings__group__label"] }>Spotify</p>
                        <div className = { SettingsPopupCSS["settings__group__settings"] }>
                            <div className = { SettingsPopupCSS["setting"] }>
                                <div className = { SettingsPopupCSS["setting__info"] }>
                                    <p className = { SettingsPopupCSS["setting__info__label"] }>App Access</p>
                                    <p className = { SettingsPopupCSS["setting__info__desc"] }>Access to Spotify is required for MixJam's functionality.</p>
                                </div>
                                <div className = { SettingsPopupCSS["setting__actions"] }>
                                    <div className = { SettingsPopupCSS["setting__action"] }>
                                        { actionConnect() }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        />
    );
}

export default AccountSettingsPopup;
