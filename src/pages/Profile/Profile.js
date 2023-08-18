import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import useTitle from "hooks/useTitle";

import Page from "pages/Page";
import LayoutButton from "components/LayoutButton/LayoutButton";
import ProfilePicture from "components/ProfilePicture";

import ProfileCSS from "./Profile.module.css";
import cssGradientBg from "assets/css/gradient-bg.module.css";

import imgParty from "assets/img/icons/musicrecord-white-outline-96.png";
import imgAdd from "assets/img/icons/adduser-white-outline-96.png";

const Profile = (props) => {
    const [user, setUser] = useState(props.user);
    const [title, setTitle] = useTitle(user.username);

    const { username } = useParams(); 

    useEffect(() => {
        if (props.user && username == null) return;
        
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${ username }`)
            .then(data => {
                if (data.data.success == false) return;

                setUser(data.data.user);
            });
    }, []);

    return (
        <Page key = "profile" user = { props.user }>
            <div id = { ProfileCSS["container"] }>
                <div id = { ProfileCSS["header"] }>
                    <ProfilePicture user = { user } 
                        width = "fit-content"
                        height = "100%"
                    />
                    <p id = { ProfileCSS["header__username"] }>{ user?.username }</p>
                </div>
                <div id = { ProfileCSS["actions"] }>
                    <LayoutButton 
                        label = "Add"
                        defaultImagePath = { imgAdd }
                        color = "green"
                        classes = { cssGradientBg["gradient-bg--default"] }
                    />
                    <LayoutButton 
                        label = "Invite"
                        defaultImagePath = { imgParty }
                        color = "blue"
                        classes = { cssGradientBg["gradient-bg--default"] }
                    />
                </div>
            </div>
        </Page>
    );
}

export default Profile;