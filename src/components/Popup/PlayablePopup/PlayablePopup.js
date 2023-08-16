import { useContext } from "react";

import PageContext from "contexts/PageContext";

import Popup from "../Popup";
import LayoutButton from "components/LayoutButton/LayoutButton";
import ArtistPopup from "components/Popup/PlayablePopup/ArtistPopup/ArtistPopup";

import PlayablePopupCSS from "./PlayablePopup.module.css";

import imgSaved from "assets/img/icons/favorite-white-96.png";
import imgUnsaved from "assets/img/icons/favorite-white-outline-96.png";

const PlayablePopup = (props) => {
    const {
        addToQueue,
        playTrack,
        openPopupContainer,
        previousPopContainer,
        nextPopupContainer,
    } = useContext(PageContext);

    const getMainArtist = () => {
        if (props.playable.type == "artist")
            return props.playable;

        return props.playable.artists[0];
    }

    const getMainArtistImage = () => {
        if (props.playable.type == "album")
            return props.tracks?.length > 0 ? props.tracks[0].artists[0].images[0].url : props.image;

        return getMainArtist().images[0].url;
    }

    let saveTerms = {
        artist: {
            positive: "Follow",
            negative: "Unfollow",
        },
        album: {
            positive: "Save",
            negative: "Unsave",
        },
        playlist: {
            positive: "Save",
            negative: "Unsave",
        },
    };

    const openArtist = () => {
        openPopupContainer((
            <ArtistPopup artist = { getMainArtist() } />
        ));
    }

    return (
        <Popup
            header = {(
                <div className = { PlayablePopupCSS["popup__element__header"] }>
                    <div className = { PlayablePopupCSS["popup__element__header__image"] }>
                        <img src = { props.image } />
                    </div>
                    <div className = { PlayablePopupCSS["popup__element__header__details"] }>
                        <p className = { PlayablePopupCSS["popup__element__header__details__type"] }>{ props.playable.type }</p>
                        <p className = { PlayablePopupCSS["popup__element__header__details__name"] }>{ props.title }</p>
                    </div>
                    <div className = { PlayablePopupCSS["popup__element__header__details__actions"] }>
                        {
                            ["artist", "playlist"].includes(props.playable.type) ? <></> : 
                            <LayoutButton 
                                label = { getMainArtist().name }
                                defaultImagePath = { getMainArtistImage() }
                                onClick = { openArtist }
                            />
                        }
                        <LayoutButton 
                            label = { props.playable?.is_liked ? saveTerms[props.playable.type].negative : saveTerms[props.playable.type].positive }
                            defaultImagePath = { props.playable?.is_liked ? imgSaved : imgUnsaved }
                        />
                    </div>
                </div>
            )}
            body = { props.children }

            closePopupContainer = { props.closePopupContainer }
        />
    );
}

export default PlayablePopup;