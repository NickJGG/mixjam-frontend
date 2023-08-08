import imgPlay from "../assets/img/icons/play-white-96.png";
import imgPause from "../assets/img/icons/pause-white-96.png";
import imgFastForward from "../assets/img/icons/fastforward-white-96.png";
import imgRewind from "../assets/img/icons/rewind-white-96.png";
import imgDevice from "../assets/img/icons/devices-white-outline-96.png";
import imgVolume from "../assets/img/icons/volume-white-outline-96.png";
import imgPhone from "../assets/img/icons/phone-white-88.png";

import Dropdown from "./Dropdown";
import ProgressContainer from "./ProgressContainer";
import LayoutButton from "./buttons/LayoutButton";

const Player = (props) => {
    const songControlsButtons = [
        { 
            name: "Previous", 
            defaultImagePath: imgRewind,
            onClick: props.onPrevious
        },
        { 
            name: "Play", 
            toggledImagePath: imgPause,
            defaultImagePath: imgPlay,
            onClick: props.playback?.is_playing ? props.onPause : props.onPlay,
            toggle: props.playback?.is_playing,
            color: "red"
        },
        { 
            name: "Next", 
            defaultImagePath: imgFastForward,
            onClick: props.onNext
        }
    ];
    const deviceControls = [
        { 
            name: "device",
            button: {
                name: "Devices", 
                defaultImagePath: imgDevice,
                classes: "dropdown-toggle",
            },
            bodyElement: (
                <div className = "device-container">
                    <div className = "header no-margin">
                        <div className = "header-info">
                            <p>Devices</p>
                        </div>
                        <div className = "header-actions">
                            
                        </div>
                    </div>
                    <DeviceList 
                        devices = { props.player?.devices } 
                        currentDevice = { props.player?.currentDevice } 
                        onDeviceSelect = { props.onDeviceSelect } 
                    />
                </div>
            )
        },
        { 
            name: "volume",
            button: { 
                name: "Volume", 
                defaultImagePath: imgVolume,
            },
            bodyElement: (
                <div className = "volume-container">
                    <ProgressContainer percentage = { props.player?.currentDevice?.volume_percent } row = { false } classes = "volume-progress" onPercentageUpdate = { props.onVolumeUpdate } />
                </div>
            )
        }
    ];

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
        <div id = "player" className = "dropdown-container">
            <input type = "hidden" className = "dropdown-group" value = "1" />
            <input type = "hidden" className = "dropdown-layer" value = "1" />

            <div id = "player__body">
                <div id = "player__body__song">
                    <div id = "player__body__song__image">
                        { props.player?.song?.album ? 
                        <img src = { props.player?.song?.album?.images[props.player?.song?.album?.images.length - 1].url }></img> 
                        : "" 
                        }
                    </div>
                    <div id = "player__body__song__details">
                        <p id = "player__body__song__details__name">{ props.player?.song?.name || "No playback detected" }</p>
                        <p id = "player__body__song__details__artist">{ props.player?.song?.artists || "Connect to a device" }</p>
                    </div>
                </div>
                <div id = "player__body__controller__song">
                    <div id = "player__body__controller__song__controls">
                        { songControlsButtons.map(button => (
                            <LayoutButton
                                key = { `${ button.name }-button` }
                                button = { button } 
                            />
                        )) }
                        {/* <LayoutButton button = { LayoutButtons[0] } />
                        <ToggleLayoutButton buttons = { [LayoutButtons[1], LayoutButtons[2]] } condition = { props.playback?.is_playing } />
                        <LayoutButton button = { LayoutButtons[3] } /> */}
                    </div>
                    <div id = "player__body__controller__song__progress">
                        <p id = "player__body__controller__song__progress__current">{ getElapsedTime() }</p>
                        <ProgressContainer
                            key = "song_progress"
                            percentage = { props.player?.percentage } 
                            row = { true } 
                            classes = "song-progress" 
                            onPercentageUpdate = { props.onSongProgressUpdate } 
                        />
                        <p id = "player__body__controller__song__progress__total">{ getTotalTime() }</p>
                    </div>
                </div>
                <div id = "player__body__controller__device">
                    { deviceControls.map(control => (
                        <Dropdown
                            key = { `${ control.name }-dropdown` }
                            id = { `${ control.name }-dropdown` }
                            toggleElement = { 
                                <LayoutButton 
                                    key = { `${ control.button.name }-button` }
                                    button = { control.button } 
                                />
                            } 
                            bodyElement = { control.bodyElement }
                            row = { false } 
                            orientation = "top right"
                            classes = "width"
                        />
                    )) }
                </div>
            </div>
        </div>  
    );
}

const DeviceList = (props) => {
    const getDevices = () => {
        if (props.devices == null || props.devices?.length == 0)
            return <p id = "no-devices">No devices available</p>;

        return props.devices?.map(device => (
            <Device key = { device.id } device = { device } active = { device.id == props.currentDevice?.id } onClick = { () => props.onDeviceSelect(device) } />
        ));
    }

    return (
        <div className = "device-list">
            { getDevices() }
        </div>
    );
}
const Device = (props) => {
    return (
        <div className = {`device gradient-bg ${ props.active ? "active" : "" }`} onClick = { props.onClick }>
            <input className = "device-id" type = "hidden" value = { props.device.id } />
            <img src = { imgPhone } />
            <div className = "device-info">
                <p className = "device-name">{ props.device.name }</p>
                <p className = "device-type">{ props.device.type }</p>
            </div>
        </div>
    );
}

export default Player;