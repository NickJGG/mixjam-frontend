// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Navigate } from 'react-router';
// import React from 'react';
// import { withCookies, Cookies } from 'react-cookie';

// import { instanceOf } from 'prop-types';

// import axios from 'axios';

// import Socket from '../utils/socket.js';

// import '../assets/css/index.css';
// import '../assets/css/auth/base.css';

// import Home from './Home';
// import Party from './Party.js';
// import Discover from './Discover.js';
// import Discussion from './Discussion.js';

// import Nav from '../layout/Nav';

// import Callback from '../components/Callback';
// import Player from '../components/Player';
// import PopupContainer from '../features/popups/components/PopupContainer.js';
// import Friends from './Friends.js';
// import Search from './Search.js';
// import Profile from './Profile.js';
// import Settings from './Settings.js';
// import Notifications from './Notifications.js';
// import Saved from './Saved.js';
// import NotificationContainer from '../components/notifications/NotificationContainer.js';

// class Authorized extends React.Component {
//     static propTypes = {
//         cookies: instanceOf(Cookies).isRequired
//     }

//     constructor(props){
//         super(props);

//         const { cookies } = props;

//         this.state = {
//             auth: {
//                 ...this.props.auth
//             },
//             room: {
//                 connected: false,
//                 socket: null,
//                 playlist: {},
//                 currentSong: {},
//                 listeners: []
//             },
//             player: {
//                 socket: null,
//                 connected: false,
//                 devices: [],
//                 currentSong: {},
//                 currentDevice: {
//                     volume_percent: 0
//                 },
//                 songTimer: null,
//                 elapsedTime: '- : - -',
//                 totalTime: '- : - -',
//                 percentage: 0,
//             },
//             playback: {},
//             party: {
//                 ...this.props.party,
//                 elementOpen: false,
//                 socket: null,
//                 connection: false,
//                 users: []
//             },
//             popupContainer: {

//             },
//             navCollapsed: cookies.get("nav_collapsed") == "true"
//         };

//         this.setToken = this.setToken.bind(this);
//         this.removeToken = this.removeToken.bind(this);

//         this.getUpdatedPlayback = this.getUpdatedPlayback.bind(this);

//         this.onMessage = this.onMessage.bind(this);
//         this.onPlaySong = this.onPlaySong.bind(this);
//         this.onDirectPlay = this.onDirectPlay.bind(this);
//         this.onTrackPlay = this.onTrackPlay.bind(this);
//         this.onContextPlay = this.onContextPlay.bind(this);
//         this.onPrevious = this.onPrevious.bind(this);
//         this.onPlay = this.onPlay.bind(this);
//         this.onPause = this.onPause.bind(this);
//         this.onNext = this.onNext.bind(this);
//         this.onSongProgressUpdate = this.onSongProgressUpdate.bind(this);
//         this.onVolumeUpdate = this.onVolumeUpdate.bind(this);
//         this.onRefreshDevices = this.onRefreshDevices.bind(this);
//         this.onDeviceSelect = this.onDeviceSelect.bind(this);
//         this.onSelectRoom = this.onSelectRoom.bind(this);
//         this.onSelectUser = this.onSelectUser.bind(this);
//         this.onPartyElementToggle = this.onPartyElementToggle.bind(this);
        
//         this.onNotificationAccept = this.onNotificationAccept.bind(this);
//         this.onNotificationIgnore = this.onNotificationIgnore.bind(this);

//         this.onToggleCollapse = this.onToggleCollapse.bind(this);

//         this.removeNotification = this.removeNotification.bind(this);

//         this.connectToRoom = this.connectToRoom.bind(this);
//         this.startTimer = this.startTimer.bind(this);
//         this.setConnected = this.setConnected.bind(this);
//         this.openPopupContainer = this.openPopupContainer.bind(this);
//         this.closePopupContainer = this.closePopupContainer.bind(this);
//         this.updatePopupContainer = this.updatePopupContainer.bind(this);
//         this.getCurrentSocket = this.getCurrentSocket.bind(this);

//         this.getCurrentPlayingURI = this.getCurrentPlayingURI.bind(this);
//         this.getCurrentlyPlayingType = this.getCurrentlyPlayingType.bind(this);
//         this.getCurrentlyPlayingContextURI = this.getCurrentlyPlayingContextURI.bind(this);

