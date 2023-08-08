import { useEffect, useState } from "react";

import axios from 'axios';

import getRowLength from "utils/getRowLength";

import Block from "../layout/Block";
import BlockSection from "../layout/BlockSection";
import PlayableListing from "../components/listings/PlayableListing";

import '../assets/css/auth/pages/home.css';
import cssContentContainer from "../assets/css/auth/content-container.module.css";
import cssBlock from "../assets/css/auth/block.module.css";

const Home = (props) => {
    const [recentTracks, setRecentTracks] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);

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
            axios.get(`http://localhost:8000/api/recent/tracks/`, params).then(data => {
                setRecentTracks(data.data);
            }),
            axios.get(`http://localhost:8000/api/top/tracks/`, params).then(data => {
                setTopTracks(data.data);
            }),
            axios.get(`http://localhost:8000/api/top/artists/`, params).then(data => {
                setTopArtists(data.data);
            })
        ];

        await Promise.all(calls);
    }

    return (
        <div id = "page--home" className = { cssContentContainer["content-container"] }>
            <Block classes = { cssBlock["block--hidden"] }>
                <BlockSection />
            </Block>
            <Block label = "Jump Back In">
                <BlockSection 
                    playables = { recentTracks }

                    numPlaceholders = { getRowLength() * 2 }
                    currentlyPlayingURI = { props.currentlyPlayingURI() }
                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                    
                    onAddToQueue = { props.onAddToQueue }
                    onPlay = { props.onTrackPlay }
                    openPopupContainer = { props.openPopupContainer }
                    closePopupContainer = { props.closePopupContainer }
                />
            </Block>
            <Block label = "Your Top Tracks">
                <BlockSection 
                    playables = { topTracks }

                    numPlaceholders = { getRowLength() * 2 }
                    currentlyPlayingURI = { props.currentlyPlayingURI() }
                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                    
                    onAddToQueue = { props.onAddToQueue }
                    onPlay = { props.onTrackPlay }
                    openPopupContainer = { props.openPopupContainer }
                    closePopupContainer = { props.closePopupContainer }
                />
            </Block>
            <Block label = "Your Top Artists">
                <BlockSection 
                    playables = { topArtists }

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

export default Home;