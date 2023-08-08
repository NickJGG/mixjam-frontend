import { useEffect, useState } from "react";

import axios from 'axios';

import getRowLength from "utils/getRowLength";

import Block from "../layout/Block";
import PlayableListing from "../components/listings/PlayableListing";

import "../assets/css/auth/pages/search.css";
import cssContentContainer from "../assets/css/auth/content-container.module.css";
import cssBlock from "../assets/css/auth/block.module.css";
import cssFromArray from "utils/cssFromArray";

const Search = (props) => {
    const [query, setQuery] = useState("");
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [types, setTypes] = useState([
        {
            name: "Tracks",
            selected: true
        },
        {
            name: "Artists",
            selected: true
        },
        {
            name: "Albums",
            selected: true
        },
        {
            name: "Playlists",
            selected: true
        }
    ]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    useEffect(() => {
        setSelectedTypes(types?.filter(type => type.selected));
    }, [types]);

    const getBlocks = () => {
        let blocks = [
            {
                key: "placeholder",
                classes: cssBlock["block--hidden"],
                sections: [
                    {
                        key: "placeholderSection",
                        listings: []
                    }
                ]
            }
        ];

        let typeNames = selectedTypes.map(type => type.name);

        if (typeNames.includes("Tracks") && tracks?.length > 0)
            blocks.push({
                key: "search__tracks",
                label: "Tracks",
                sections: [
                    {
                        key: "search__tracks__section",
                        listings: tracks?.map(track => (
                            <PlayableListing 
                                key = { track.id }
                                playable = {{
                                    name: track.name,
                                    uri: track.uri,
                                    id: track.id,
                                    artists: track.album.artists,
                                    images: track.album.images,
                                    liked: track.is_liked
                                }}
                                currentlyPlayingURI = { props.currentlyPlayingURI() }
                                currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                                onPlay = { props.onTrackPlay }
                                openPopupContainer = { props.openPopupContainer }
                            />
                        ))
                    }
                ]
            });
        
        if (typeNames.includes("Artists") && artists?.length > 0)
            blocks.push({
                key: "search__artists",
                label: "Artists",
                sections: [
                    {
                        key: "search__artists__section",
                        listings: artists?.map(artist => (
                            <PlayableListing 
                                key = { artist.id }
                                playable = {{
                                    name: artist.name,
                                    uri: artist.uri,
                                    id: artist.id,
                                    images: artist.images,
                                    liked: artist.is_liked
                                }}
                                currentlyPlayingURI = { props.currentlyPlayingURI() }
                                currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                                onPlay = { props.onContextPlay }
                                openPopupContainer = { props.openPopupContainer }
                            />
                        ))
                    }
                ]
            });
        
        if (typeNames.includes("Albums") && albums?.length > 0)
            blocks.push({
                key: "search__albums",
                label: "Albums",
                sections: [
                    {
                        key: "search__albums__section",
                        listings: albums?.map(album => (
                            <PlayableListing 
                                key = { album.id }
                                playable = {{
                                    name: album.name,
                                    uri: album.uri,
                                    id: album.id,
                                    artists: album.artists,
                                    images: album.images,
                                    liked: album.is_liked
                                }}
                                currentlyPlayingURI = { props.currentlyPlayingURI() }
                                currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                                onPlay = { props.onContextPlay }
                                openPopupContainer = { props.openPopupContainer }
                            />
                        ))
                    }
                ]
            });
        
        if (typeNames.includes("Playlists") && playlists?.length > 0)
            blocks.push({
                key: "search__playlists",
                label: "Playlists",
                sections: [
                    {
                        key: "search__playlists__section",
                        listings: playlists?.map(playlist => (
                            <PlayableListing 
                                key = { playlist.id }
                                playable = {{
                                    name: playlist.name,
                                    uri: playlist.uri,
                                    id: playlist.id,
                                    images: playlist.images,
                                    liked: playlist.is_liked
                                }}
                                currentlyPlayingURI = { props.currentlyPlayingURI() }
                                currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                                onPlay = { props.onContextPlay }
                                openPopupContainer = { props.openPopupContainer }
                            />
                        ))
                    }
                ]
            });

        return blocks;
    }

    const search = async () => {
        let rowLength = getRowLength();

        let call = axios.get(`http://localhost:8000/api/search/`,
            {
                params: {
                    "query": query,
                    "limit": rowLength,
                    "type": selectedTypes.map(type => type.name.toLowerCase().slice(0, -1)).join(",")
                }
            }
        ).then(data => {
            setTracks(data.data?.tracks);
            setArtists(data.data?.artists);
            setAlbums(data.data?.albums);
            setPlaylists(data.data?.playlists);
        });

        await Promise.all([call]);
    }

    const toggleTypeSelect = (typeName) => {
        let newTypes = types.map(type => type.name == typeName ? { ...type, selected: !type.selected } : type);

        setTypes(newTypes);
    }

    return (
        <div id = "page--search" className = { cssContentContainer["content-container"] }>
            <form method = "GET" action = "javascript:void(0);" onSubmit = { search }>
                <div id = "search">
                    {/* <LayoutButton 
                        button = {{
                            name: "Options",
                            defaultImagePath: imgFilter
                        }}
                    /> */}
                    <input 
                        id = "search__input" 
                        placeholder = "Search by song, artist, album..." 
                        value = { query }

                        onChange = { (e) => {
                            setQuery(e.target.value)
                        } }
                    />
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
            </form>

            { getBlocks().map(block => {
                return (<Block
                    key = { block.key }
                    block = { block }
                    currentlyPlayingURI = { props.currentlyPlayingURI() }
                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI() }
                />);
            }) }
        </div>
    );
}

export default Search;