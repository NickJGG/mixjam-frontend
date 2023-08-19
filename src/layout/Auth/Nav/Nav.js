import { useContext } from "react";

import PageContext from "contexts/PageContext";

import NavSection from "./NavSection";
import NavSectionCollection from "./NavSectionCollection";
import NavButton from "./NavButton";
import NotificationsPopup from "components/Popup/NotificationsPopup/NotificationsPopup";
import FriendsPopup from "components/Popup/FriendsPopup/FriendsPopup";
import PartyPopup from "components/Popup/PartyPopup/PartyPopup";
import AccountSettingsPopup from "components/Popup/AccountSettingsPopup/AccountSettingsPopup";

import imgHome from "assets/img/icons/home-white-outline-96.png";
import imgDiscover from "assets/img/icons/discover-white-outline-96.png";
import imgDiscussion from "assets/img/icons/discussion-white-outline-96.png";
import imgParty from "assets/img/icons/musicrecord-white-outline-96.png";
import imgFriends from "assets/img/icons/people-white-outline-96.png";
import imgSearch from "assets/img/icons/search-white-outline-96.png";
import imgSettings from "assets/img/icons/settings-white-outline-96.png";

import imgCollapse from "assets/img/icons/collapse-white-outline-96.png";
import imgNotification from "assets/img/icons/notification-white-outline-96.png";
import imgSave from "assets/img/icons/favorite-white-outline-96.png";

import NavCSS from "./Nav.module.css";

const Nav = (props) => {
    const {
        openPopupContainer,
    } = useContext(PageContext);

    return (
        <div id = { NavCSS["nav"] } className = { props.collapsed ? NavCSS["nav--collapsed"] : "" }>
            <NavSection onPageSelect = { props.onPageSelect }>
                <NavSectionCollection label = "Header" hideLabel = { true } right = { true } short = { true }>
                    <NavButton label = "Collapse" image = { imgCollapse } onClick = { props.onToggleCollapse }
                        hideLabel = { true }
                        short = { true }
                        small = { true }
                    />
                </NavSectionCollection>
            </NavSection>
            <NavSection onPageSelect = { props.onPageSelect }>
                <NavSectionCollection label = "General" hideLabel = { true }>
                    <NavButton label = "Home" image = { imgHome } url = "/" />
                    <NavButton label = "Search" image = { imgSearch } url = "/search/" />
                    <NavButton label = "Saved" image = { imgSave } url = "/saved/" />
                </NavSectionCollection>
                <NavSectionCollection label = "Discover" hideLabel = { true }>
                    <NavButton label = "Discover" image = { imgDiscover } url = "/discover/" />
                    <NavButton label = "Discussion" image = { imgDiscussion } url = "/discussion/" />
                </NavSectionCollection>
            </NavSection>
            <NavSection onPageSelect = { props.onPageSelect }>
                <NavSectionCollection label = "Social" hideLabel = { true } row = {true}>
                    <NavButton label = { `Friends • ${ props.user?.userprofile?.friends?.length || 0 }` } 
                        image = { imgFriends }
                        popupElement = { (
                            <FriendsPopup 
                                key = "friends-popup"
                                user = { props.user }
                            
                                onPartyInvite = { props.onPartyInvite }
                            />
                        ) }
                        popupDependencies = { props.user }

                        onClick = { openPopupContainer } 
                    />
                    <NavButton label = { `Party • ${ props.party?.users?.length || 0 }` } 
                        image = { imgParty }
                        popupElement = { (
                            <PartyPopup 
                                key = "party-popup"
                                user = { props.user }
                                party = { props.party }
                            />
                        ) }
                        popupDependencies = { props.party }
                        activeCondition = { props.party?.connected }

                        onClick = { openPopupContainer } 
                    />
                    <NavButton label = { `Notifications • ${ props.user?.notifications?.length || 0 }` } 
                        image = { imgNotification }
                        popupElement = { (
                            <NotificationsPopup 
                                key = "notification-popup"
                                notifications = { props.user?.notifications } 
                                onNotificationAccept = { props.onNotificationAccept }
                                onNotificationIgnore = { props.onNotificationIgnore }
                            />
                        ) }
                        popupDependencies = { props.user?.notifications }

                        onClick = { openPopupContainer } 
                    />
                </NavSectionCollection>
                <NavSectionCollection label = "Account" hideLabel = { true } row = { true }>
                    <NavButton label = { props.user?.username } image = { props.user?.profile?.picture } url = "/me/" 
                        color = "blue"
                        default = { true }
                        double = { true }
                        reverse = { true }
                    />
                    <NavButton label = "Settings"
                        image = { imgSettings }
                        popupElement = { (
                            <AccountSettingsPopup 
                                key = "account-settings-popup"
                                user = { props.user } 
                                onNotificationAccept = { props.onNotificationAccept }
                                onNotificationIgnore = { props.onNotificationIgnore }
                            />
                        ) }
                        popupDependencies = { props.user }

                        onClick = { openPopupContainer } 
                    />
                </NavSectionCollection>
            </NavSection>
            {/* { sections?.map(section => (
                <NavSection
                    key = { section.id }
                    section = { section }

                    onPageSelect = { props.onPageSelect }
                />
            )) } */}
            {/* <a href = "https://accounts.spotify.com/authorize?response_type=code&client_id=e6a99e3eb8a348f9a4b03d7b106ce150&scope=user-library-modify+user-follow-read+streaming+app-remote-control+user-modify-playback-state+user-read-currently-playing+playlist-read-private+playlist-read-collaborative+user-read-playback-state+user-read-recently-played+user-top-read+user-library-read&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback%2F&state=null">Authorize</a> */}
        </div>
    );
}

export default Nav;