import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from 'axios';

import '../assets/css/auth/pages/room.css';

import _ from 'lodash';
import Playlist from "../components/Playlist";
import ProfilePicture from "../components/ProfilePicture";

import imgCrown from '../assets/img/icons/crown-white-88.png';

const Room = (props) => {
    const params = useParams();

    useEffect(() => {
        let code = params.code;

        if (props.room?.data?.code != code)
            axios.get(`http://localhost:8000/api/room/${ code }`)
                .then(data => {
                    let room = data.data;

                    props.onConnect(room);
                });
    }, []);

    return (
        <div id = "room" className = { cssContentContainer["content-container"] }>
            <div id = "room-info-container">
                <div id = "room-details">
                    <div id = "room-cover">
                        <img src = { props.room?.data?.playlist_image_url } />
                    </div>
                    <p id = "room-title">{ props.room?.data?.title }</p>
                    <div id = "room-creator">
                        <img className = "label-image" src = { imgCrown } />
                        
                        <ProfilePicture user = { props.room?.data?.creator } onClick = { () => props.onSelectUser(props.room?.data?.creator) } />
                        
                        <p id = "creator-username">{ props.room?.data?.creator?.username }</p>
                    </div>
                </div>
                <div className = "info-section">
                    <div className = "section-header">
                        <p className = "section-title">Listeners • { props.room?.listeners.length }</p>
                        <div className = "section-actions">
                            <p className = "section-action">See All</p>
                        </div>
                    </div>
                    <div className = "section-body">
                        <div id = "listener-list">
                            { props.room?.listeners.map(listener => (
                                <div key = { listener.id } className = "room-listener">
                                    <ProfilePicture user = { listener } width = "100%" height = "100%" onClick = { () => props.onSelectUser(props.room?.data?.creator) } />
                                </div>
                            )) }
                        </div>
                    </div>
                </div>
            </div>
            <div id = "playlist-container">
                <Playlist playlist = { props.room?.playlist } currentSong = { props.room?.currentSong } onDirectPlay = { props.onDirectPlay } />
            </div>
            <div id = "social-container">

            </div>
        </div>
    );
}

function areEqual(prevProps, nextProps){
    let equals = _.isEqual(prevProps, nextProps);

    //console.log(equals, _.reduce(prevProps, (result, value, key) => _.isEqual(value, nextProps[key]) ? result : result.concat(key), []));

    return equals;
}

export default React.memo(Room, areEqual);