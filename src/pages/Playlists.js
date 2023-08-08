import { useEffect, useState } from "react";

import axios from 'axios';

import { Link } from "react-router-dom";
import Listing from "../components/listings/Listing";

const Playlists = (props) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        getPlaylists();
    }, []);
    
    const getPlaylists = () => {
        axios.get('http://localhost:8000/api/playlists/').then(newData => {
            setPlaylists(newData.data.items);

            console.log(newData.data.items);
        });
    }

    return (
        <div id = "playlists" className = { cssContentContainer["content-container"] }>
            <div className = "section">
                <p className = "section-label">Playlists</p>
                <div className = "section-body">
                    { playlists?.map(playlist => (
                        <div key = { playlist.id }>
                            <Link to = { `/p/${ playlist.id }` }>
                                <Listing 
                                    key = { playlist.id } 
                                    bodyElement = {(
                                        <div>
                                            <div className = "listing-image">
                                                <img src = { playlist.images[1].url } />
                                            </div>
                                            <div className = "listing-details">
                                                <p>{ playlist.name }</p>
                                            </div>
                                        </div>
                                    )} 
                                    classes = "playlist"
                                />
                            </Link>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}

export default Playlists;