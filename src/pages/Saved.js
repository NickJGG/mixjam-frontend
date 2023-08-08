import { useEffect, useState } from "react";

import axios from 'axios';

import getRowLength from "utils/getRowLength";

import Block from "../layout/Block";
import BlockSection from "../layout/BlockSection";
import PlayableListing from "../components/listings/PlayableListing";
import { useLocation } from "react-router-dom";

import cssContentContainer from "../assets/css/auth/content-container.module.css";
import cssBlock from "../assets/css/auth/block.module.css";
import cssFromArray from "utils/cssFromArray";

const Saved = (props) => {
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
                // switch(requestTypes[i]){
                //     case "tracks":
                //         setTracks(data.data);
                //         break;
                //     case "playlists":
                //         setPlaylists(data.data);
                //         break;
                //     case "artists":
                //         setArtists(data.data);
                //         break;
                //     case "albums":
                //         setAlbums(data.data);
                //         break;
                //     default:
                //         break;
                // }
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
        <div id = "page--saved" className = { cssContentContainer["content-container"] }>
            <div className = { cssContentContainer["content-container__header"] }>
                <div className = { cssContentContainer["filter__group__collection"] }>
                    <div className = { cssContentContainer["filter__group" ] }>
                        { types.map(type => (
                            <div 
                                className = { cssFromArray([
                                    cssContentContainer["filter"],
                                    type.selected ? cssContentContainer["filter--selected"] : ""
                                ]) }
                                onClick = { () => toggleTypeSelect(type.name) }
                            >
                                <p>{ type.name }</p>
                            </div>
                        )) }
                    </div>
                </div>
            </div>

            <Block classes = { cssBlock["block--hidden"] }>
                <BlockSection />
            </Block>

            {
                typeNames.includes("Tracks") && tracks?.length > 0
                ? <Block label = "Tracks">
                    <BlockSection numPlaceholders = { getRowLength() * 2 }>
                        { 
                            tracks?.map(track => (
                                <PlayableListing 
                                    key = { track.id }
                                    playable = {{
                                        name: track.name,
                                        uri: track.uri,
                                        id: track.id,
                                        artists: track.album.artists,
                                        images: track.album.images,
                                        liked: true,
                                        type: "track",
                                    }}
                                    currentlyPlayingURI = { props.currentlyPlayingURI() }
                                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                                    onPlay = { props.onTrackPlay }
                                    openPopupContainer = { props.openPopupContainer }
                                />
                            ))
                        }
                    </BlockSection>
                </Block>
                : <></>
            }

            {
                typeNames.includes("Artists") && tracks?.length > 0
                ? <Block label = "Artists">
                    <BlockSection numPlaceholders = { getRowLength() * 2 }>
                        { 
                            artists?.map(artist => (
                                <PlayableListing 
                                    key = { artist.id }
                                    playable = {{
                                        name: artist.name,
                                        uri: artist.uri,
                                        id: artist.id,
                                        images: artist.images,
                                        liked: true,
                                        type: "artist",
                                    }}
                                    currentlyPlayingURI = { props.currentlyPlayingURI() }
                                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                                    onPlay = { props.onContextPlay }
                                    openPopupContainer = { props.openPopupContainer }
                                />
                            ))
                        }
                    </BlockSection>
                </Block>
                : <></>
            }

            {
                typeNames.includes("Albums") && tracks?.length > 0
                ? <Block label = "Albums">
                    <BlockSection numPlaceholders = { getRowLength() * 2 }>
                        { 
                            albums?.map(album => (
                                <PlayableListing 
                                    key = { album.id }
                                    playable = {{
                                        name: album.name,
                                        uri: album.uri,
                                        id: album.id,
                                        artists: album.artists,
                                        images: album.images,
                                        liked: true,
                                        type: "album",
                                    }}
                                    currentlyPlayingURI = { props.currentlyPlayingURI() }
                                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                                    onPlay = { props.onContextPlay }
                                    openPopupContainer = { props.openPopupContainer }
                                />
                            ))
                        }
                    </BlockSection>
                </Block>
                : <></>
            }

            {
                typeNames.includes("Playlists") && tracks?.length > 0
                ? <Block label = "Playlists">
                    <BlockSection numPlaceholders = { getRowLength() * 2 }>
                        { 
                            playlists?.map(playlist => (
                                <PlayableListing 
                                    key = { playlist.id }
                                    playable = {{
                                        name: playlist.name,
                                        uri: playlist.uri,
                                        id: playlist.id,
                                        images: playlist.images,
                                        liked: true,
                                        type: "playlist",
                                    }}
                                    currentlyPlayingURI = { props.currentlyPlayingURI() }
                                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                                    onPlay = { props.onContextPlay }
                                    openPopupContainer = { props.openPopupContainer }
                                />
                            ))
                        }
                    </BlockSection>
                </Block>
                : <></>
            }
        </div>
    );
}

export default Saved;