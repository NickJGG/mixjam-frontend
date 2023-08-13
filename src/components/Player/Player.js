import imgPlay from "assets/img/icons/play-white-96.png";
import imgPause from "assets/img/icons/pause-white-96.png";
import imgFastForward from "assets/img/icons/fastforward-white-96.png";
import imgRewind from "assets/img/icons/rewind-white-96.png";
import imgPhone from "assets/img/icons/phone-white-88.png";
import imgQueue from "assets/img/icons/queue-white-outline-96.png";

import PlayerProgressContainer from "components/Player/PlayerProgressContainer";
import LayoutButton from "components/LayoutButton/LayoutButton";
import QueuePopup from "components/Popup/QueuePopup/QueuePopup";

import PlayerCSS from "./Player.module.css";

const Player = (props) => {
    const getProgressPercentage = () => {
        return props.player?.percentage * 100;
    }
    const getElapsedTime = () => {
        try {
            return props.player?.elapsed_time;
        } catch (e){
            return "- : - -";
        }
    }
    const getTotalTime = () => {
        try {
            return props.player?.total_time;
        } catch (e){
            return "- : - -";
        }
    }

    return (
        <div id = { PlayerCSS["player"] } className = { PlayerCSS["dropdown-container"] }>
            <input type = "hidden" className = { PlayerCSS["dropdown-group"] } value = "1" />
            <input type = "hidden" className = { PlayerCSS["dropdown-layer"] } value = "1" />

            <div id = { PlayerCSS["player__body"] }>
                <div id = { PlayerCSS["player__body__song"] }>
                    <div id = { PlayerCSS["player__body__song__image"] }>
                        { props.player?.song?.album ? 
                        <img src = { props.player?.song?.album?.images[props.player?.song?.album?.images.length - 1].url }></img> 
                        : "" 
                        }
                    </div>
                    <div id = { PlayerCSS["player__body__song__details"] }>
                        <p id = { PlayerCSS["player__body__song__details__name"] }>{ props.player?.song?.name || "No playback detected" }</p>
                        <p id = { PlayerCSS["player__body__song__details__artist"] }>{ props.player?.song?.artists || "Connect to a device" }</p>
                    </div>
                </div>
                <div id = { PlayerCSS["player__body__controller__song"] }>
                    <div id = { PlayerCSS["player__body__controller__song__controls"] }>
                        <LayoutButton
                            name = "Previous"
                            defaultImagePath = { imgRewind }

                            onClick = { props.onPrevious }
                        />
                        <LayoutButton
                            name = "Play"
                            color = "red"
                            defaultImagePath = { imgPlay }
                            toggledImagePath = { imgPause }
                            toggle = { props.playback?.is_playing }

                            onClick = { props.playback?.is_playing ? props.onPause : props.onPlay }
                        />
                        <LayoutButton
                            name = "Next"
                            defaultImagePath = { imgFastForward }

                            onClick = { props.onNext }
                        />
                    </div>
                    <div id = { PlayerCSS["player__body__controller__song__progress"] }>
                        <p id = { PlayerCSS["player__body__controller__song__progress__current"] }>{ getElapsedTime() }</p>
                            <PlayerProgressContainer
                                key = "song_progress"
                                percentage = { props.player?.percentage } 
                                row = { true } 
                                classes = "song-progress" 
                                onPercentageUpdate = { props.onSongProgressUpdate } 
                            />
                        <p id = { PlayerCSS["player__body__controller__song__progress__total"] }>{ getTotalTime() }</p>
                    </div>
                </div>
                
                <div id = { PlayerCSS["player__body__controller__device"] }>
                    <LayoutButton
                        defaultImagePath = { imgQueue }

                        onClick = { () => props.openPopupContainer(
                            <QueuePopup
                                closePopupContainer = { props.closePopupContainer }
                            />
                        ) }
                    />
                </div>
            </div>
        </div>  
    );
}

const DeviceList = (props) => {
    const getDevices = () => {
        if (props.devices == null || props.devices?.length == 0)
            return <p id = { PlayerCSS["no-devices"] }>No devices available</p>;

        return props.devices?.map(device => (
            <Device key = { device.id } device = { device } active = { device.id == props.currentDevice?.id } onClick = { () => props.onDeviceSelect(device) } />
        ));
    }

    return (
        <div className = { PlayerCSS["device-list"] }>
            { getDevices() }
        </div>
    );
}
const Device = (props) => {
    return (
        <div className = {`device gradient-bg ${ props.active ? "active" : "" }`} onClick = { props.onClick }>
            <input className = { PlayerCSS["device-id"] } type = "hidden" value = { props.device.id } />
            <img src = { imgPhone } />
            <div className = { PlayerCSS["device-info"] }>
                <p className = { PlayerCSS["device-name"] }>{ props.device.name }</p>
                <p className = { PlayerCSS["device-type"] }>{ props.device.type }</p>
            </div>
        </div>
    );
}

export default Player;