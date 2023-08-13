import { useEffect } from "react";
import useState from "react-usestateref";
import { Navigate, Route, Routes } from "react-router-dom";
import { Cookies, withCookies } from "react-cookie";

import { instanceOf } from 'prop-types';

import axios from 'axios';

import PageContext from "contexts/PageContext";

import Socket from 'utils/socket';

import Nav from "./Nav/Nav";

import NotificationContainer from "components/Notification/NotificationContainer";
import Callback from "pages/Callback/Callback";
import Player from "components/Player/Player";
import PopupContainer from "layout/Auth/PopupContainer/PopupContainer";

import Home from "pages/Home/Home";
import Search from "pages/Search/Search";
import Saved from "pages/Saved/Saved";
import Discover from "pages/Discover/Discover";
import Discussion from "pages/Discussion/Discussion";
import Profile from "pages/Profile/Profile";

import AuthCSS from "./Auth.module.css";
import NavCSS from "./Nav/Nav.module.css";

var interval = null;

const Auth = (props) => {
    const defaultPlayback = {
        socket: null,
        connected: false,
        devices: [],
        currentSong: {},
        currentDevice: {
            volume_percent: 0
        },
        songTimer: null,
        elapsedTime: '- : - -',
        totalTime: '- : - -',
        percentage: 0,
    };

    const [auth, setAuth] = useState(props.auth);
    const [user, setUser] = useState({});
    const [player, setPlayer] = useState(defaultPlayback);
    const [playback, setPlayback] = useState({});
    const [party, setParty, partyRef] = useState(defaultPlayback);
    const [popupContainer, setPopupContainer, popupContainerRef] = useState({
        elements: [],
        currentElementIndex: -1,
    });
    
    const [navCollapsed, setNavCollapsed] = useState(props.cookies.get("nav_collapsed") == "true");

    useEffect(() => {
        let token = props.cookies.get('auth_token');

        setHeaders(token);
        setToken(token);

        axios.get('http://localhost:8000/api/self/')
            .then(data => {
                let user = data.data.user;

                setUser(prevUser => ({
                    ...prevUser,
                    ...user
                }));
            })
            .catch(e => {
                e = e.toJSON();

                if (e.status == 401)
                    removeToken();
            });
    }, []);

    useEffect(() => {
        if ("socket" in user || !("username" in user)) return;

        let socketObj = new Socket(`ws://localhost:8000/ws/u/${ user.username }?token=${ auth.token }`, () => {
                        socketObj.send('get_state');
                    }, () => {}, onMessage);
        
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            socket: socketObj
        }));

        setUser(prevUser => ({
            ...prevUser,
            socket: socketObj
        }));

        // axios.get('http://localhost:8000/api/friends/').then(data => {
        //     this.setState({
        //         ...this.state,
        //         friends: data.data
        //     });
        // });
    }, [user]);

    useEffect(() => {
        startTimer(player.song?.duration_ms - playback.progress_ms, () => {

        });
    }, [playback]);

    // #region AUTH

    const setToken = (token) => {
        if (token == null)
            return;

        const { cookies } = props;
        cookies.set('auth_token', token, { path: '/', maxAge: 10 * 365 * 24 * 3600 });

        setAuth(prevAuth => ({
            ...prevAuth,
            token: token
        }));

        setHeaders(token);
    }
    const setHeaders = (token) => {
        axios.defaults.headers.common = {
            Authorization: 'Token ' + token
        };
    }
    const removeToken = () => {
        const { cookies } = props;
        cookies.remove('auth_token', { path: '/' });

        setAuth(prevAuth => ({
            ...prevAuth,
            token: null
        }));

        removeHeaders();
    }
    const removeHeaders = () => {
        axios.defaults.headers.common = {
            Authorization: null
        };
    }

    // #endregion

    // #region POPUP CONTAINER

    const openPopupContainer = (element, open=true) => {
        // console.log(`[CURRENT] currentElementIndex: ${popupContainerRef.current.currentElementIndex} \n[NEW]     currentElementIndex: ${popupContainerRef.current.currentElementIndex + 1}`);

        setPopupContainer(prevPopupContainer => ({
            ...prevPopupContainer,
            elements: prevPopupContainer.elements.slice(0, prevPopupContainer.currentElementIndex + 1).concat([element]),
            currentElementIndex: prevPopupContainer.currentElementIndex + 1,
            isOpen: open
        }));
    }
    const closePopupContainer = () => {
        // console.log(`[CURRENT] currentElementIndex: ${popupContainerRef.current.currentElementIndex} \n[NEW]     currentElementIndex: ${popupContainerRef.current.currentElementIndex - 1}`);

        setPopupContainer(prevPopupContainer => ({
            ...prevPopupContainer,
            elements: [],
            currentElementIndex: prevPopupContainer.currentElementIndex - 1,
            isOpen: false,
        }));
    }
    const updatePopupContainer = (element) => {
        if (popupContainer.element?.key == element.key)
            openPopupContainer(element, popupContainer.isOpen);
    }
    const previousPopup = () => {
        // console.log(`[CURRENT] currentElementIndex: ${popupContainerRef.current.currentElementIndex} \n[NEW]     currentElementIndex: ${Math.max(popupContainerRef.current.currentElementIndex - 1, 0)}`);

        setPopupContainer(prevPopupContainer => ({
            ...prevPopupContainer,
            currentElementIndex: Math.max(prevPopupContainer.currentElementIndex - 1, 0),
        }));
    }
    const nextPopup = () => {
        // console.log(`[CURRENT] currentElementIndex: ${popupContainerRef.current.currentElementIndex} \n[NEW]     currentElementIndex: ${Math.min(popupContainerRef.current.currentElementIndex + 1, popupContainerRef.current.elements.length - 1)}`);

        setPopupContainer(prevPopupContainer => ({
            ...prevPopupContainer,
            currentElementIndex: Math.min(prevPopupContainer.currentElementIndex + 1, prevPopupContainer.elements.length - 1),
        }));
    }

    // #endregion

    // #region SOCKET

    const getCurrentSocket = () => {
        // if (this.state.room?.socket?.connected)
        //     return this.state.room.socket;

        // console.log(party);
        // console.log(partyRef);

        if (party?.socket?.connected){
            console.log("Using party socket...");

            return party.socket;
        }
        
        console.log("Using user socket...");

        return player?.socket;
    }

    const onMessage = (message) => {
        let data = message.data;

        // console.log(data);

        if ("playback" in data)
            updatePlayback(data.playback);
        
        if ("party" in data)
            updateParty(data.party);
        
        if ("join_party" in data)
            connectToParty(data.join_party);
        
        if ("notification" in data)
            addNotification(data.notification);
    }

    // #endregion

    // #region UPDATES

    const updatePlayback = (updatedPlayback) => {
        var song;

        if (updatedPlayback.currently_playing_type == 'unknown'){
            setTimeout(() => { getUpdatedPlayback() }, 800);

            return;
        }
        
        song = updatedPlayback?.item;

        let i, artists = [];

        for (i = 0; i < song?.artists.length; i++){
            let artist = song.artists[i];
            artists.push(artist.name);
        }

        song = { 
            ...song,
            artists: artists.join(', ')
        };

        let percentage = updatedPlayback.progress_ms / song.duration_ms * 100;

        setPlayer(prevPlayer => ({
            ...prevPlayer,
            percentage: percentage,
            elapsed_time: secondsToClock(updatedPlayback.progress_ms / 1000).split('.')[0],
            total_time: secondsToClock(song.duration_ms / 1000).split('.')[0],
            song: song
        }));

        setPlayback(prevPlayback => ({
            ...prevPlayback,
            ...updatedPlayback
        }));        
    }
    const updateDevices = (message) => {
        var i, currentDevice = { volume_percent: 0 };

        for (i = 0; i < message.devices.length; i++){
            let device = message.devices[i];

            if (device.is_active){
                currentDevice = device;

                break;
            }
        }

        setPlayer(prevPlayer => ({
            ...prevPlayer,
            devices: message.devices,
            currentDevice: currentDevice
        }));
    }
    const updateParty = (updatedParty) => {
        setParty(prevParty => ({
            ...prevParty,
            ...updatedParty
        }));
    }
    const connectToParty = (newParty) => {
        let socketObj = new Socket(`ws://localhost:8000/ws/p/${ newParty.code }?token=${ auth.token }`, () => {
            setParty({
                ...newParty,
                socket: socketObj,
                connected: true
            });

            console.log("CONNECTED TO PARTY: ", newParty);

            // TODO: RETURN STATE WHEN CONNECTING TO PARTY
        }, () => {
            setParty(prevParty => ({
                ...prevParty,
                connected: false
            }));
        }, onMessage);

        setParty({
            ...newParty,
            socket: socketObj
        });
    }

    // #endregion

    // #region GETS

    const getUpdatedPlayback = () => {
        getCurrentSocket().send('get_state');
    }
    const getCurrentPlayingURI = () => {
        if (playback?.item?.uri == null)
            return '';
        
        return playback.item.uri;
    }
    const getCurrentlyPlayingContextURI = () => {
        if (playback?.context?.uri == null)
            return '';
        
        return playback.context.uri;
    }
    const getCurrentlyPlayingType = () => {
        if (playback?.item?.type == null)
            return '';
        
        return playback.item.type;
    }

    // #endregion

    // #region PLAY ACTIONS

    const play = () => {
        getCurrentSocket().send('play');

        setPlayback(prevPlayback => ({
            ...prevPlayback,
            is_playing: true
        }));
    }
    const pause = () => {
        getCurrentSocket().send('pause');

        setPlayback(prevPlayback => ({
            ...prevPlayback,
            is_playing: false
        }));
    }
    const playSong = (id) => {
        getCurrentSocket().send('play', {
            'id': id
        });
    }
    const playTrack = (trackUri="", contextUri="") => {
        console.log(`trackUri: ${trackUri}\ncontextUri: ${contextUri}`);

        getCurrentSocket().send('play_track', {
            "track_uri": trackUri,
            "context_uri": contextUri,
        });
    }
    const playContext = (contextUri, trackIndex = -1) => {
        getCurrentSocket().send('play_context', {
            "context_uri": contextUri,
            "track_index": trackIndex,
        });
    }
    const playPrevious = () => {
        getCurrentSocket().send('previous');
    }
    const playNext = () => {
        getCurrentSocket().send('next');
    }

    const addToQueue = (trackUri) => {
        getCurrentSocket().send('add_queue', {
            'track_uri': trackUri
        });
    }

    // #endregion

    // #region PLAYER ACTIONS

    const updateSongProgress = (percentage, mouseUp) => {
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            percentage: percentage
        }));

        if (mouseUp){
            getCurrentSocket().send('seek', {
                'progress_ms': Math.round(player.song.duration_ms * (percentage / 100))
            });
        }
    }
    const updateVolume = (percentage, mouseUp) => {
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            currentDevice: {
                ...prevPlayer.currentDevice,
                volume_percent: percentage
            }
        }));

        if (mouseUp){
            getCurrentSocket().send('select_volume', {
                'percentage': percentage
            });
        }
    }
    const refreshDevices = () => {
        player?.socket?.send('get_devices');
    }
    const selectDevice = (device) => {
        player?.socket?.send('select_device', {
            'device_id': device.id
        })
    }

    // #endregion

    // #region NOTIFICATIONS

    const addNotification = (notification) => {
        console.log(notification);

        setUser(prevUser => ({
            ...prevUser,
            notifications: [
                ...prevUser.notifications,
                notification
            ]
        }));
    }

    const acceptNotification = (notificationId) => {
        axios.put(`http://localhost:8000/api/notifications/${ notificationId }/`, null, {
            params: {
                action: "accept",
            }
        }).then(data => {
            if (!data.data.success) return;
            
            console.log(data.data?.party);

            let partyObj = data.data?.party;

            removeNotification(notificationId);
            
            connectToParty(partyObj);
        });
    }
    const ignoreNotification = (notificationId) => {
        axios.put(`http://localhost:8000/api/notifications/${ notificationId }/`, {
            action: "ignore"
        }).then(data => {
            if (!data.data.success) return;
            
            removeNotification(notificationId);
        });
    }
    const removeNotification = (notificationId) => {
        setUser(prevUser => ({
            ...prevUser,
            notifications: prevUser.notifications.filter(noti => noti.notification.id != notificationId)
        }));
    }
    const onPartyInvite = (userId) => {
        console.log("PARTY INVITE");

        axios.post("http://localhost:8000/api/notifications/", {
            userId: userId,
            type: "partyinvite",
            partyCode: partyRef.current?.code
        }).then(data => {
            if (!data.data.success) return;
            
            let partyObj = data.data.party;

            // removeNotification(notificationId);
            connectToParty(partyObj);
        });
    }

    // #endregion

    // #region UTILS

    const secondsToClock = (seconds) => {
        let hours = Math.floor(seconds / 3600), minutes = Math.floor((seconds - hours * 3600) / 60), clock = '';
        
        seconds %= 60;
        
        if (hours > 0)
            clock += hours + ':';
        
        if (hours > 0 || minutes > 0)
            clock += (minutes < 10 && hours > 0 ? '0' : '') + minutes + ':';
        
        clock = (hours == 0 && minutes == 0 ? ':' : '') + clock + (((minutes > 0 || hours > 0) && seconds < 10) || seconds < 10 ? '0' : '') + seconds;
        
        if (clock[0] == ':'){
            clock = '0' + clock;
        }
        
        return clock;
    }

    const startTimer = (milli, finished) => {
        let seconds = milli / 1000;
        
        window.clearInterval(interval);
        
        interval = window.setInterval(() => {
            if (playback.is_playing){
                seconds -= 1;
                milli -= 1000;

                let percentage = (1 - milli / player.song?.duration_ms) * 100;
                
                setPlayer(prevPlayer => ({
                    ...prevPlayer,
                    percentage: percentage,
                    elapsed_time: secondsToClock((prevPlayer.song?.duration_ms - milli) / 1000).split('.')[0]
                }));
            }
            
            if (seconds < 0){
                finished();
                
                getCurrentSocket().send('song_end');
                
                window.clearInterval(interval);
            }
        }, 1000);
    }

    const toggleNavCollapse = () => {
        const { cookies } = props;

        let prevCollapsed = cookies.get('nav_collapsed') == "true";
        let newCollapsed = !prevCollapsed;

        cookies.set('nav_collapsed', newCollapsed, { path: '/', maxAge: 10 * 365 * 24 * 3600 });

        setNavCollapsed(newCollapsed);
    }

    // #endregion

    return (
        <div id = { AuthCSS["authorized-app"] }>
            <Nav 
                user = { user }
                party = { party }
                friends = { user.friends }
                collapsed = { navCollapsed }

                onLogout = { props.onLogout }
                onToggleCollapse = { toggleNavCollapse }
                openPopupContainer = { openPopupContainer }
                updatePopupContainer = { updatePopupContainer }
                onNotificationAccept = { acceptNotification }
                onNotificationIgnore = { ignoreNotification }
                onPartyInvite = { onPartyInvite }

                closePopupContainer = { closePopupContainer }
            />

            <div id = { AuthCSS["main-content-wrapper"] } className = { navCollapsed != null && navCollapsed ? NavCSS["nav--collapsed"] : "" }>
                <PageContext.Provider value = {{
                    getCurrentlyPlayingType,
                    getCurrentPlayingURI,
                    getCurrentlyPlayingContextURI,
                    addToQueue,
                    playTrack,
                    playContext,
                    openPopupContainer,
                    closePopupContainer,
                    previousPopup,
                    nextPopup,
                }}>
                    <Routes>
                        <Route exact path = "/" element = { <Home user = { user } /> } />
                        <Route path = "/search" element = { <Search user = { user } /> } />
                        <Route path = "/saved" element = { <Saved user = { user } /> } />
                        <Route path = "/discover" element = { <Discover user = { user } /> } />
                        <Route path = "/discussion" element = { <Discussion user = { user } /> } />
                        <Route path = "/me" element = { <Profile user = { user } /> } />
                        <Route path = "/user/:username" element = { <Profile /> } />
                        <Route path = "/callback/" element = { <Callback /> } />
                        <Route path = "*" element = {<Navigate to = "/" />} />
                    </Routes>
                </PageContext.Provider>

                <NotificationContainer
                    notifications = { user?.notifications }

                    onNotificationAccept = { acceptNotification }
                    onNotificationIgnore = { ignoreNotification }
                />

                <Player 
                    playback = { playback } 
                    player = { player }
                    party = { party }

                    onPlay = { play }
                    onPause = { pause }
                    onPrevious = { playPrevious }
                    onNext = { playNext }
                    onRefreshDevices = { refreshDevices }
                    onDeviceSelect = { selectDevice }
                    onSongProgressUpdate = { updateSongProgress }
                    onVolumeUpdate = { updateVolume }

                    openPopupContainer = { openPopupContainer }
                    closePopupContainer = { closePopupContainer }
                />
            </div>
            <PopupContainer 
                container = { popupContainer } 
                onOpen = { openPopupContainer }
                onClose = { closePopupContainer } 
            />
        </div>
    );
}

Auth.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Auth);
