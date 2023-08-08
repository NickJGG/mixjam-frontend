import { useState } from "react";

import axios from "axios";

import cssFromArray from "utils/cssFromArray";

import Listing from "./Listing";
import ListingButton from "components/buttons/ListingButton";
import ArtistPopup from "../popups/ArtistPopup";
import PlayablePopup from "../popups/PlayablePopup";
import AlbumPopup from "../popups/AlbumPopup";

import cssListing from "../../assets/css/auth/listings/listing.module.css";
import cssPlayableListing from "../../assets/css/auth/listings/playable-listing.module.css";
import cssGradientBg from "../../assets/css/gradient-bg.module.css";

import imgFavorited from "../../assets/img/icons/favorite-white-96.png";
import imgNotFavorited from "../../assets/img/icons/favorite-white-outline-96.png";
import imgPlay from "../../assets/img/icons/play-white-56.png";
import imgAddToQueue from "../../assets/img/icons/add-white-outline-96.png";

const PlayableListing = (props) => {
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
                    cssListing["listing__details__subheader--disappear"],
                    cssPlayableListing["playable__by"],
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
            case "artist":
                buttons.push(
                    <ListingButton
                        image = { getArtistImage() }
                        label = { getMainArtist().name }

                        onClick = { openArtist }
                    />
                );

                break;
            case "track":
                buttons.push(
                    <ListingButton
                        image = { getArtistImage() }
                        label = { getMainArtist().name }

                        onClick = { openArtist }
                    />
                );
                buttons.push(
                    <ListingButton
                        image = { imgAddToQueue }
                        label = { "Add to Queue" }

                        onClick = { () => props.onAddToQueue(props.playable.uri) }
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

    const getListingData = () => {
        return {
            ...props.listing,
            classes: cssFromArray([
                cssListing["listing--playable"]
            ]),
            gradientClasses: cssGradientBg["gradient-bg--default"],
            color: "red",
            cssModifier: cssPlayableListing,
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
        props.openPopupContainer((
            <ArtistPopup
                artist = { getMainArtist() }

                currentlyPlayingURI = { props.currentlyPlayingURI }
                currentlyPlayingContextURI = { props.currentlyPlayingContextURI }

                onAddToQueue = { props.onAddToQueue }
                onPlay = { props.onPlay }
                openPopupContainer = { props.openPopupContainer }
                closePopupContainer = { props.closePopupContainer }
            />
        ));
    }

    const openAlbum = () => {
        props.openPopupContainer((
            <AlbumPopup
                album = { props.playable }

                currentlyPlayingURI = { props.currentlyPlayingURI }
                currentlyPlayingContextURI = { props.currentlyPlayingContextURI }

                onAddToQueue = { props.onAddToQueue }
                onPlay = { props.onPlay }
                openPopupContainer = { props.openPopupContainer }
                closePopupContainer = { props.closePopupContainer }
            />
        ));
    }

    return (
        <Listing
            listing = { getListingData() }
            isPressing = { pressing }
        >
            <div className = { cssFromArray([
                    cssListing["listing__image"],
                    cssPlayableListing["listing__image"]
                ]) }
                onClick = { () => props.onPlay(props.playable.uri) }
                onMouseDown = { () => setPressing(true) }
                onMouseUp = { () => setPressing(false) }
                onMouseLeave = { () => setPressing(false) }
            >
                <img src = { getCoverImage() } />
                <img src = { imgPlay } />
            </div>
            <div className = { cssFromArray([
                    cssListing["listing__details"],
                    cssPlayableListing["listing__details"]
                ]) }
            >
                <p className = { cssPlayableListing["playable__name"] }>{ getName() }</p>
                { elementDescription() }
            </div>
            <div className = { cssFromArray([
                    cssListing["listing__actions"],
                    cssListing["listing__actions--vertical"],
                ])
            }>
                { elementButtons() }
            </div>
        </Listing>
    );
}

export default PlayableListing;