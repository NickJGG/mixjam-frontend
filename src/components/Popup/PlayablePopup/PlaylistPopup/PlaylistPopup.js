import { useEffect, useState } from "react";

import getPlaylist from "lib/getPlaylist";
import getRowLength from "utils/getRowLength";

import Block from "layout/Auth/Block/Block";
import BlockSection from "layout/Auth/Block/BlockSection";

import PlayablePopup from "../PlayablePopup";

const PlaylistPopup = (props) => {
    const [playlist, setPlaylist] = useState(props.playlist);

    useEffect(async () => {
        setPlaylist({});

        let calls = [
            getPlaylist(setPlaylist, props.playlist?.id),
        ];

        await Promise.all(calls);
    }, []);

    return (
        <PlayablePopup
            playable = { props.playlist }
            title = { props.playlist?.name }
            image = { props.playlist?.images[0].url }
        >
            <Block label = "Tracks">
                <BlockSection 
                    playables = { playlist?.tracks?.href ? [] : playlist.tracks }
                    contextUri = { playlist?.uri }
                    vertical = { true }
                    columns = "3"

                    numPlaceholders = { getRowLength() * 2 }
                />
            </Block>
        </PlayablePopup>
    );
}

export default PlaylistPopup;