//         this.updateConnection = this.updateConnection.bind(this);
//         this.updateRoom = this.updateRoom.bind(this);
//         this.updatePlayback = this.updatePlayback.bind(this);
//         this.updateDevices = this.updateDevices.bind(this);
//     }
    
//     componentDidUpdate(prevProps){
//         if (this.props.auth?.user?.id == prevProps.auth?.user?.id){
//             return;
//         }

        
//     }
//     componentWillReceiveProps(nextProps){

//     }
//     componentWillUnmount(){
//         this.state.party?.socket?.close();
//         this.state.player?.socket?.close();
//         clearInterval(this.state.player?.songTimer);
//     }
//     componentDidMount(){
//         const { cookies } = this.props,
//         token = cookies.get('auth_token');

//         this.setHeaders(token);
//         this.setToken(token);

//         axios.get('http://localhost:8000/api/user/')
//             .then(data => {
//                 console.log(data);

//                 let user = data.data;

//                 this.setState({
//                     ...this.state,
//                     auth: {
//                         ...this.state.auth,
//                         user: user
//                     }
//                 }, () => {
//                     let socketObj = new Socket(`ws://localhost:8000/ws/u/${ user.username }?token=${ token }`, () => {
//                         socketObj.send('get_state');
//                     }, () => {}, this.onMessage);

//                     this.setState({
//                         player: {
//                             ...this.state.player,
//                             socket: socketObj
//                         }
//                     });

//                     axios.get('http://localhost:8000/api/friends/').then(data => {
//                         this.setState({
//                             ...this.state,
//                             friends: data.data
//                         });
//                     });
//                 });
//             })
//             .catch(e => {
//                 console.log(e);
//                 e = e.toJSON();

//                 if (e.status == 401)
//                     this.removeToken();
//             });
//     }

//     setToken(token){
//         if (token == null)
//             return;

//         const { cookies } = this.props;
//         cookies.set('auth_token', token, { path: '/', maxAge: 10 * 365 * 24 * 3600 });

//         this.setState({ 
//             ...this.state,
//             auth: { 
//                 ...this.state.auth,
//                 token: token 
//             } 
//         });

//         this.setHeaders(token);
//     }
//     setHeaders(token){
//         axios.defaults.headers.common = {
//             Authorization: 'Token ' + token
//         };
//     }
//     removeToken(){
//         const { cookies } = this.props;
//         cookies.remove('auth_token', { path: '/' });

//         this.setState({ 
//             ...this.state,
//             auth: { 
//                 ...this.state.auth,
//                 token: null 
//             } 
//         });

//         axios.defaults.headers.common = {
//             Authorization: null
//         };
//     }

//     connectToRoom(roomData){
//         let socketObj = new Socket(`ws://localhost:8000/ws/r/${ roomData.code }?token=${ this.props.auth.token }`, () => {}, () => {}, this.onMessage);
        
//         this.setState({
//             room: {
//                 ...this.state.room,
//                 data: {
//                     ...this.state.room.data,
//                     ...roomData
//                 },
//                 socket: socketObj
//             }
//         });
//     }
//     setConnected(connected){
//         this.setState({
//             room: {
//                 ...this.state.room,
//                 connected: connected,
//             }
//         });
//     }
//     openPopupContainer(element, open=true){
//         this.setState({
//             popupContainer: {
//                 ...this.state.popupContainer,
//                 isOpen: open,
//                 element: element
//             }
//         });
//     }
//     closePopupContainer(){
//         this.setState({
//             popupContainer: {
//                 ...this.state.popupContainer,
//                 isOpen: false
//             }
//         });
//     }
//     updatePopupContainer(element){
//         if (this.state.popupContainer.element?.key == element.key)
//             this.openPopupContainer(element, this.state.popupContainer.isOpen);
//     }

//     getCurrentSocket(){
//         // if (this.state.room?.socket?.connected)
//         //     return this.state.room.socket;

//         if (this.state.party?.socket?.connected)
//             return this.state.party.socket;

//         return this.state.player?.socket;
//     }

//     onMessage(message){
//         // console.log(this.state);
//         let data = message.data;

//         if ("playback" in data)
//             this.updatePlayback(data.playback);
        
//         if ("party" in data)
//             this.updateParty(data.party);
        
