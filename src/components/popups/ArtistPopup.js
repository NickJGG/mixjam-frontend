import { useEffect, useState } from "react";

import axios from 'axios';

import getRowLength from "utils/getRowLength";

import Block from "layout/Block";
import BlockSection from "layout/BlockSection";

import PlayablePopup from "./PlayablePopup";

const ArtistPopup = (props) => {
    const [similarArtists, setSimilarArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(async () => {
        setSimilarArtists([]);
        setTopTracks([]);
        setAlbums([]);

        let calls = [
            axios.get(`http://localhost:8000/api/artists/${ props.artist?.id }/similar`).then(data => {
                setSimilarArtists(data?.data);
            }),
            axios.get(`http://localhost:8000/api/artists/${ props.artist?.id }/top`).then(data => {
                setTopTracks(data?.data);
            }),
            axios.get(`http://localhost:8000/api/artists/${ props.artist?.id }/albums`).then(data => {
                setAlbums(data?.data);
                console.log(data?.data);
            }),
        ];

        await Promise.all(calls);
    }, [props.artist?.id]);

    return (
        <PlayablePopup
            title = { props.artist?.name }
            image = { props.artist?.images[0].url }

            currentlyPlayingURI = { props.currentlyPlayingURI }
            currentlyPlayingContextURI = { props.currentlyPlayingContextURI }

            onAddToQueue = { props.onAddToQueue }
            onPlay = { props.onPlay }
            openPopupContainer = { props.openPopupContainer }
            closePopupContainer = { props.closePopupContainer }
        >
            <Block label = "Top Tracks">
                <BlockSection 
                    playables = { topTracks }

                    numPlaceholders = { getRowLength() * 2 }
                    currentlyPlayingURI = { props.currentlyPlayingURI }
                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI }
                    
                    onAddToQueue = { props.onAddToQueue }
                    onPlay = { props.onPlay }
                    openPopupContainer = { props.openPopupContainer }
                    closePopupContainer = { props.closePopupContainer }
                />
            </Block>
            <Block label = "Albums">
                <BlockSection 
                    playables = { albums }

                    numPlaceholders = { getRowLength() * 2 }
                    currentlyPlayingURI = { props.currentlyPlayingURI }
                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI }
                    
                    onAddToQueue = { props.onAddToQueue }
                    onPlay = { props.onPlay }
                    openPopupContainer = { props.openPopupContainer }
                    closePopupContainer = { props.closePopupContainer }
                />
            </Block>
            <Block label = "Similar">
                <BlockSection 
                    playables = { similarArtists }

                    numPlaceholders = { getRowLength() * 2 }
                    currentlyPlayingURI = { props.currentlyPlayingURI }
                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI }
                    
                    onAddToQueue = { props.onAddToQueue }
                    onPlay = { props.onPlay }
                    openPopupContainer = { props.openPopupContainer }
                    closePopupContainer = { props.closePopupContainer }
                />
            </Block>
        </PlayablePopup>
    );
}

export default ArtistPopup;
