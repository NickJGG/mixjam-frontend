import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from 'axios';

import '../assets/css/auth/pages/room.css';

const Playlist = (props) => {
    const params = useParams();

    const [playlist, setPlaylist] = useState({});

    useEffect(() => {
        let code = params.code;

        axios.get(`http://localhost:8000/api/playlist/${ code }`)
            .then(data => {
                let playlist = data.data;

                setPlaylist(playlist);
            });
    }, []);

    return (
        <div id = "playlist" className = { cssContentContainer["content-container"] }>
            <p>{ playlist?.name }</p>
        </div>
    );
}

export default Playlist;