//         if ("join_party" in data)
//             this.connectToParty(data.join_party);

//         // switch(message.type){
//         //     case 'connection':
//         //         this.updateConnection(message.response_data.data.connection_state);

//         //         break;
//         //     case 'playlist':
//         //         this.updateRoom(message.response_data);

//         //         break;
//         //     case 'playback':
//         //         this.updatePlayback(message.response_data.playback);

//         //         break;
//         //     case 'devices':
//         //         this.updateDevices(message.response_data);

//         //         break;
//         //     default:
//         //         break;
//         // }
//     }

//     getUpdatedPlayback(){
//         this.getCurrentSocket().send('get_state');
//     }
//     getCurrentPlayingURI(){
//         if (this.state.playback?.item?.uri == null)
//             return '';
        
//         return this.state.playback.item.uri;
//     }
//     getCurrentlyPlayingContextURI(){
//         if (this.state.playback?.context?.uri == null)
//             return '';
        
//         return this.state.playback.context.uri;
//     }
//     getCurrentlyPlayingType(){
//         if (this.state.playback?.item?.type == null)
//             return '';
        
//         return this.state.playback.item.type;
//     }

//     updateConnection(connection){
//         console.log(connection);

//         if (connection.connection_type == 'join'){
//             this.setState({
//                 room: {
//                     ...this.state.room,
//                     listeners: [
//                         ...this.state.room.listeners,
//                         connection.user
//                     ]
//                 }
//             });
//         }
//     }
//     updateRoom(message){
//         let newPlayback = {
//             ...this.state.playback,
//             ...message.playback
//         };

//         this.updatePlayback(newPlayback, message.playlist);
//     }
//     updatePlayback(playback, playlist = this.state.room?.playlist){
//         var song;

//         if (playback.currently_playing_type == 'unknown'){
//             setTimeout(() => { this.getUpdatedPlayback(); }, 800);

//             return;
//         }

//         if (this.state.room?.socket?.connected)
//             song = playlist?.tracks?.items[playback.song_index].track;
//         else
//             song = playback?.item;

//         let i, artists = [];

//         for (i = 0; i < song?.artists.length; i++){
//             let artist = song.artists[i];
//             artists.push(artist.name);
//         }

//         song = { 
//             ...song,
//             artists: artists.join(', ')
//         };

//         let percentage = playback.progress_ms / song.duration_ms * 100;

//         this.setState({
//             room: {
//                 ...this.state.room,
//                 playlist: playlist,
//                 currentSong: {
//                     ...song
//                 }
//             },
//             playback: {
//                 ...this.state.playback,
//                 ...playback
//             },
//             player: {
//                 ...this.state.player,
//                 percentage: percentage,
//                 elapsed_time: this.secondsToClock(playback.progress_ms / 1000).split('.')[0],
//                 total_time: this.secondsToClock(song.duration_ms / 1000).split('.')[0],
//                 song: song
//             }
//         });

//         this.startTimer(song?.duration_ms - playback.progress_ms, () => {

//         });
//     }
//     updateDevices(message){
//         var i, currentDevice = { volume_percent: 0 };

//         for (i = 0; i < message.devices.length; i++){
//             let device = message.devices[i];

//             if (device.is_active){
//                 currentDevice = device;

//                 break;
//             }
//         }

//         this.setState({
//             player: {
//                 ...this.state.player,
//                 devices: message.devices,
//                 currentDevice: currentDevice
//             }
//         });
//     }
//     updateParty(party){
//         this.setState({
//             party: {
//                 ...this.state.party,
//                 ...party
//             }
//         });
//     }
//     connectToParty(){
//         let socketObj = new Socket(`ws://localhost:8000/ws/p/${ this.state.party?.code }?token=${ this.props.auth.token }`, () => {
//             this.setState({
//                 party: {
//                     ...this.state.party,
//                     connected: true
//                 }
//             }, () => {
//                 this.getCurrentSocket().send("get_state");
//             });
//         }, () => {
//             this.setState({
//                 party: {
//                     ...this.state.party,
//                     connected: false
//                 }
//             });
//         }, this.onMessage);

//         this.setState({
//             party: {
//                 ...this.state.party,
//                 socket: socketObj
//             }
//         });
//     }

