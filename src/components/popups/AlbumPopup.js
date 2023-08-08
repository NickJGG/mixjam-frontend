import { useEffect, useState } from "react";

import axios from 'axios';

import getRowLength from "utils/getRowLength";

import Block from "layout/Block";
import BlockSection from "layout/BlockSection";

import PlayablePopup from "components/popups/PlayablePopup";

const AlbumPopup = (props) => {
    const [tracks, setTracks] = useState([]);

    useEffect(async () => {
        setTracks([]);

        let calls = [
            axios.get(`http://localhost:8000/api/albums/${ props.album?.id }`).then(data => {
                setTracks(data?.data.tracks);
            }),
        ];

        await Promise.all(calls);
    }, [props.album?.id]);

    return (
        <PlayablePopup
            title = { props.album?.name }
            image = { props.album?.images[0].url }

            currentlyPlayingURI = { props.currentlyPlayingURI }
            currentlyPlayingContextURI = { props.currentlyPlayingContextURI }

            onAddToQueue = { props.onAddToQueue }
            onPlay = { props.onPlay }
            openPopupContainer = { props.openPopupContainer }
            closePopupContainer = { props.closePopupContainer }
        >
            <Block label = "Tracks">
                <BlockSection 
                    playables = { tracks }

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

export default AlbumPopup;
