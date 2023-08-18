import { useEffect, useState } from "react";

import getArtist from "lib/getArtist";
import getArtistsSimilar from "lib/getArtistsSimilar";
import getArtistsTopTracks from "lib/getArtistsTopTracks";
import getArtistsAlbums from "lib/getArtistsAlbums";
import getRowLength from "utils/getRowLength";

import Block from "layout/Auth/Block/Block";
import BlockSection from "layout/Auth/Block/BlockSection";

import PlayablePopup from "../PlayablePopup";

const ArtistPopup = (props) => {
    const [similarArtists, setSimilarArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artist, setArtist] = useState(props.artist);

    useEffect(async () => {
        setSimilarArtists([]);
        setTopTracks([]);
        setAlbums([]);
        setArtist(null);

        let calls = [
            getArtist(setArtist, props.artist?.id),
            getArtistsSimilar(setSimilarArtists, props.artist?.id),
            getArtistsTopTracks(setTopTracks, props.artist?.id),
            getArtistsAlbums(setAlbums, props.artist?.id),
        ];

        await Promise.all(calls);
    }, [props.artist?.id]);

    return (
        <PlayablePopup
            playable = { props.artist }
            title = { props.artist?.name }
            image = { props.artist?.images[0].url }
        >
            <Block label = "Top Tracks">
                <BlockSection 
                    playables = { topTracks }
                    vertical = { true }
                    columns = "2"
                    contextUri = { props.artist.uri }

                    numPlaceholders = { 10 }
                />
            </Block>
            <Block label = "Albums">
                <BlockSection 
                    playables = { albums }

                    numPlaceholders = { getRowLength() }
                />
            </Block>
            <Block label = "Similar">
                <BlockSection 
                    playables = { similarArtists }

                    numPlaceholders = { getRowLength() * 2 }
                />
            </Block>
            <input type = "hidden" value = { props.artist?.id } />
        </PlayablePopup>
    );
}

export default ArtistPopup;