//     onPlaySong(id){
//         this.getCurrentSocket().send('play', {
//             'id': id
//         });
//     }
//     onDirectPlay(index){
//         this.getCurrentSocket().send('play_direct', {
//             'offset': index
//         });
//     }
//     onTrackPlay(track_uri){
//         this.getCurrentSocket().send('play_track', {
//             'track_uri': track_uri
//         });
//     }
//     onContextPlay(artist_uri, offset=null){
//         this.getCurrentSocket().send('play_context', {
//             'context_uri': artist_uri,
//             "offset": offset
//         });
//     }
//     onPrevious(){
//         this.getCurrentSocket().send('previous');
//     }
//     onPlay(){
//         this.onPartyElementToggle();

//         this.getCurrentSocket().send('play');
//     }
//     onPause(){
//         this.getCurrentSocket().send('pause');
//     }
//     onNext(){
//         this.getCurrentSocket().send('next');
//     }

//     onSongProgressUpdate(percentage, mouseUp){
//         this.setState({
//             player: {
//                 ...this.state.player,
//                 percentage: percentage
//             }
//         });

//         if (mouseUp){
//             this.getCurrentSocket().send('seek', {
//                 'progress_ms': Math.round(this.state.player.song.duration_ms * (percentage / 100))
//             });
//         }
//     }
//     onVolumeUpdate(percentage, mouseUp){
//         this.setState({
//             player: {
//                 ...this.state.player,
//                 currentDevice: {
//                     ...this.state.player.currentDevice,
//                     volume_percent: percentage
//                 }
//             }
//         });

//         if (mouseUp){
//             this.getCurrentSocket().send('select_volume', {
//                 'percentage': percentage
//             });
//         }
//     }
//     onRefreshDevices(){
//         this.state.player?.socket?.send('get_devices');
//     }
//     onDeviceSelect(device){
//         this.state.player?.socket?.send('select_device', {
//             'device_id': device.id
//         })
//     }
//     onSelectRoom(room){
//         this.setState({
//             popupContainer: {
//                 ...this.state.popupContainer,
//                 currentElement: 'room',
//                 room: room,
//                 isOpen: true
//             }
//         }, () => {
            
//         });
//     }
//     onSelectUser(user){
//         console.log('select user', user);

//         this.setState({
//             popupContainer: {
//                 ...this.state.popupContainer,
//                 currentElement: 'user',
//                 user: user,
//                 isOpen: true
//             }
//         }, () => {
            
//         });
//     }

//     onPartyElementToggle(){
//         this.setState({
//             party: {
//                 ...this.state.party,
//                 elementOpen: !this.state.party.elementOpen
//             }
//         });
//     }
//     onToggleCollapse(){
//         const { cookies } = this.props;
//         let prevCollapsed = cookies.get('nav_collapsed') == "true";
//         let newCollapsed = !prevCollapsed;
//         cookies.set('nav_collapsed', newCollapsed, { path: '/', maxAge: 10 * 365 * 24 * 3600 });

//         this.setState({
//             ...this.state,
//             navCollapsed: newCollapsed
//         });

//         console.log("PREV COLLAPSED: ", prevCollapsed);
//         console.log("NEW COLLAPSED: ", newCollapsed);
//     }

//     onNotificationAccept(notificationId){
//         axios.post(`http://localhost:8000/api/notifications/${ notificationId }/`, {
//             action: "accept"
//         }).then(data => {
//             if (!data.data.success) return;

//             console.log(data);
            
//             this.removeNotification(notificationId);

//             this.setState({
//                 ...this.state,
//                 party: {
//                     ...this.state.party,
//                     ...data.data?.party
//                 }
//             }, () => {
//                 this.connectToParty();
//             });
//         });
//     }
//     onNotificationIgnore(notificationId){
//         axios.post(`http://localhost:8000/api/notifications/${ notificationId }/`, {
//             action: "ignore"
//         }).then(data => {
//             if (!data.data.success) return;
            
//             this.removeNotification(notificationId);
//         });
//     }

//     removeNotification(notificationId){
//         console.log(this.state.auth.user.notifications.filter(noti => noti.notification.id != notificationId));

//         this.setState(prevState => { 
//             return {
//                 ...prevState,
//                 auth: {
//                     ...prevState.auth,
//                     user: {
//                         ...prevState.auth.user,
//                         notifications: prevState.auth.user.notifications.filter(noti => noti.notification.id != notificationId)
//                     }
//                 }
//             }
//         }, () => {
            
