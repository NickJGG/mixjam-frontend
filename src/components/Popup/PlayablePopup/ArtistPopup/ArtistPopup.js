import { useEffect, useState, memo } from "react";

import axios from 'axios';

import getRowLength from "utils/getRowLength";

import Block from "layout/Auth/Block/Block";
import BlockSection from "layout/Auth/Block/BlockSection";

import PlayablePopup from "../PlayablePopup";

const ArtistPopup = (props) => {
    const [similarArtists, setSimilarArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artist, setArtist] = useState(props.artist);

    useEffect(async (prevArtistId) => {
        console.log("prevArtistId", prevArtistId);
        console.log("newArtistId", props.artist.id);

        setSimilarArtists([]);
        setTopTracks([]);
        setAlbums([]);
        setArtist(null);

        let calls = [
            axios.get(`http://localhost:8000/api/artists/${ props.artist?.id }`).then(data => {
                setArtist(data?.data);
            }),
            axios.get(`http://localhost:8000/api/artists/${ props.artist?.id }/similar`).then(data => {
                setSimilarArtists(data?.data);
            }),
            axios.get(`http://localhost:8000/api/artists/${ props.artist?.id }/top`).then(data => {
                setTopTracks(data?.data);
            }),
            axios.get(`http://localhost:8000/api/artists/${ props.artist?.id }/albums`).then(data => {
                setAlbums(data?.data);
            }),
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
        </PlayablePopup>
    );
}

export default ArtistPopup;
