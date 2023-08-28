import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axios from 'axios';

import useTitle from "hooks/useTitle";
import getRowLength from "utils/getRowLength";
import cssFromArray from "utils/cssFromArray";

import Page from "pages/Page";
import Block from "layout/Auth/Block/Block";
import BlockSection from "layout/Auth/Block/BlockSection";

import BlockCSS from "layout/Auth/Block/Block.module.css";

const Playlists = (props) => {
    const [title, setTitle] = useTitle("Saved Playlists");

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fillData();
    }, []);

    const fillData = async () => {
        let rowLength = getRowLength();

        let calls = [
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/saved/`,
                {
                    params: {
                        "type": "playlists",
                        "limit": 50,
                    }
                }
            ).then(data => {
                setPlaylists(data.data);
            })
        ];

        await Promise.all(calls);
    }

    return (
        <Page key = "saved" user = { props.user }>
            <Block classes = { BlockCSS["block--hidden"] }>
                <BlockSection />
            </Block>

            <Block label = "Saved Playlists">
                <BlockSection playables = { playlists } numPlaceholders = { getRowLength() } />
            </Block>
        </Page>
    );
}

export default Playlists;
