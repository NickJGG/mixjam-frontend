import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from 'axios';

import '../assets/css/unauth/landing.css';

import landing1 from '../assets/img/landing/landing-1.png';
import landing2 from '../assets/img/landing/landing-2.png';
import landing3 from '../assets/img/landing/landing-3.png';
import imgMusicRecord from '../assets/img/icons/musicrecord-white-outline-96.png';
import imgDiscover from '../assets/img/icons/discover-white-80.png';
import imgPlaylist from '../assets/img/icons/playlist-white-80.png';

const Landing = (props) => {
    useEffect(() => {
        
    }, []);

    return (
        <div id = "landing">
            <div id = "landing-header">
                <div id = "welcome">
                    <p id = "welcome-title">Listen to your favorite music, together</p>
                    <p id = "welcome-para">MixJam connects to your Spotify Premium account and controls it through rooms. </p>
                    <div id = "account-buttons">
                        <Link to = "/login">
                            <div className = "account-button gradient-bg blue default">
                                <p>Login</p>
                            </div>
                        </Link>
                        <p id = "button-separator">or</p>
                        <Link to = "/register">
                            <div className = "account-button gradient-bg red default">
                                <p>Sign Up</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className = "welcome-image">

                </div>
            </div>
            <div id = "site-showcase">
                <div id = "showcase-wrapper">
                    <div className = "showcase gradient-bg static">
                        <img src = { imgMusicRecord } />
                        <p className = "showcase-title">Synchronized Playback</p>
                        <p className = "showcase-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie eros turpis, eu porta nulla accumsan vel. Donec mattis convallis risus, a commodo massa. </p>
                    </div>
                    <div className = "showcase gradient-bg static">
                        <img src = { imgDiscover } />
                        <p className = "showcase-title">Discover New Music</p>
                        <p className = "showcase-desc">Vivamus sed scelerisque neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper metus eget lacus luctus posuere.</p>
                    </div>
                    <div className = "showcase gradient-bg static">
                        <img src = { imgPlaylist } />
                        <p className = "showcase-title">Spice Up Your Playlists</p>
                        <p className = "showcase-desc">Ut fermentum lobortis erat, eu feugiat nulla pretium et. Ut in tellus fermentum, pulvinar velit in, blandit est. Proin ut ante sed ligula tempor facilisis at sed lorem.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;