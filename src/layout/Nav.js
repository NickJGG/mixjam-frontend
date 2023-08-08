import { useEffect, useState } from "react";

import NavSection from "./NavSection";
import NotificationsPopup from "../components/popups/NotificationsPopup";
import FriendsPopup from "../components/popups/FriendsPopup";
import PartyPopup from "../components/popups/PartyPopup";

import imgHome from "../assets/img/icons/home-white-outline-96.png";
import imgDiscover from "../assets/img/icons/discover-white-outline-96.png";
import imgDiscussion from "../assets/img/icons/discussion-white-outline-96.png";
import imgParty from "../assets/img/icons/musicrecord-white-outline-96.png";
import imgFriends from "../assets/img/icons/people-white-outline-96.png";
import imgSearch from "../assets/img/icons/search-white-outline-96.png";
import imgProfile from "../assets/img/icons/profile-white-outline-96.png";
import imgSettings from "../assets/img/icons/settings-white-outline-96.png";

import imgCollapse from "../assets/img/icons/collapse-white-outline-96.png";
import imgNotification from "../assets/img/icons/notification-white-outline-96.png";
import imgSave from "../assets/img/icons/favorite-white-outline-96.png";

import cssNav from "../assets/css/auth/nav.module.css";
import cssGradientBg from "../assets/css/gradient-bg.module.css";
import cssFromArray from "utils/cssFromArray";

const Nav = (props) => {
    const [notiPopup, setNotiPopup] = useState(
        <NotificationsPopup 
            key = "notification-popup"
            notifications = { props.user?.notifications } 

            onNotificationAccept = { props.onNotificationAccept }
            onNotificationIgnore = { props.onNotificationIgnore }

            closePopupContainer = { props.closePopupContainer }
        />
    );
    const [friendsPopup, setFriendsPopup] = useState(
        <FriendsPopup 
            key = "friends-popup"
            user = { props.user }
            
            onPartyInvite = { props.onPartyInvite }

            closePopupContainer = { props.closePopupContainer }
        />
    );
    const [partyPopup, setPartyPopup] = useState(
        <PartyPopup 
            key = "party-popup"
            user = { props.user }
            party = { props.party }

            closePopupContainer = { props.closePopupContainer }
        />
    );

    useEffect(() => {
        setFriendsPopup(
            <FriendsPopup 
                key = "friends-popup"
                user = { props.user }
            
                onPartyInvite = { props.onPartyInvite }

                closePopupContainer = { props.closePopupContainer }
            />
        );
    }, [props.user?.profile?.friends]);

    useEffect(() => {
        setPartyPopup(
            <PartyPopup 
            key = "party-popup"
            user = { props.user }
            party = { props.party }

            closePopupContainer = { props.closePopupContainer }
        />
        );
    }, [props.party]);

    useEffect(() => {
        setNotiPopup(
            <NotificationsPopup 
                key = "notification-popup"
                notifications = { props.user?.notifications } 
                onNotificationAccept = { props.onNotificationAccept }
                onNotificationIgnore = { props.onNotificationIgnore }

                closePopupContainer = { props.closePopupContainer }
            />
        );
    }, [props.user?.notifications]);

    let sections = [
        {
            id: cssNav["nav__section--header"],
            collections: [
                {
                    name: "Header",
                    buttons: [
                        {
                            name: "Collapse",
                            image_path: imgCollapse,
                            classes: cssFromArray([
                                cssNav["nav__button--short"],
                                cssNav["nav__button--small"],
                                cssNav["nav__button--hidden-name"],
                            ]),
                            onClick: props.onToggleCollapse,
                        }
                    ],
                    classes: cssFromArray([
                        cssNav["nav__section__collection--right"],
                        cssNav["nav__section__collection--hidden-name"],
                    ]),
                    elements_classes: cssNav["nav__section__collection__elements--short"],
                },
            ]
        },
        {
            id: cssNav["nav__section--links"],
            collections: [
                {
                    name: "General",
                    buttons: [
                        {
                            name: "Home",
                            image_path: imgHome,
                            url: "/",
                        },
                        {
                            name: "Search",
                            image_path: imgSearch,
                            url: "/search/",
                        },
                        {
                            name: "Saved",
                            image_path: imgSave,
                            url: "/saved/",
                        }
                    ]
                },
                {
                    name: "Discover",
                    buttons: [
                        {
                            name: "Discover",
                            image_path: imgDiscover,
                            url: "/discover/"
                        },
                        {
                            name: "Discussion",
                            image_path: imgDiscussion,
                            url: "/discussion/"
                        },
                    ],
                    classes: cssNav["nav__section__collection--hidden-name"],
                },
            ]
        },
        {
            id: cssNav["nav__section--footer"],
            collections: [
                {
                    name: "Social",
                    classes: cssFromArray([
                        cssNav["nav__section__collection--hidden-name"],
                        cssNav["nav__section__collection--row"],
                    ]),
                    buttons: [
                        {
                            name: `Friends • ${ props.user?.userprofile?.friends?.length || 0 }`,
                            image_path: imgFriends,
                            popupElement: friendsPopup,
                            updatePopupContainer: props.updatePopupContainer,
                            onClick: props.openPopupContainer,
                        },
                        {
                            name: `Party • ${ props.party?.users?.length || 0 }`,
                            classes: "default",
                            image_path: imgParty,
                            popupElement: partyPopup,
                            updatePopupContainer: props.updatePopupContainer,
                            onClick: props.openPopupContainer,
                            activeCondition: props.party?.connected,
                        },
                        {  
                            key: `footer-notifications`,
                            name: `Notifications • ${ props.user?.notifications?.length || 0 }`,
                            image_path: imgNotification,
                            popupElement: notiPopup,
                            updatePopupContainer: props.updatePopupContainer,
                            onClick: props.openPopupContainer,
                        },
                    ]
                },
                {
                    name: "Footer",
                    classes: cssFromArray([
                        cssNav["nav__section__collection--hidden-name"],
                        cssNav["nav__section__collection--row"],
                    ]),
                    buttons: [
                        {  
                            key: `footer-${ props.user?.username }`,
                            name: props.user?.username,
                            classes: cssFromArray([
                                cssGradientBg["gradient-bg--default"],
                                cssNav["nav__button--double"],
                            ]),
                            image_path: props.user?.profile?.picture,
                            url: "/me/",
                            color: "blue",
                            double: true,
                            reverse: true,
                        },
                        {
                            name: "Settings",
                            image_path: imgSettings,
                            url: "/settings/",
                        }
                    ]
                },
            ]
        }
    ];
    
    return (
        <div id = { cssNav["nav"] } className = { props.collapsed ? cssNav["nav--collapsed"] : "" }>
            { sections?.map(section => (
                <NavSection
                    key = { section.id }
                    section = { section }

                    onPageSelect = { props.onPageSelect }
                />
            )) }
            {/* <a href = "https://accounts.spotify.com/authorize?response_type=code&client_id=e6a99e3eb8a348f9a4b03d7b106ce150&scope=user-library-modify+user-follow-read+streaming+app-remote-control+user-modify-playback-state+user-read-currently-playing+playlist-read-private+playlist-read-collaborative+user-read-playback-state+user-read-recently-played+user-top-read+user-library-read&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback%2F&state=null">Authorize</a> */}
        </div>
    );
}

export default Nav;