import { useEffect, useState } from "react";

import axios from 'axios';

import getRowLength from "utils/getRowLength";

import Block from "../layout/Block";
import PlayableListing from "../components/listings/PlayableListing";

import cssContentContainer from "../assets/css/auth/content-container.module.css";
import BlockSection from "layout/BlockSection";

const Discover = (props) => {
    const [recTracks, setRecTracks] = useState([]);
    const [recArtists, setRecArtists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        fillData();
    }, []);

    const fillData = async () => {
        let rowLength = getRowLength();

        let params = {
            params: {
                limit: rowLength
            }
        };

        let calls = [
            axios.get(`http://localhost:8000/api/recommendations/tracks/`, { params: { limit: rowLength * 2 } }).then(data => {
                setRecTracks(data?.data);
                console.log(data?.data)
            }),
            // axios.get(`http://localhost:8000/api/recommendations/artists/`, params).then(data => {
            //     setRecArtists(data?.data?.artists);
            // }),
            axios.get(`http://localhost:8000/api/releases/`, params).then(data => {
                setNewReleases(data?.data);
            })
        ];

        await Promise.all(calls);
    }

    return (
        <div id = "page--discover" className = { cssContentContainer["content-container"] }>
            <Block label = "Recommended For You">
                <BlockSection 
                    playables = { recTracks }

                    numPlaceholders = { getRowLength() * 2 }
                    currentlyPlayingURI = { props.currentlyPlayingURI() }
                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                    
                    onAddToQueue = { props.onAddToQueue }
                    onPlay = { props.onTrackPlay }
                    openPopupContainer = { props.openPopupContainer }
                    closePopupContainer = { props.closePopupContainer }
                />
            </Block>
            <Block label = "New Releases">
                <BlockSection 
                    playables = { newReleases }

                    numPlaceholders = { getRowLength() * 2 }
                    currentlyPlayingURI = { props.currentlyPlayingURI() }
                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                    
                    onAddToQueue = { props.onAddToQueue }
                    onPlay = { props.onTrackPlay }
                    openPopupContainer = { props.openPopupContainer }
                    closePopupContainer = { props.closePopupContainer }
                />
            </Block>
        </div>
    );
}

export default Discover;