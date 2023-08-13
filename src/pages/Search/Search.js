import { useEffect, useState } from "react";

import getRowLength from "utils/getRowLength";

import Page from "pages/Page";
import Block from "layout/Auth/Block/Block";
import BlockSection from "layout/Auth/Block/BlockSection";

import useTitle from "hooks/useTitle";
import getSearch from "lib/getSearch";
import cssFromArray from "utils/cssFromArray";

import SearchCSS from "./Search.module.css";
import SavedCSS from "pages/Saved/Saved.module.css";

const Search = (props) => {
    const [title, setTitle] = useTitle("Search");

    const [query, setQuery] = useState("");
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [types, setTypes] = useState([
        {
            name: "Tracks",
            selected: true,
            setState: setTracks,
        },
        {
            name: "Artists",
            selected: true,
            setState: setArtists,
        },
        {
            name: "Albums",
            selected: true,
            setState: setAlbums,
        },
        {
            name: "Playlists",
            selected: true,
            setState: setPlaylists,
        }
    ]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    useEffect(() => {
        setSelectedTypes(types?.filter(type => type.selected));
    }, [types]);

    useEffect(() => {
        if (query.length > 0)
            setTitle(query);
    }, [query]);

    const search = async () => {
        let rowLength = getRowLength(),
            call = getSearch(selectedTypes, rowLength, query);

        await Promise.all([call]);
    }

    const toggleTypeSelect = (typeName) => {
        let newTypes = types.map(type => type.name == typeName ? { ...type, selected: !type.selected } : type);

        setTypes(newTypes);
    }

    const typeNames = selectedTypes.map(type => type.name);

    return (
        <Page key = "search" user = { props.user }>
            <form method = "GET" action = "javascript:void(0);" onSubmit = { search }>
                <div id = { SearchCSS["search"] }>
                    <input 
                        id = { SearchCSS["search__input"] } 
                        placeholder = "Search by song, artist, album..." 
                        value = { query }

                        onChange = { (e) => {
                            setQuery(e.target.value)
                        } }
                    />
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
            </form>

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

export default Search;