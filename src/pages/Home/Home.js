import { useContext, useEffect, useState } from "react";

import getRecentTracks from "lib/getRecentTracks";
import getTopTracks from "lib/getTopTracks";
import getTopArtists from "lib/getTopArtists";
import getRowLength from "utils/getRowLength";

import Page from "pages/Page";
import Block from "layout/Auth/Block/Block";
import BlockSection from "layout/Auth/Block/BlockSection";

import BlockCSS from "layout/Auth/Block/Block.module.css";
import useTitle from "hooks/useTitle";

const Home = (props) => {
    const [title, setTitle] = useTitle("Home");

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
            getRecentTracks(setRecentTracks, rowLength),
            getTopTracks(setTopTracks, rowLength),
            getTopArtists(setTopArtists, rowLength),
        ];

        await Promise.all(calls);
    }

    return (
        <Page key = "home" user = { props.user }>
            <Block classes = { BlockCSS["block--hidden"] }>
                <BlockSection />
            </Block>
            <Block label = "Jump Back In">
                <BlockSection 
                    playables = { recentTracks }

                    numPlaceholders = { getRowLength() * 2 }
                />
            </Block>
            <Block label = "Your Top Tracks">
                <BlockSection 
                    playables = { topTracks }

                    numPlaceholders = { getRowLength() * 2 }
                />
            </Block>
            <Block label = "Your Top Artists">
                <BlockSection 
                    playables = { topArtists }

                    numPlaceholders = { getRowLength() * 2 }
                />
            </Block>
        </Page>
    );
}

export default Home;
