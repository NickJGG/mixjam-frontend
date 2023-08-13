import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axios from 'axios';

import useTitle from "hooks/useTitle";
import getRowLength from "utils/getRowLength";
import cssFromArray from "utils/cssFromArray";

import Page from "pages/Page";
import Block from "layout/Auth/Block/Block";
import BlockSection from "layout/Auth/Block/BlockSection";

import SavedCSS from "./Saved.module.css";
import BlockCSS from "layout/Auth/Block/Block.module.css";

const Saved = (props) => {
    const [title, setTitle] = useTitle("Saved");

    const location = useLocation();

    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [types, setTypes] = useState([
        {
            name: "Tracks",
            selected: !location.state || location.state.type == "songs"
        },
        {
            name: "Artists",
            selected: !location.state || location.state.type == "artists"
        },
        {
            name: "Albums",
            selected: !location.state || location.state.type == "albums"
        },
        {
            name: "Playlists",
            selected: !location.state || location.state.type == "playlists"
        }
    ]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    useEffect(() => {
        fillData();
    }, [selectedTypes]);

    useEffect(() => {
        setSelectedTypes(types?.filter(type => type.selected));
    }, [types]);

    // const fillData = async () => {
    //     let params = {
    //         "limit": getRowLength()
    //     };

    //     let calls = [
    //         axios.get(`http://localhost:8000/api/saved/`, { params: { "type": "tracks", ...params } }).then(data => {
    //             // console.log(data.data.items);
    //             setTracks(data?.data.items.map(item => {
    //                 return {
    //                     ...item["track"],
    //                     "is_liked": true
    //                 }
    //             }));
    //         }),
    //         // axios.get(`http://localhost:8000/api/saved/`, { params: { "type": "artists" } }).then(data => {
    //         //     setArtists(data?.data?.artists);
    //         // }),
    //         axios.get(`http://localhost:8000/api/saved/`, { params: { "type": "albums", ...params } }).then(data => {
    //             setAlbums(data?.data.items.map(item => {
    //                 return {
    //                     ...item["album"],
    //                     "is_liked": true
    //                 }
    //             }));
    //         }),
    //         // axios.get(`http://localhost:8000/api/saved/`, { params: { "type": "playlists" } }).then(data => {
    //         //     setArtists(data?.data?.playlists);
    //         // })
    //     ];

    //     await Promise.all(calls);
    // }

    const getRequestTypes = () => {
        let mapping = {
            "tracks": tracks,
            "playlists": playlists,
            "artists": artists,
            "albums": albums
        };

        let mappedNames = selectedTypes.map(type => type.name.toLowerCase()),
            filteredNames = mappedNames.filter(name => mapping[name].length == 0);

        return filteredNames;
    }   

    const fillData = async () => {
        let calls = [],
            rowLength = getRowLength(),
            requestTypes = getRequestTypes();
        
        if (requestTypes?.length == 0) return;
        
        let mapping = {
            "tracks": setTracks,
            "playlists": setPlaylists,
            "artists": setArtists,
            "albums": setAlbums
        };

        for(let i = 0; i < requestTypes.length; i++){
            calls.push(axios.get(`http://localhost:8000/api/saved/`,
                {
                    params: {
                        "type": requestTypes[i],
                        "limit": rowLength
                    }
                }
            ).then(data => {
                mapping[requestTypes[i]](data.data);
            }));
        }

        await Promise.all(calls);
    }

    const toggleTypeSelect = (typeName) => {
        let newTypes = types.map(type => type.name == typeName ? { ...type, selected: !type.selected } : type);

        setTypes(newTypes);
    }

    const typeNames = selectedTypes.map(type => type.name);

    return (
        <Page key = "saved" user = { props.user }>
            <div className = { SavedCSS["saved__header"] }>
                <div className = { SavedCSS["filter__group__collection"] }>
                    <div className = { SavedCSS["filter__group" ] }>
                        { types.map(type => (
                            <div 
                                className = { cssFromArray([
                                    SavedCSS["filter"],
                                    type.selected ? SavedCSS["filter--selected"] : ""
                                ]) }
                                onClick = { () => toggleTypeSelect(type.name) }
                            >
                                <p>{ type.name }</p>
                            </div>
                        )) }
                    </div>
                </div>
            </div>

            <Block classes = { BlockCSS["block--hidden"] }>
                <BlockSection />
            </Block>

            {
                typeNames.includes("Tracks") && tracks?.length > 0
                ? <Block label = "Tracks">
                    <BlockSection playables = { tracks } numPlaceholders = { getRowLength() } />
                </Block>
                : <></>
            }

            {
                typeNames.includes("Artists") && tracks?.length > 0
                ? <Block label = "Artists">
                    <BlockSection playables = { artists } numPlaceholders = { getRowLength() } />
                </Block>
                : <></>
            }

            {
                typeNames.includes("Albums") && tracks?.length > 0
                ? <Block label = "Albums">
                    <BlockSection playables = { albums } numPlaceholders = { getRowLength() } />
                </Block>
                : <></>
            }

            {
                typeNames.includes("Playlists") && tracks?.length > 0
                ? <Block label = "Playlists">
                    <BlockSection playables = { playlists } numPlaceholders = { getRowLength() } />
                </Block>
                : <></>
            }
        </Page>
    );
}

export default Saved;