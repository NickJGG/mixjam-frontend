import { useEffect, useState, memo } from "react";

import axios from 'axios';

import getRowLength from "utils/getRowLength";

import Block from "layout/Auth/Block/Block";
import BlockSection from "layout/Auth/Block/BlockSection";

import PlayablePopup from "../PlayablePopup";

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
    }, []);

    return (
        <PlayablePopup
            playable = { props.album }
            title = { props.album?.name }
            image = { props.album?.images[0].url }
        >
            <Block label = "Tracks">
                <BlockSection 
                    playables = { tracks }
                    contextUri = { props.album?.uri }
                    vertical = { true }
                    columns = "3"

                    numPlaceholders = { getRowLength() * 2 }
                />
            </Block>
        </PlayablePopup>
    );
}

export default AlbumPopup;
