import { useEffect, useState } from "react";

import useTitle from "hooks/useTitle";

import getNewReleases from "lib/getNewReleases";
import getRecommendedTracks from "lib/getRecommendedTracks";
import getRowLength from "utils/getRowLength";

import Block from "../../layout/Auth/Block/Block";
import BlockSection from "layout/Auth/Block/BlockSection";
import Page from "pages/Page";

const Discover = (props) => {
    const [title, setTitle] = useTitle("Discover");

    const [recTracks, setRecTracks] = useState([]);
    const [recArtists, setRecArtists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        fillData();
    }, []);

    const fillData = async () => {
        let rowLength = getRowLength();

        console.log(getRecommendedTracks(rowLength * 2));

        let calls = [
            getRecommendedTracks(setRecTracks, rowLength * 2),
            getNewReleases(setNewReleases, rowLength),
            //getRecommendedArtists(rowLength * 2),
        ];

        await Promise.all(calls);
    }

    return (
        <Page key = "discover" user = { props.user }>
            <Block label = "Recommended For You">
                <BlockSection 
                    playables = { recTracks }

                    numPlaceholders = { getRowLength() * 2 }
                />
            </Block>
            <Block label = "New Releases">
                <BlockSection 
                    playables = { newReleases }

                    numPlaceholders = { getRowLength() * 2 }
                />
            </Block>
        </Page>
    );
}

export default Discover;
