import { useEffect, useState } from "react";

import cssFromArray from "utils/cssFromArray";

import ActionableListing from "../components/listings/ActionableListing";
import Block from "../layout/Block";
import LayoutButton from "components/buttons/LayoutButton";
import FriendsPopup from "components/popups/FriendsPopup";
import UserListing from "components/listings/UserListing";

import imgAdd from "../assets/img/icons/plus-white-96.png";
import imgLeave from "../assets/img/icons/back-white-outline-96.png";
import imgParty from "../assets/img/icons/people-white-outline-96.png";
import imgMusicRecord from "../assets/img/icons/musicrecord-white-outline-96.png";

import cssParty from "../assets/css/auth/pages/party.module.css";
import cssContentContainer from "../assets/css/auth/content-container.module.css";
import cssLayoutButton from "../assets/css/layout-button.module.css";
import cssBlock from "../assets/css/auth/block.module.css";
import cssGradientBg from "../assets/css/gradient-bg.module.css";

const Party = (props) => {
    const [createPopup, setCreatePopup] = useState(<FriendsPopup 
        key = "create-party-popup"
        user = { props.user } 
    />);
    const [connectionColor, setConnectionColor] = useState("");
    const [connectedActions, setConnectedActions] = useState([
        {
            key: "leave",
            label: props.party?.connected ? "Connected" : "Disconnected",
            defaultImagePath: imgLeave,
            color: connectionColor,
            classes: cssGradientBg["gradient-bg--default"]
        }
    ]);

    useEffect(() => {
        setCreatePopup(
            <FriendsPopup 
                key = "create-party-popup"
                user = { props.user } 
            />
        );
    }, [props.user?.userprofile?.friends]);

    useEffect(() => {
        let color = "";

        if (props.party?.code != null)
            color = props.party.connected ? "green" : "red";

        setConnectionColor(color);
    }, [props.party]);

    const getBlocks = () => {
        let actionableListings = activities.map(action => (
            <ActionableListing
                key = { action.key }
                actionable = { action }
            />
        ));
        
        let listenerListings = props.party?.users?.map(user => (
            <UserListing 
                key = { user.username }
                user = { user }
            />
        ));

        return [
            {
                key: "listeners",
                sections: [
                    {
                        key: "activeListeners",
                        classes: cssBlock["section--tiny"],
                        listings: listenerListings
                    }
                ]
            },
            // {
            //     key: "actions",
            //     label: "Activities",
            //     sections: [
            //         {
            //             key: "actions",
            //             classes: cssBlock["section--small"],
            //             listings: actionableListings
            //         }
            //     ]
            // }
        ]
    }

    const getActions = () => {
        let actions = props.party.connected ? connectedActions : disconnectedActions;

        return actions.map(action => (
            <LayoutButton 
                key = { action.label }
                button = { action }
            />
        ));
    }

    const getTitle = () => {
        return props.party.connected ? `Party` : "No Party";
    }

    let disconnectedActions = [
        {
            key: "add",
            label: "Create",
            color: "green",
            defaultImagePath: imgAdd,
            classes: cssGradientBg["gradient-bg--default"],
            popupElement: createPopup,
            updatePopupContainer: props.updatePopupContainer,
            onClick: props.openPopupContainer,
        }
    ];
    let activities = [
        {
            name: "Guess That Song",
            imagePath: imgParty
        }
    ];

    return (
        <div 
            id = { cssParty["page--party"]  }
            className = { cssFromArray([
                cssContentContainer["content-container"],
                cssContentContainer["content-container--no-scroll"],
                cssContentContainer["content-container--with-nav"]
            ]) }
        >
            <div className = { cssContentContainer["content-nav"] }>
                <div className = { cssContentContainer["content-nav__identifier"] }>
                    {/* <LayoutButton 
                        button = {{
                            label: getTitle(),
                            defaultImagePath: imgMusicRecord,
                            color: "red",
                            classes: cssFromArray([
                                cssLayoutButton["layout__button--primary"],
                                cssGradientBg["gradient-bg--default"]
                            ]),
                            active: props.party?.connected
                        }}
                    /> */}
                    {/* <img 
                        className = { cssContentContainer["content-nav__icon"] }
                        src = { imgMusicRecord } 
                    /> */}
                    <p className = { cssContentContainer["content-nav__title"] }>{ getTitle() }</p>
                </div>
                <div className = { cssContentContainer["content-nav__actions"] }>
                    { getActions() }
                </div>
            </div>
            <div className = { cssFromArray([
                cssContentContainer["content-container"],
                cssContentContainer["content-container--no-padding"]
            ]) }>
                { getBlocks().map(block => {
                    return (<Block
                        key = { block.key }
                        block = { block }
                    />);
                }) }
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>  
    );
}

export default Party;