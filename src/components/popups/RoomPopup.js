import { useEffect, useState } from "react";

import axios from "axios";

import Playlist from "../Playlist";
import { Link } from "react-router-dom";

const RoomPopup = (props) => {
    const [room, setRoom] = useState({});

    useEffect(() => {
        if (!props.room?.code)
            return;

        var newRoom = props.room;

        setRoom(newRoom);

        axios.get(`http://localhost:8000/api/room/playlist/${ props.room?.code }/`).then(data => {
            newRoom = {
                ...newRoom,
                ...data.data,
            };

            setRoom(newRoom);
        }).catch(e => {})
        .then(data => {
            
        });
    }, [props.room]);

    return (
        <div className = "popup-element">
            <div className = "room-header">
                <div className = "room-image">
                    <img src = { room?.playlist_image_url } />
                </div>
                <div className = "room-info">
                    <p className = "room-title">{ room?.title }</p>
                    <Link to = { `/r/${ room?.code }` } onClick = { props.onClose }>
                        <input type = "submit" value = "Join" />
                    </Link>
                </div>
            </div>
            <div className = "room-body">
                <Playlist playlist = { room } onDirectPlay = { props.onDirectPlay } />
            </div>
        </div>
    );
}

export default RoomPopup;