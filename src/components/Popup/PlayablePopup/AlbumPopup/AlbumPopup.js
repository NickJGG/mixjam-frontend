import { useEffect, useState } from "react";

import getAlbum from "lib/getAlbum";
import getRowLength from "utils/getRowLength";

import Block from "layout/Auth/Block/Block";
import BlockSection from "layout/Auth/Block/BlockSection";

import PlayablePopup from "../PlayablePopup";

const AlbumPopup = (props) => {
    const [album, setAlbum] = useState({
        ...props.album,
        tracks: [],
    });

    useEffect(async () => {
        let calls = [
            getAlbum(setAlbum, album.id),
        ];

        await Promise.all(calls);
    }, []);

    return (
        <PlayablePopup
            playable = { props.album }
            title = { album?.name }
            image = { album?.images[0].url }
            tracks = { album?.tracks }
        >
            <Block label = "Tracks">
                <BlockSection 
                    playables = { album?.tracks }
                    contextUri = { album?.uri }
                    vertical = { true }
                    columns = "3"

                    numPlaceholders = { getRowLength() * 2 }
                />
            </Block>
        </PlayablePopup>
    );
}

export default AlbumPopup;
