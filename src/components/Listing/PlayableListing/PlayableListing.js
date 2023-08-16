import { memo, useContext, useState } from "react";

import axios from "axios";

import PageContext from "contexts/PageContext";

import cssFromArray from "utils/cssFromArray";

import Listing from "../Listing";
import ListingButton from "components/Listing/ListingButton/ListingButton";
import ArtistPopup from "components/Popup/PlayablePopup/ArtistPopup/ArtistPopup";
import AlbumPopup from "components/Popup/PlayablePopup/AlbumPopup/AlbumPopup";
import PlaylistPopup from "components/Popup/PlayablePopup/PlaylistPopup/PlaylistPopup";

import ListingCSS from "../Listing.module.css";
import PlayableListingCSS from "./PlayableListing.module.css";
import cssGradientBg from "assets/css/gradient-bg.module.css";

import imgFavorited from "assets/img/icons/favorite-white-96.png";
import imgNotFavorited from "assets/img/icons/favorite-white-outline-96.png";
import imgPlay from "assets/img/icons/play-white-56.png";
import imgAddToQueue from "assets/img/icons/add-white-outline-96.png";

const PlayableListing = (props) => {
    const {
        addToQueue,
        playTrack,
        openPopupContainer,
        previousPopup,
        nextPopup,
    } = useContext(PageContext);

    const [pressing, setPressing] = useState(false);
    const [saved, setSaved] = useState(props.playable.liked);

    const isListening = () => {
        if (props.currentlyPlayingURI)
            return props.currentlyPlayingURI == props.playable.uri || props.currentlyPlayingContextURI == props.playable.uri;
        
        return false;
    }

    const getCoverImage = () => {
        switch (props.playable.type) {
            case "track":
                return props.playable.album.images[1].url;
            case "playlist":
                // console.log(props.playable);
                return props.playable.images[0].url;
            default:
                break;
        }

        return props.playable.images[1]?.url;
    }

    const getName = () => {
        return props.playable.name;
    }

    const elementDescription = () => {
        if (props.playable.artists == undefined)
            return;

        return (
            <p className = { cssFromArray([
                    ListingCSS["listing__details__subheader--disappear"],
                    PlayableListingCSS["playable__by"],
                ]) }
            >{ getArtistsNames(props.playable) }</p>
        );
    }

    const elementButtons = () => {
        let buttons = [];

        switch (props.playable.type) {
            case "album":
                buttons.push(
                    <ListingButton
                        image = { props.playable.images[2]?.url }
                        label = { props.playable.name }

                        onClick = { openAlbum }
                    />
                );

                break;
            case "playlist":
                buttons.push(
                    <ListingButton
                        image = { props.playable.images[0]?.url }
                        label = { props.playable.name }

                        onClick = { openPlaylist }
                    />
                );

                break;
            case "artist":
            case "track":
                if (props.contextUri?.includes("artist")){
                    buttons.push(
                        <ListingButton
                            image = { getCoverImage() }
                            label = { props.playable.album.name }
    
                            onClick = { openAlbum }
                        />
                    );
                } else {
                    buttons.push(
                        <ListingButton
                            image = { getArtistImage() }
                            label = { getMainArtist().name }
    
                            onClick = { openArtist }
                        />
                    );
                }

                buttons.push(
                    <ListingButton
                        image = { imgAddToQueue }
                        label = { "Add to Queue" }

                        onClick = { () => addToQueue(props.playable.uri) }
                    />
                );

                break;
            default:
                break;
        }

        buttons.push(
            <ListingButton
                image = { saved ? imgFavorited : imgNotFavorited }
                label = { saved ? "Unsave" : "Save" }

                onClick = { onSave }
            />
        );

        return buttons;
    }

    const getArtistsNames = () => {
        if (props.playable?.type == "artist")
            return props.playable.name;

        let i, artists = [];

        for (i = 0; i < props.playable.artists.length; i++){
            let artist = props.playable.artists[i];
            artists.push(artist.name);
        }

        return artists.join(', ');
    }
    const getMainArtist = () => {
        if (props.playable.type == "artist")
            return props.playable;
        
        return props.playable.artists[0];
    }

    const getClasses = () => {
        let classes = [
            ListingCSS["listing--playable"],
        ];

        if (props.vertical) {
            classes.push(ListingCSS["listing--vertical"]);
            classes.push(PlayableListingCSS["listing--vertical"]);
        }

        return cssFromArray(classes);
    }

    const getListingData = () => {
        return {
            ...props.listing,
            classes: getClasses(),
            gradientClasses: cssGradientBg["gradient-bg--default"],
            color: "red",
            cssModifier: PlayableListingCSS,
            active: isListening()
        }
    }

    const getArtistImage = () => {
        switch (props.playable.type) {
            case "artist":
                return props.playable.images[0].url;
            default:
                return props.playable.artists[0]?.images[0].url;
        }
    }

    const onSave = () => {
        axios.post("http://localhost:8000/api/save/tracks/", {
            ids: props.playable.id,
            save: !saved
        }).then((data) => {
            let success = data.data;

            if (success)
                setSaved(prevSaved => !prevSaved);
        });
    }

    const openArtist = () => {
        openPopupContainer((
            <ArtistPopup artist = { getMainArtist() } />
        ));
    }

    const openAlbum = () => {
        let album;

        switch (props.playable.type) {
            case "track":
                album = props.playable.album;

                break;
            default:
                album = props.playable;

                break;
        }

        console.log(album);

        openPopupContainer((
            <AlbumPopup album = { album } />
        ));
    }

    const openPlaylist = () => {
        openPopupContainer((
            <PlaylistPopup playlist = { props.playable } />
        ));
    }

    const onPlay = () => {
        // if (props.contextUri)
        //     return props.onPlayContext(props.contextUri, props.playable.track_number);

        let trackUri = props.playable?.type == "track" ? props.playable.uri : "",
            contextUri = props.playable?.type == "track" ? props.contextUri : props.playable.uri;

        playTrack(trackUri, contextUri)
    }

    return (
        <Listing
            listing = { getListingData() }
            isPressing = { pressing }
        >
            <div className = { cssFromArray([
                    ListingCSS["listing__image"],
                    PlayableListingCSS["listing__image"]
                ]) }
                onClick = { onPlay }
                onMouseDown = { () => setPressing(true) }
                onMouseUp = { () => setPressing(false) }
                onMouseLeave = { () => setPressing(false) }
            >
                <img src = { getCoverImage() } />
                <img src = { imgPlay } />
            </div>
            <div className = { cssFromArray([
                    ListingCSS["listing__details"],
                    PlayableListingCSS["listing__details"]
                ]) }
            >
                <p className = { PlayableListingCSS["playable__name"] }>{ getName() }</p>
                { elementDescription() }
            </div>
            <div className = { cssFromArray([
                    ListingCSS["listing__actions"],
                    ListingCSS["listing__actions--vertical"],
                ])
            }>
                { elementButtons() }
            </div>
        </Listing>
    );
}

export default PlayableListing;