//         });
//     }

//     secondsToClock(seconds){
//         var hours = Math.floor(seconds / 3600), minutes = Math.floor((seconds - hours * 3600) / 60), clock = '';
        
//         seconds %= 60;
        
//         if (hours > 0)
//             clock += hours + ':';
        
//         if (hours > 0 || minutes > 0)
//             clock += (minutes < 10 && hours > 0 ? '0' : '') + minutes + ':';
        
//         var clock = (hours == 0 && minutes == 0 ? ':' : '') + clock + (((minutes > 0 || hours > 0) && seconds < 10) || seconds < 10 ? '0' : '') + seconds;
        
//         if (clock[0] == ':'){
//             clock = '0' + clock;
//         }
        
//         return clock;
//     }

//     startTimer(milli, finished){
//         var seconds = milli / 1000;
        
//         if (this.state.player.songTimer != null){
//             window.clearInterval(this.state.player?.songTimer);
//         }
        
//         let newTimer = window.setInterval(() => {
//             if (this.state.playback?.is_playing){
//                 seconds -= 1;
//                 milli -= 1000;

//                 let percentage = (1 - milli / this.state.player?.song?.duration_ms) * 100;
                
//                 this.setState({
//                     player: {
//                         ...this.state.player,
//                         percentage: percentage,
//                         elapsed_time: this.secondsToClock((this.state.player?.song?.duration_ms - milli) / 1000).split('.')[0]
//                     }
//                 });
//             }
            
//             if (seconds < 0){
//                 finished();
                
//                 this.getCurrentSocket().send('song_end');
                
//                 window.clearInterval(this.state.player?.songTimer);
//             }
//         }, 1000);

//         this.setState({
//             player: {
//                 ...this.state.player,
//                 songTimer: newTimer
//             }
//         })
//     }

//     render(){
//         return (
//             <div id = "authorized-app">
//                 <div id = "main-content-wrapper" className = { this.state.navCollapsed != null && this.state.navCollapsed ? "nav--collapsed" : "BRO" }>
//                     <Nav 
//                         auth = { this.state.auth }
//                         party = { this.state.party }
//                         friends = { this.state.friends }

//                         onLogout = { this.props.onLogout }
//                         onToggleCollapse = { this.onToggleCollapse }
//                         openPopupContainer = { this.openPopupContainer }
//                         updatePopupContainer = { this.updatePopupContainer }
//                         onNotificationAccept = { this.onNotificationAccept }
//                         onNotificationIgnore = { this.onNotificationIgnore }
//                     />
//                     <NotificationContainer 
//                         notifications = { this.state.auth?.user?.notifications }
                        
//                         onNotificationAccept = { this.onNotificationAccept }
//                         onNotificationIgnore = { this.onNotificationIgnore }
//                     />
//                     <Routes>
//                         <Route exact path = "/" 
//                             element = { 
//                                 <Home 
//                                     currentlyPlayingType = { this.getCurrentlyPlayingType }
//                                     currentlyPlayingURI = { this.getCurrentPlayingURI }
//                                     currentlyPlayingContextURI = { this.getCurrentlyPlayingContextURI }
//                                     onTrackPlay = { this.onTrackPlay }
//                                     onContextPlay = { this.onContextPlay }
//                                     openPopupContainer = { this.openPopupContainer }
//                                 /> 
//                             } 
//                         />
//                         <Route path = "/search" 
//                             element = { 
//                                 <Search
//                                     auth = { this.state.auth } 
//                                     currentlyPlayingType = { this.getCurrentlyPlayingType }
//                                     currentlyPlayingURI = { this.getCurrentPlayingURI }
//                                     currentlyPlayingContextURI = { this.getCurrentlyPlayingContextURI }
//                                     onTrackPlay = { this.onTrackPlay }
//                                     onContextPlay = { this.onContextPlay }
//                                 /> 
//                             } 
//                         />
//                         <Route path = "/saved" 
//                             element = { 
//                                 <Saved
//                                     auth = { this.state.auth } 
//                                     currentlyPlayingType = { this.getCurrentlyPlayingType }
//                                     currentlyPlayingURI = { this.getCurrentPlayingURI }
//                                     currentlyPlayingContextURI = { this.getCurrentlyPlayingContextURI }
//                                     onTrackPlay = { this.onTrackPlay }
//                                     onContextPlay = { this.onContextPlay }
//                                     openPopupContainer = { this.openPopupContainer }
//                                 /> 
//                             } 
//                         />
//                         <Route path = "/discover" 
//                             element = { 
//                                 <Discover
//                                     auth = { this.state.auth } 
//                                     currentlyPlayingType = { this.getCurrentlyPlayingType }
//                                     currentlyPlayingURI = { this.getCurrentPlayingURI }
//                                     currentlyPlayingContextURI = { this.getCurrentlyPlayingContextURI }
//                                     onTrackPlay = { this.onTrackPlay }
//                                     onContextPlay = { this.onContextPlay }
//                                     openPopupContainer = { this.openPopupContainer }
//                                 /> 
//                             } 
//                         />
//                         <Route path = "/discussion" 
//                             element = { 
//                                 <Discussion
//                                     auth = { this.state.auth } 
//                                     currentlyPlayingType = { this.getCurrentlyPlayingType }
//                                     currentlyPlayingURI = { this.getCurrentPlayingURI }
//                                     currentlyPlayingContextURI = { this.getCurrentlyPlayingContextURI }
//                                     onTrackPlay = { this.onTrackPlay }
//                                     onContextPlay = { this.onContextPlay }
//                                 /> 
//                             } 
//                         />
//                         <Route path = "/party" 
//                             element = { 
//                                 <Party
//                                     auth = { this.state.auth } 
//                                     party = { this.state.party }
//                                 /> 
//                             } 
//                         />
//                         <Route path = "/friends" 
//                             element = { 
//                                 <Friends
//                                     auth = { this.state.auth } 
//                                     openPopupContainer = { this.openPopupContainer }
//                                 /> 
//                             } 
//                         />
//                         <Route path = "/me" 
//                             element = { 
//                                 <Profile
//                                     auth = { this.state.auth } 
//                                 /> 
//                             } 
//                         />
//                         <Route path = "/settings" 
//                             element = { 
//                                 <Settings
//                                     auth = { this.state.auth } 
//                                 /> 
//                             } 
//                         />
//                         <Route path = "/notifications" 
//                             element = { 
//                                 <Notifications
//                                     auth = { this.state.auth } 
//                                 /> 
//                             } 
//                         />
//                         {/* <Route path = "/playlists" element = { <Playlists auth = { this.props.auth } /> } />
//                         <Route path = "/r/:code" element = { 
//                             <Room room = { this.state.room }
//                                 onConnect = { this.connectToRoom } 
//                                 onDirectPlay = { this.onDirectPlay }
//                                 onSelectUser = { this.onSelectUser }
//                             /> 
//                         } /> 
//                         <Route path = "/p/:code" element = { 
//                             <Playlist /> 
//                         } />  */}
//                         <Route path = "/callback/" element = { <Callback /> } />
//                         <Route path = "*" element = {<Navigate to = "/" />} />
//                     </Routes>
//                 </div>
                
//                 {/* <Party
//                     party = { this.state.party }
//                     onPartyElementToggle = { this.onPartyElementToggle }
//                 /> */}
//                 <Player 
//                     playback = { this.state.playback } 
//                     player = { this.state.player }
//                     party = { this.state.party }

//                     onPrevious = { this.onPrevious }
//                     onPlay = { this.onPlay }
//                     onPause = { this.onPause }
//                     onNext = { this.onNext }
//                     onProgressDown = { this.onProgressDown }
//                     onRefreshDevices = { this.onRefreshDevices }
//                     onDeviceSelect = { this.onDeviceSelect }
//                     onSongProgressUpdate = { this.onSongProgressUpdate }
//                     onVolumeUpdate = { this.onVolumeUpdate }

//                     onPartyElementToggle = { this.onPartyElementToggle }
//                 />
//                 <PopupContainer 
//                     container = { this.state.popupContainer } 
//                     currentElement = { this.state.popupContainer?.currentElement }
//                     onOpen = { this.openPopupContainer }
//                     onClose = { this.closePopupContainer } 
//                 />
//             </div>
//         );
//     }
// }

// export default withCookies(Authorized);